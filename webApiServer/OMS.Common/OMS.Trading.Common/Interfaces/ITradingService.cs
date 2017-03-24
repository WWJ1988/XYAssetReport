using OMS.Trading.Common.Proxy.Requests;
using OMS.Trading.Common.Proxy.Responses;
using OMS.Trading.Common.Transports;

namespace OMS.Trading.Common.Interfaces
{
	public interface ITradingService
	{
		TradingOrderResponse AddOrder(TradeOrder order);
	}
}
