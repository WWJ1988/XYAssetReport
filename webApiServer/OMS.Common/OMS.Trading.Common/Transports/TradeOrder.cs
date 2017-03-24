using OMS.Common.Transports.Trading;

namespace OMS.Trading.Common.Transports
{
	public class TradeOrder
	{
		public string Security { get; set; }
		public decimal Amount { get; set; }
		public TradingAction Action { get; set; }
	}
}
