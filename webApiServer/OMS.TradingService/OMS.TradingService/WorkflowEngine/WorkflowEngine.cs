using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OMS.Common.Transports.Communicator.Messages;
using OMS.Common.Transports.Communicator.Request;
using OMS.Common.Transports.Communicator.Response;
using OMS.Trading.Common.Proxy;
using OMS.TradingService.Interfaces;

namespace OMS.TradingService
{
	public class WorkflowEngine
	{
		private WorkflowEngineConfiguration configuration;

		public WorkflowEngine()
		{
			configuration = new WorkflowEngineConfiguration();
			ConsumeAction = this.HandleConsume;
			ReceiveAction = this.HandleReceive;
			Func = HandleRequestResponseMessage;
		}

		public Action<TradingMqMessage> ConsumeAction { get; private set; }

		public Action<TradingMqMessage> ReceiveAction { get; private set; }

		public Func<TradingMqRequest, TradingMqResponse> Func { get; set; }

		public void HandleConsume(TradingMqMessage message)
		{
			Type handlerType;
			if (configuration.TryGetOperationtHandler(message.MessageType, out handlerType))
			{
				var handler = Activator.CreateInstance(handlerType) as IConsumeHandler;
				handler.HandleConsumeMessage(message);
			}
		}

		public void HandleReceive(TradingMqMessage message)
		{
			Type handlerType;
			if (configuration.TryGetOperationtHandler(message.MessageType, out handlerType))
			{
				var handler = Activator.CreateInstance(handlerType) as IMessageHandler;
				handler.HandleReceiveMessage(message);
			}
		}

		public TradingMqResponse HandleRequestResponseMessage(TradingMqRequest request)
		{
			Type handlerType;
			if (configuration.TryGetOperationtHandler(request.MessageType, out handlerType))
			{
				var handler = Activator.CreateInstance(handlerType) as IOperationHandler;
				if (handler != null)
				{
					return handler.RespondToClient(request);
				}
			}

			return new TradingMqResponse();
		}
	}
}
