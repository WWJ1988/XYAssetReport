using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyNetQ;
using EasyNetQ.AutoSubscribe;
using OMS.Common.Transports.Communicator.Messages;

namespace OMS.Communicator.Dispatchers
{
	public abstract class MqMessageDispatcher
	{
		protected readonly IBus bus;

		public MqMessageDispatcher(IBus bus)
		{
			this.bus = bus;
		}

		public abstract void InitializeDispatcher();
	}
}
