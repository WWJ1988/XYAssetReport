using System;
using OMS.Common.Communicator.Constracts;
using OMS.Communicator.Services;

namespace OMS.TradingService.Gateway
{
	public class TradingServiceGateway : IDisposable
	{
		private WorkflowEngine workflowEngine;
		private MqMessageManager messageManager;

		public TradingServiceGateway()
		{
			workflowEngine = new WorkflowEngine();
			messageManager = new MqMessageManager(MqServiceType.Trading);
			messageManager.InitializeConsumerDispatcher();
			messageManager.InitializeReceiveDispatcher();
			messageManager.InitializeResponseDispatcher();
			messageManager.AddConsumerRegistration(workflowEngine.ConsumeAction);
			messageManager.AddReceiveRegistration(workflowEngine.ReceiveAction);
			messageManager.AddResponseRegistrationRegist(workflowEngine.TradingGenerateFunc);
			messageManager.AddResponseRegistrationRegist(workflowEngine.TradingOrderFunc);
		}

		public void Dispose()
		{
			if (messageManager != null)
			{
				messageManager.Dispose();
			}
		}
	}
}
