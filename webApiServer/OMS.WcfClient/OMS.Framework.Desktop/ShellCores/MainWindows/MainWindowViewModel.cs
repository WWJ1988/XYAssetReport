using Microsoft.Practices.Prism.Mvvm;
using Microsoft.Practices.ServiceLocation;
using OMS.Framework.Desktop.Controls;

namespace OMS.Framework.Desktop.ShellCores.MainWindows
{
	public class MainWindowViewModel : BindableBase
	{
		private FrameworkSummaryViewModel summaryViewModel;
		private ApplicationWidgetViewModel applicationViewModel;

		public MainWindowViewModel()
		{
			summaryViewModel = new FrameworkSummaryViewModel();
			applicationViewModel = new ApplicationWidgetViewModel();
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

		public ApplicationWidgetViewModel ApplicationViewModel
		{
			get
			{
				return applicationViewModel;
			}
			set
			{
				SetProperty(ref applicationViewModel, value);
			}
		}

		public void InitializeVMs(IServiceLocator serviceLocator)
		{
			summaryViewModel.InitializeServices(serviceLocator);
			applicationViewModel.InitializeServices(serviceLocator);
		}
	}
}
