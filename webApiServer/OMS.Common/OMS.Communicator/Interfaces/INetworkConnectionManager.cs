using EasyNetQ;
using OMS.Communicator.Constracts;

namespace OMS.Communicator.Interfaces
{
	public interface INetworkConnectionManager
	{
		IBus GetBus(MqServiceType type);
	}
}
