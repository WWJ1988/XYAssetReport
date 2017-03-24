using System;
using OMS.Trading.Common.Interfaces;
using OMS.Trading.Common.Proxy;
using OMS.Trading.Common.Proxy.Requests;
using OMS.Trading.Common.Proxy.Responses;
using OMS.Trading.Common.Transports;

namespace OMS.Trading.Common.Services
{
	public class TradingService : ITradingService, IDisposable
	{
		private readonly TradingServiceProxy tradingServiceProxy;

		public TradingService()
		{
			tradingServiceProxy = new TradingServiceProxy();
		}

		public TradingOrderResponse AddOrder(TradeOrder order)
		{
			TradingOrderRequest request = new TradingOrderRequest();
			request.Order = order;

			return tradingServiceProxy.RequestMessage<TradingOrderRequest, TradingOrderResponse>(request);
		}

		public void Dispose()
		{
			if (tradingServiceProxy != null)
			{
				tradingServiceProxy.Dispose();
			}
		}
	}
}
