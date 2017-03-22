using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OMS.Communicator.Interfaces;
using OMS.Trading.Common.Proxy;

namespace OMS.TradingService.Handlers
{
	public class TradingMessageHandler : ICustomerConsume<TradingMqMessage>
	{
		public void Consume(TradingMqMessage message)
		{
			Debug.Write(message.Message);
		}
	}
}
