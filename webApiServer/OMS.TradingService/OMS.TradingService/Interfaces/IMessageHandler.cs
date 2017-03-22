using OMS.Trading.Common.Proxy;

namespace OMS.TradingService.Interfaces
{
	public interface IMessageHandler
	{
		void HandleReceiveMessage(TradingMqMessage message);
	}
}
