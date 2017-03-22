using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyNetQ;
using EasyNetQ.Consumer;
using OMS.Common.Transports.Communicator.Messages;

namespace OMS.Communicator.Dispatchers
{
	public class MqReceiveDispatcher : MqMessageDispatcher
	{
		private IReceiveRegistration receiveRegistration;

		public MqReceiveDispatcher(IBus bus)
			: base(bus)
		{
		}

		public override void InitializeDispatcher()
		{
			bus.Receive("queue", x =>
				{
					this.receiveRegistration = x;
				});
		}

		public void Register<T>(Action<T> action) where T : class
		{
			this.receiveRegistration.Add<T>(action);
		}
	}
}
