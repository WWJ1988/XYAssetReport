using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyNetQ;

namespace OMS.Communicator.Dispatchers
{
	public class MqResponseDispatcher : MqMessageDispatcher
	{
		public MqResponseDispatcher(IBus bus)
			: base(bus)
		{
		}

		public override void InitializeDispatcher()
		{
		}

		public void RegistResponse<TRequest, TResponse>(Func<TRequest, TResponse> func)
			where TRequest : class
			where TResponse : class
		{
			this.bus.Respond(func);
		}
	}
}
