using System.Windows.Input;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Mvvm;
using OMS.Framework.Desktop.Common.Interfaces;

namespace OMS.Framework.Desktop.Common.BaseViewModels
{
	public class SummaryWidgetBaseViewModel : BindableBase
	{
		private string title;
		private string widgetName;
		private readonly DelegateCommand removeCommand;
		private readonly ISummaryWidgetManager summaryWidgetManager;

		public SummaryWidgetBaseViewModel(string title, string widgetName, ISummaryWidgetManager summaryWidgetManager)
		{
			this.title = title;
			this.widgetName = widgetName;
			this.summaryWidgetManager = summaryWidgetManager;

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
			if (summaryWidgetManager != null)
			{
				summaryWidgetManager.RemoveActiveWidget(widgetName);
			}
		}
	}
}
