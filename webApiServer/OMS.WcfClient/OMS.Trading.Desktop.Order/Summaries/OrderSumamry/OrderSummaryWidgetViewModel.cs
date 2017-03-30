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

        private readonly List<PLSummaryItem> plSummaryData = new List<PLSummaryItem>();

        public OrderSummaryWidgetViewModel()
            : base(title)
        {
            plSummaryData.Add(new PLSummaryItem() { LongPL = 50000, ShortPL = 20000, TotalPL = 70000 });
        }

        public List<PLSummaryItem> PLSummaryData
        {
            get { return plSummaryData; }
        }
    }

    public class PLSummaryItem
    {
        public decimal LongPL { get; set; }
        public decimal ShortPL { get; set; }
        public decimal TotalPL { get; set; }
    }
}
