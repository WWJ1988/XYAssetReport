using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OMS.Trading.Common.Proxy;
using OMS.TradingService.Interfaces;

namespace OMS.TradingService.Handlers
{
	public class OrderHandler : IOperationHandler, IMessageHandler, IConsumeHandler
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
	}
}
