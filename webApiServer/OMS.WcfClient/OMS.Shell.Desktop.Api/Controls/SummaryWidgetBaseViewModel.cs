using Microsoft.Practices.Prism.Mvvm;

namespace OMS.Framework.Desktop.Common.Controls
{
    public class SummaryWidgetBaseViewModel : BindableBase
    {
        private string title;

        public SummaryWidgetBaseViewModel(string title)
        {
            this.title = title;
        }

        public string Title
        {
            get { return title; }
            set { SetProperty(ref title, value); }
        }
    }
}
