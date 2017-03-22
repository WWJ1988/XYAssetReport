using System;
using EasyNetQ;
using OMS.Communicator.Constracts;
using OMS.Communicator.Dispatchers;
using OMS.Communicator.Interfaces;

namespace OMS.Communicator.Services
{
	public class MqMessageManager : IDisposable
	{
		private readonly INetworkConnectionManager connectionManager;
		private IBus bus;
		private MqConsumerDispatcher consumerDispatcher;
		private MqReceiveDispatcher receiveDispatcher;
		private MqResponseDispatcher responseDispatcher;

		public MqMessageManager(MqServiceType type)
		{
			this.connectionManager = NetworkConnectionManager.Instance;
			this.bus = this.connectionManager.GetBus(type);
		}

		public void InitializeConsumerDispatcher()
		{
			this.consumerDispatcher = new MqConsumerDispatcher(this.bus);
			this.consumerDispatcher.InitializeDispatcher();
		}

		public void InitializeReceiveDispatcher()
		{
			this.receiveDispatcher = new MqReceiveDispatcher(this.bus);
			this.receiveDispatcher.InitializeDispatcher();
		}

		public void InitializeResponseDispatcher()
		{
			this.responseDispatcher = new MqResponseDispatcher(this.bus);
			this.responseDispatcher.InitializeDispatcher();
		}

		public void AddConsumerRegistration<T>(Action<T> action) where T : class
		{
			if (this.consumerDispatcher != null)
			{
				this.consumerDispatcher.Register(action);
			}
		}

		public void AddReceiveRegistration<T>(Action<T> action) where T : class
		{
			if (this.receiveDispatcher != null)
			{
				this.receiveDispatcher.Register<T>(action);
			}
		}

		public void AddResponseRegistrationRegist<TRequest, TResponse>(Func<TRequest, TResponse> func)
			where TRequest : class
			where TResponse : class
		{
			if (this.responseDispatcher != null)
			{
				this.responseDispatcher.RegistResponse(func);
			}
		}

		public void Dispose()
		{
			if (bus != null)
			{
				bus.Dispose();
			}
		}
	}
}
