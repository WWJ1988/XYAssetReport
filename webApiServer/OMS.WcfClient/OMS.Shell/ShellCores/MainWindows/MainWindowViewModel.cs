using Microsoft.Practices.Prism.Mvvm;
using Microsoft.Practices.Prism.Regions;
using OMS.Shell.Controls;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Shell.ShellCores.MainWindows
{
    public class MainWindowViewModel : BindableBase
    {
        private FrameworkSummaryViewModel summaryViewModel;

        public MainWindowViewModel()
        {
            summaryViewModel = new FrameworkSummaryViewModel();
        }

        public FrameworkSummaryViewModel SummaryViewModel
        {
            get
            {
                return summaryViewModel;
            }
            set
            {
                SetProperty(ref summaryViewModel, value);
            }
        }
    }
}
