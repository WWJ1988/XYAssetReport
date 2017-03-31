using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OMS.Framework.Desktop.Common.BaseViewModels;
using OMS.Framework.Desktop.Common.Interfaces;

namespace OMS.Trading.Desktop.Order.Blotter
{
	public class OrderBlotterViewModel : ApplicationWidgetBaseViewModel
	{
		private const string title = "Blotter";
		private const string widget = "OrderBlotter";

		public OrderBlotterViewModel(IApplicationWidgetManager applicationWidgetManager)
			: base(title, widget, applicationWidgetManager)
		{
		}
	}
}
