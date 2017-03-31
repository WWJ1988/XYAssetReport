using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OMS.Framework.Desktop.Common.BaseViewModels;
using OMS.Framework.Desktop.Common.Interfaces;

namespace OMS.Trading.Desktop.Order.Summaries.OrderSumamry
{
	public class OrderSummaryWidgetViewModel : SummaryWidgetBaseViewModel
	{
		private const string title = "P/L Overview";
		private const string widget = "OrderSummary";

		private readonly List<PLSummaryItem> plSummaryData = new List<PLSummaryItem>();

		public OrderSummaryWidgetViewModel(ISummaryWidgetManager summaryWidgetManager)
			: base(title, widget, summaryWidgetManager)
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
