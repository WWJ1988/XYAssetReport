using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Mvvm;
using OMS.Shell.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace OMS.Shell.Controls
{
    public class FrameworkSummaryViewModel : BindableBase
    {
        private readonly DelegateCommand addSummaryWidgetCommand;
        private readonly DelegateCommand doAddSummaryWidgetCommand;
        private readonly DelegateCommand cancelAddSummaryWidgetCommand;

        private bool showPopup = false;

        [Import]
        private ISummaryWidgetManager summaryWidgetManager{get;set;}

        public FrameworkSummaryViewModel()
        {
            addSummaryWidgetCommand = new DelegateCommand(() =>
            {
                ShowPopup = true;
            });
            doAddSummaryWidgetCommand = new DelegateCommand(() =>
            {

            });
            cancelAddSummaryWidgetCommand = new DelegateCommand(() =>
            {
                ShowPopup = false;
            });
        }

        public ICommand AddSummaryWidgetCommand { get { return addSummaryWidgetCommand; } }
        public ICommand DoAddSummaryWidgetCommand { get { return doAddSummaryWidgetCommand; } }
        public ICommand CancelAddSummaryWidgetCommand { get { return cancelAddSummaryWidgetCommand; } }

        public bool ShowPopup
        {
            get { return showPopup; }
            set { SetProperty(ref showPopup, value); }
        }
    }
}
