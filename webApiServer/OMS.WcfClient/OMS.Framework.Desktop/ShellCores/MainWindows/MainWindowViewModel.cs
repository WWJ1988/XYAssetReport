using Microsoft.Practices.Prism.Mvvm;
using Microsoft.Practices.ServiceLocation;
using OMS.Framework.Desktop.Controls;

namespace OMS.Framework.Desktop.ShellCores.MainWindows
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

		public void InitializeVMs(IServiceLocator serviceLocator)
		{
			summaryViewModel.InitializeServices(serviceLocator);
		}
	}
}
