using System;
using System.Threading.Tasks;
using OMS.Common.Communicator.Constracts;
using OMS.Common.Transports.Communicator.Messages;
using OMS.Common.Transports.Communicator.Request;
using OMS.Common.Transports.Communicator.Response;

namespace OMS.Communicator.Services
{
	public abstract class GenericServiceProxy : IDisposable
	{
		private readonly MqClient mqClient;

		public GenericServiceProxy()
		{
			mqClient = new MqClient(NetworkConnectionManager.Instance.GetBus(ServiceType));
		}

		public abstract MqServiceType ServiceType { get; }

		public void PublishMessage<TMessage>(TMessage message, string topic = "") where TMessage : MqMessage
		{
			this.mqClient.PublishMessage(message, topic);
		}

		public Task PublishMessageAsync<TMessage>(TMessage message, string topic = "") where TMessage : MqMessage
		{
			return this.mqClient.PublishMessageAsync(message, topic);
		}

		public void SendMessage<TMessage>(TMessage message, string queueName) where TMessage : MqMessage
		{
			this.mqClient.SendMessage(message, queueName);
		}

		public Task SendMessageAsync<TMessage>(TMessage message, string queueName) where TMessage : MqMessage
		{
			return this.mqClient.SendMessageAsync(message, queueName);
		}

		public TResponse RequestMessage<TRequest, TResponse>(TRequest request)
			where TRequest : MqRequest
			where TResponse : MqResponse
		{
			return this.mqClient.RequestMessage<TRequest, TResponse>(request);
		}

		public Task<TResponse> RequestMessageAsync<TRequest, TResponse>(TRequest request)
			where TRequest : MqRequest
			where TResponse : MqResponse
		{
			return this.mqClient.RequestMessageAsync<TRequest, TResponse>(request);
		}

		public void Dispose()
		{
			if (mqClient != null)
			{
				mqClient.Dispose();
			}
		}
	}
}
