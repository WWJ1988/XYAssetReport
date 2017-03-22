using OMS.Common.Transports.Communicator.Request;
using OMS.Trading.Common.Constracts;

namespace OMS.Trading.Common.Proxy
{
	public class TradingMqRequest : MqRequest
	{
		public TradingOperationType MessageType { get; set; }
	}
}
