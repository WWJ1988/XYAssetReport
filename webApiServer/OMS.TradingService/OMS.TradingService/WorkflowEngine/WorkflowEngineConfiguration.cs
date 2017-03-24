using System;
using System.Collections.Generic;
using OMS.Trading.Common.Constracts;
using OMS.TradingService.Handlers;

namespace OMS.TradingService
{
	public class WorkflowEngineConfiguration
	{
		private readonly Dictionary<TradingOperationType, Type> _operationInfo = new Dictionary<TradingOperationType, Type>();

		public WorkflowEngineConfiguration()
		{
			InitializeOperationInfos();
		}

		public bool TryGetOperationtHandler(TradingOperationType operationType, out Type handlerType)
		{
			bool success = false;
			if (_operationInfo.TryGetValue(operationType, out handlerType))
			{
				success = true;
			}
			else
			{
				handlerType = null;
			}
			return success;
		}

		private void InitializeOperationInfos()
		{
			_operationInfo.Add(TradingOperationType.AddOrder, typeof(OrderHandler));
		}
	}
}
