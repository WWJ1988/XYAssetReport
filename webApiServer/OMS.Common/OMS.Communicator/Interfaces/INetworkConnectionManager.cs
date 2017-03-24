using EasyNetQ;
using OMS.Common.Communicator.Constracts;

namespace OMS.Communicator.Interfaces
{
	public interface INetworkConnectionManager
	{
		IBus GetBus(MqServiceType type);
	}
}
