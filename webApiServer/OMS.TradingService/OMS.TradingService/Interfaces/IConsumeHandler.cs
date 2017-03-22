using OMS.Trading.Common.Proxy;

namespace OMS.TradingService.Interfaces
{
	public interface IConsumeHandler
	{
		void HandleConsumeMessage(TradingMqMessage message);
	}
}
