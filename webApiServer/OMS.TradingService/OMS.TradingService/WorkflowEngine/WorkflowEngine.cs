using System;
using OMS.Trading.Common.Proxy;
using OMS.Trading.Common.Proxy.Requests;
using OMS.Trading.Common.Proxy.Responses;
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
			TradingGenerateFunc = HandleRequestResponseMessage;
			TradingOrderFunc = HandleTradingOrderRequest;
		}

		public Action<TradingMqMessage> ConsumeAction { get; private set; }
		public Action<TradingMqMessage> ReceiveAction { get; private set; }
		public Func<TradingMqRequest, TradingMqResponse> TradingGenerateFunc { get; set; }
		public Func<TradingOrderRequest, TradingOrderResponse> TradingOrderFunc { get; set; }

		private void HandleConsume(TradingMqMessage message)
		{
			Type handlerType;
			if (configuration.TryGetOperationtHandler(message.MessageType, out handlerType))
			{
				var handler = Activator.CreateInstance(handlerType) as IConsumeHandler;
				handler.HandleConsumeMessage(message);
			}
		}

		private void HandleReceive(TradingMqMessage message)
		{
			Type handlerType;
			if (configuration.TryGetOperationtHandler(message.MessageType, out handlerType))
			{
				var handler = Activator.CreateInstance(handlerType) as IMessageHandler;
				handler.HandleReceiveMessage(message);
			}
		}

		private TradingMqResponse HandleRequestResponseMessage(TradingMqRequest request)
		{
			Type handlerType;
			if (configuration.TryGetOperationtHandler(request.MessageType, out handlerType))
			{
				var handler = Activator.CreateInstance(handlerType) as IOperationHandler<TradingMqRequest, TradingMqResponse>;
				if (handler != null)
				{
					return handler.RespondToClient(request);
				}
			}

			return new TradingMqResponse();
		}

		private TradingOrderResponse HandleTradingOrderRequest(TradingOrderRequest request)
		{
			Type handlerType;
			if (configuration.TryGetOperationtHandler(request.MessageType, out handlerType))
			{
				var handler = Activator.CreateInstance(handlerType) as IOperationHandler<TradingOrderRequest, TradingOrderResponse>;
				if (handler != null)
				{
					return handler.RespondToClient(request);
				}
			}

			return new TradingOrderResponse();
		}
	}
}
