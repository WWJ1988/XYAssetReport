using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OMS.Trading.Common.Proxy;

namespace OMS.TradingService.Interfaces
{
	public interface IOperationHandler
	{
		TradingMqResponse RespondToClient(TradingMqRequest request);
	}
}
