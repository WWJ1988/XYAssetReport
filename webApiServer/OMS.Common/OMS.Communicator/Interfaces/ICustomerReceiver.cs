using System;

namespace OMS.Communicator.Interfaces
{
	public interface ICustomerReceiver<T>
	{
		Action<T> ReceiveAction { get; }
	}
}
