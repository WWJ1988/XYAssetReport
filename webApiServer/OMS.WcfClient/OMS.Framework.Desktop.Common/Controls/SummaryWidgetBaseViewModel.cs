using System.Windows.Input;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Mvvm;

namespace OMS.Framework.Desktop.Common.Controls
{
	public class SummaryWidgetBaseViewModel : BindableBase
	{
		private string title;
		private readonly DelegateCommand removeSummaryWidgetCommand;

		public SummaryWidgetBaseViewModel(string title)
		{
			this.title = title;
			removeSummaryWidgetCommand = new DelegateCommand(() =>
			{
			});
		}

		public string Title
		{
			get { return title; }
			set { SetProperty(ref title, value); }
		}

		public ICommand RemoveSummaryWidgetCommand { get { return removeSummaryWidgetCommand; } }
	}
}
