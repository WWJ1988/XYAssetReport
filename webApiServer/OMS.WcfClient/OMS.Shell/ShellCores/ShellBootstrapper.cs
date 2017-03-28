using Microsoft.Practices.Prism.Logging;
using Microsoft.Practices.Prism.MefExtensions;
using OMS.Framework.Desktop.Common.Interfaces;
using OMS.Shell.ShellCores.Login;
using OMS.Shell.ShellCores.MainWindows;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.ComponentModel.Composition.Hosting;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows;

namespace OMS.Shell.ShellCores
{
    internal sealed class ShellBootstrapper : MefBootstrapper, IDisposable
    {
        private string moduleDirectory;
        private IShellApp shellApp;

        [Import]
        private LoginWindow loginWindow;

        public ShellBootstrapper(IShellApp shellApp, string moduleDirectory)
        {
            this.shellApp = shellApp;
            this.moduleDirectory = moduleDirectory;
        }

        protected override DependencyObject CreateShell()
        {
            loginWindow.LoginComplete += StartupWindowOnLoginComplete;
            loginWindow.Show();

            var mainWindow = new MainWindow();
            mainWindow.DataContext = new MainWindowViewModel();

            shellApp.MainWindow = mainWindow;

            return mainWindow;
        }

        protected override void InitializeModules()
        {
            base.InitializeModules();
        }

        protected override void ConfigureContainer()
        {
            base.ConfigureContainer();

            Container.ComposeParts(this);
        }

        protected override void ConfigureAggregateCatalog()
        {
            base.ConfigureAggregateCatalog();

            AggregateCatalog.Catalogs.Add(new AssemblyCatalog(Assembly.GetExecutingAssembly()));

            var modulesList = new List<DesktopModule>();
            modulesList.AddRange(GetModules(moduleDirectory));

            LoadModules(modulesList);
        }

        private void StartupWindowOnLoginComplete(object sender, EventArgs eventArgs)
        {
            var mainWindow = shellApp.MainWindow;

            mainWindow.Show();

            if (loginWindow != null)
            {
                loginWindow.Close();
            }
        }

        private IEnumerable<DesktopModule> GetModules(string moduleRootDir)
        {
            // regex format is OMS.<Product>.<SubProduct*>.Desktop.<Module*>.<SubModule*>.dll
            var moduleNamePattern = new Regex(@"OMS\.(\w+)\.?(\w+)?\.Desktop\.(\w+)?\.?(\w+)?\.?dll", RegexOptions.IgnoreCase);
            var moduleRootDirInfo = new DirectoryInfo(moduleRootDir);
            var allDlls = moduleRootDirInfo.EnumerateFiles("*.dll", SearchOption.TopDirectoryOnly);
            var modules = new List<DesktopModule>();
            foreach (var dll in allDlls)
            {
                var match = moduleNamePattern.Match(dll.Name);
                if (!match.Success)
                {
                    continue; //skip loading DLL if it does not match the pattern
                }

                var desktopModule = new DesktopModule
                {
                    Product = match.Groups[1].Value,
                    SubProduct = match.Groups[2].Value,
                    Module = match.Groups[3].Value,
                    SubModule = match.Groups[4].Value,
                    FileName = dll.Name
                };

                modules.Add(desktopModule);
            }

            return modules;
        }

        internal void LoadModules(IEnumerable<DesktopModule> desktopModules)
        {
            if (desktopModules == null)
            {
                throw new ArgumentNullException("desktopModules");
            }

            foreach (var desktopModule in desktopModules)
            {
                AssemblyCatalog assemblyCatalog;

                try
                {
                    string assemblyPath = Path.Combine(moduleDirectory, desktopModule.FileName);

                    assemblyCatalog = new AssemblyCatalog(assemblyPath);
                }
                catch (Exception ex)
                {
                    Logger.Log(ex.Message, Category.Exception, Priority.Medium);
                    continue;
                }

                // Ignore any assembly catalogs that were already added
                if (
                    AggregateCatalog.Catalogs.OfType<AssemblyCatalog>()
                        .All(ac => ac.Assembly.FullName != assemblyCatalog.Assembly.FullName))
                {
                    try
                    {
                        AggregateCatalog.Catalogs.Add(assemblyCatalog);
                    }
                    catch (ReflectionTypeLoadException loadEx)
                    {
                        var detailBuilder =
                            new StringBuilder("Failed to Load Module: " + assemblyCatalog.Assembly.FullName)
                                .AppendLine().AppendLine();

                        foreach (Exception exception in loadEx.LoaderExceptions)
                        {
                            detailBuilder.AppendLine(exception.Message);
                        }
                    }
                }
            }
        }

        public void Dispose()
        {
            if (this.Container != null)
            {
                this.Container.Dispose();
            }
        }
    }

    internal class DesktopModule
    {
        public string Product { get; set; }
        public string SubProduct { get; set; }
        public string Module { get; set; }
        public string SubModule { get; set; }
        public string FileName { get; set; }

        public override string ToString()
        {
            return String.Format("Product={0},SubProduct={1}, Module={2}, SubModule={3}",
                Product, SubProduct, Module, SubModule);
        }
    }
}
