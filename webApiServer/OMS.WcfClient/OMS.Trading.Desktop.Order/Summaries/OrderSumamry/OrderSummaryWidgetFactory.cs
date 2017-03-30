using System;
using System.ComponentModel.Composition;
using System.Windows.Controls;
using OMS.Framework.Desktop.Common.Controls;
using OMS.Framework.Desktop.Common.Interfaces;
using OMS.Framework.Desktop.Common.Metadatas;

namespace OMS.Trading.Desktop.Order.Summaries.OrderSumamry
{
	[Export(typeof(ISummaryWidgetFactory))]
	public class OrderSummaryWidgetFactory : ISummaryWidgetFactory
	{
		public void Initialize(IServiceProvider serviceProvider)
		{
			var summaryWidgetManager = serviceProvider.GetService(typeof(ISummaryWidgetManager)) as ISummaryWidgetManager;

			if (summaryWidgetManager != null)
			{
				var metadata = new SummaryWidgetMetadata()
				{
					WidgetName = "OrderSummary",
					Title = "Order Summary"
				};

				summaryWidgetManager.Register(metadata, (provider) =>
				{
					return new Tuple<UserControl, SummaryWidgetBaseViewModel>(new OrderSummaryWidget(), new OrderSummaryWidgetViewModel(summaryWidgetManager));
				});
			}
		}
	}
}
