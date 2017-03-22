using System;
using EasyNetQ;

namespace OMS.Communicator.Dispatchers
{
	public class MqConsumerDispatcher : MqMessageDispatcher
	{
		public MqConsumerDispatcher(IBus bus)
			: base(bus)
		{
		}

		public override void InitializeDispatcher()
		{
		}

		public void Register<T>(Action<T> action) where T : class
		{
			bus.Subscribe("Trading", action);
		}
	}
}
