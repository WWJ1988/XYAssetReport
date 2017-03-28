using OMS.Framework.Desktop.Common.Interfaces;
using OMS.Shell.ShellCores;
using System;
using System.IO;
using System.Reflection;
using System.Runtime;
using System.Windows;

namespace OMS.Shell
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application, IShellApp, IDisposable
	{
		internal ShellBootstrapper Bootstrapper { get; set; }

		public App()
		{
			AppDomain currentDomain = AppDomain.CurrentDomain;
			currentDomain.UnhandledException += CurrentDomainOnUnhandledException;
			Application.Current.DispatcherUnhandledException += CurrentDispatcherUnhandledException;

			ProfileOptimization.SetProfileRoot(Environment.CurrentDirectory);
			ProfileOptimization.StartProfile(string.Format("{0}.Startup.Profile", System.Windows.Application.ResourceAssembly.GetName().Name));
		}

		protected override void OnStartup(StartupEventArgs e)
		{
			base.OnStartup(e);

			try
			{
				Bootstrapper = new ShellBootstrapper(this, Path.GetDirectoryName(Assembly.GetEntryAssembly().Location));

				Bootstrapper.Run();
			}
			catch (Exception ex)
			{
				HandleFatalException(ex, "Exception Occured", ex.ToString());
			}
		}

		private void HandleFatalException(Exception ex, string format, params object[] args)
		{
			var messageBoxText = string.Format(format, args);

			MessageBox.Show(messageBoxText, "OMS", MessageBoxButton.OK, MessageBoxImage.Error);

			// Allow to exit (don't finish starting up)
			Shutdown(1);
		}

		private void CurrentDomainOnUnhandledException(object sender, UnhandledExceptionEventArgs args)
		{
			Exception e = (Exception)args.ExceptionObject;

			var aex = e as AggregateException;
			if (aex != null)
			{
				foreach (Exception iex in aex.Flatten().InnerExceptions)
				{
				}
			}
		}

		private void CurrentDispatcherUnhandledException(object sender, System.Windows.Threading.DispatcherUnhandledExceptionEventArgs e)
		{
		}

		public void Dispose()
		{
			if (Bootstrapper != null)
			{
				Bootstrapper.Dispose();
			}
		}
	}
}
