using System.Threading.Tasks;
using OMS.Common.Transports.Communicator.Messages;
using OMS.Common.Transports.Communicator.Request;
using OMS.Common.Transports.Communicator.Response;
using OMS.Communicator.Interfaces;

namespace OMS.Communicator.Services
{
	public class GenericServiceProxy<TService>
			where TService : class
	{
		private readonly INetworkConnectionManager connectionManager;
		private IMqClient mqClient;

		public GenericServiceProxy(INetworkConnectionManager connectionManager)
		{
			this.connectionManager = connectionManager;
		}

		public void PublishMessage(MqMessage message, string topic = "")
		{
			this.mqClient.PublishMessage(message, topic);
		}

		public Task PublishMessageAsync(MqMessage message, string topic = "")
		{
			return this.mqClient.PublishMessageAsync(message, topic);
		}

		public void SendMessage(MqMessage message, string queueName)
		{
			this.mqClient.SendMessage(message, queueName);
		}

		public Task SendMessageAsync(MqMessage message, string queueName)
		{
			return this.mqClient.SendMessageAsync(message, queueName);
		}

		public MqResponse RequestMessage(MqRequest request)
		{
			return new MqResponse();
		}

		public Task<MqResponse> RequestMessageAsync(MqRequest request)
		{
			return null;
		}
	}
}
