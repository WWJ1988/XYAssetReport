using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using OMS.Framework.Desktop.Common.BaseViewModels;
using OMS.Framework.Desktop.Common.Interfaces;
using OMS.Framework.Desktop.Common.Metadatas;

namespace OMS.Trading.Desktop.Order.Blotter
{
	[Export(typeof(IApplicationWidgetFactory))]
	public class OrderBlotterWidgetFactory : IApplicationWidgetFactory
	{
		public void Initialize(IServiceProvider serviceProvider)
		{
			var applicationWidgetManager = serviceProvider.GetService(typeof(IApplicationWidgetManager)) as IApplicationWidgetManager;

			if (applicationWidgetManager != null)
			{
				var metadata = new ApplicationWidgetMetadata()
				{
					WidgetName = "OrderBlotter",
					Title = "Order Blotter"
				};

				applicationWidgetManager.Register(metadata, (provider) =>
				{
					return new Tuple<TabItem, ApplicationWidgetBaseViewModel>(new OrderBlotterView(), new OrderBlotterViewModel(applicationWidgetManager));
				});
			}
		}
	}
}
