using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OMS.Framework.Desktop.Common.Controls;

namespace OMS.Trading.Desktop.Order.Summaries.OrderSumamry
{
    public class OrderSummaryWidgetViewModel : SummaryWidgetBaseViewModel
    {
        private const string title = "P/L Overview";
        private string summary = "P/L Overview";

        public OrderSummaryWidgetViewModel()
            : base(title)
        { }

        public string Summary
        {
            get { return summary; }
            set { SetProperty(ref summary, value); }
        }
    }
}
