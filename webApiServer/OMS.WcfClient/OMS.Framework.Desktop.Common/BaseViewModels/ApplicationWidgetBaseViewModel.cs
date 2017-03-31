using System.Windows.Input;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Mvvm;
using OMS.Framework.Desktop.Common.Interfaces;

namespace OMS.Framework.Desktop.Common.BaseViewModels
{
	public class ApplicationWidgetBaseViewModel : BindableBase
	{
		private string title;
		private string widgetName;
		private readonly DelegateCommand removeCommand;
		private readonly IApplicationWidgetManager applicationWidgetManager;

		public ApplicationWidgetBaseViewModel(string title, string widgetName, IApplicationWidgetManager applicationWidgetManager)
		{
			this.title = title;
			this.widgetName = widgetName;
			this.applicationWidgetManager = applicationWidgetManager;

			removeCommand = new DelegateCommand(RemoveWidget);
		}

		public string Title
		{
			get { return title; }
			set { SetProperty(ref title, value); }
		}

		public ICommand RemoveCommand { get { return removeCommand; } }

		public virtual void RemoveWidget()
		{
			if (applicationWidgetManager != null)
			{
				applicationWidgetManager.RemoveActiveWidget(widgetName);
			}
		}
	}
}
