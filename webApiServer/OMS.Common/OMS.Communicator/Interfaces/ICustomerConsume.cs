using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyNetQ.AutoSubscribe;

namespace OMS.Communicator.Interfaces
{
	public interface ICustomerConsume<T> : IConsume<T> where T : class
	{
	}

	public interface ICustomerConsumeAsync<T> : IConsumeAsync<T> where T : class
	{
	}
}
