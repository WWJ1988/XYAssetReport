using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OMS.Trading.Common.Transports;

namespace OMS.Trading.Common.Proxy.Requests
{
	public class TradingOrderRequest : TradingMqRequest
	{
		public TradeOrder Order { get; set; }
	}
}
