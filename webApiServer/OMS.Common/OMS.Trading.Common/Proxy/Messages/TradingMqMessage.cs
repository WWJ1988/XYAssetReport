using OMS.Common.Transports.Communicator.Messages;
using OMS.Trading.Common.Constracts;

namespace OMS.Trading.Common.Proxy
{
	public class TradingMqMessage : MqMessage
	{
		public TradingOperationType MessageType { get; set; }
	}
}
