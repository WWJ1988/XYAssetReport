using System.Windows;
using System.Windows.Controls;

namespace OMS.Framework.Desktop.Common.Controls
{
    /// <summary>
    /// Interaction logic for SummaryWidget.xaml
    /// </summary>
    public partial class SummaryWidget : UserControl
    {
        public static readonly DependencyProperty TitleProperty = DependencyProperty.Register(
           "Title", typeof(string), typeof(SummaryWidget), new FrameworkPropertyMetadata());

        public SummaryWidget()
        {
            InitializeComponent();
        }

        public string Title
        {
            get
            {
                return (string)GetValue(TitleProperty);
            }
            set
            {
                SetValue(TitleProperty, value);
            }
        }
    }
}
