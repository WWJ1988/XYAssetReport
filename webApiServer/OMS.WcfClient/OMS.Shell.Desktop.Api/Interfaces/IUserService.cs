using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Shell.Desktop.Api.Interfaces
{
	public interface IUserService
	{
		bool Login(string userName, string password);
	}
}
