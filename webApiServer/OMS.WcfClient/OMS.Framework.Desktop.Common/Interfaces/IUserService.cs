using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Framework.Desktop.Common.Interfaces
{
	public interface IUserService
	{
		bool Login(string userName, string password);
	}
}
