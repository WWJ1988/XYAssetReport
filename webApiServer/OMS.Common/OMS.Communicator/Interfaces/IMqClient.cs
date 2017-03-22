using System.Threading.Tasks;
using OMS.Common.Transports.Communicator.Request;
using OMS.Common.Transports.Communicator.Response;

namespace OMS.Communicator.Interfaces
{
	public interface IMqClient
	{
		void PublishMessage<TMessage>(TMessage message, string topic = "");

		Task PublishMessageAsync<TMessage>(TMessage message, string topic = "");

		void SendMessage<TMessage>(TMessage message, string queueName);

		Task SendMessageAsync<TMessage>(TMessage message, string queueName);

		TResponse RequestMessage<TRequest, TResponse>(TRequest request)
			where TRequest : MqRequest
			where TResponse : MqResponse;

		Task<TResponse> RequestMessageAsync<TRequest, TResponse>(TRequest request)
			where TRequest : MqRequest
			where TResponse : MqResponse;
	}
}
