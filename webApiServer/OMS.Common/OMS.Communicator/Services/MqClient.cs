using System;
using System.Threading.Tasks;
using EasyNetQ;
using OMS.Common.Transports.Communicator.Messages;
using OMS.Common.Transports.Communicator.Request;
using OMS.Common.Transports.Communicator.Response;
using OMS.Communicator.Interfaces;

namespace OMS.Communicator.Services
{
	public class MqClient : IDisposable
	{
		private readonly IBus bus;

		public MqClient(IBus bus)
		{
			this.bus = bus;
		}

		public void PublishMessage<TMessage>(TMessage message, string topic = "")
			where TMessage : MqMessage
		{
			this.bus.Publish(message, topic);
		}

		public Task PublishMessageAsync<TMessage>(TMessage message, string topic = "")
			where TMessage : MqMessage
		{
			return this.bus.PublishAsync(message, topic);
		}

		public void SendMessage<TMessage>(TMessage message, string queueName)
			where TMessage : MqMessage
		{
			this.bus.Send(queueName, message);
		}

		public Task SendMessageAsync<TMessage>(TMessage message, string queueName)
			where TMessage : MqMessage
		{
			return this.bus.SendAsync(queueName, message);
		}

		public TResponse RequestMessage<TRequest, TResponse>(TRequest request)
			where TRequest : MqRequest
			where TResponse : MqResponse
		{
			return this.bus.Request<TRequest, TResponse>(request);
		}

		public Task<TResponse> RequestMessageAsync<TRequest, TResponse>(TRequest request)
			where TRequest : MqRequest
			where TResponse : MqResponse
		{
			return this.bus.RequestAsync<TRequest, TResponse>(request);
		}

		public void Dispose()
		{
			if (this.bus != null)
			{
				this.bus.Dispose();
			}
		}
	}
}
