using System.Diagnostics;
using OMS.Trading.Common.Proxy;
using OMS.Trading.Common.Proxy.Requests;
using OMS.Trading.Common.Proxy.Responses;
using OMS.TradingService.Interfaces;

namespace OMS.TradingService.Handlers
{
	public class OrderHandler : IOperationHandler<TradingOrderRequest, TradingOrderResponse>, IOperationHandler<TradingMqRequest, TradingMqResponse>, IMessageHandler, IConsumeHandler
	{
		public void HandleReceiveMessage(TradingMqMessage message)
		{
			Debug.Write(message.Message);
		}

		public TradingMqResponse RespondToClient(TradingMqRequest request)
		{
			return new TradingMqResponse();
		}

		public void HandleConsumeMessage(TradingMqMessage message)
		{
			Debug.Write(message.Message);
		}

		public TradingOrderResponse RespondToClient(TradingOrderRequest request)
		{
			return new TradingOrderResponse();
		}
	}
}
