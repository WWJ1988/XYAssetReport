using OMS.Common.Communicator.Constracts;
using OMS.Communicator.Services;

namespace OMS.Trading.Common.Proxy
{
	public class TradingServiceProxy : GenericServiceProxy
	{
		public override MqServiceType ServiceType
		{
			get
			{
				return MqServiceType.Trading;
			}
		}
	}
}
