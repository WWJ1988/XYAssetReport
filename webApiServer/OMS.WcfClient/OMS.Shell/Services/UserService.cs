using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OMS.Shell.Desktop.Api.Interfaces;

namespace OMS.Shell.Services
{
	[Export(typeof(IUserService)), PartCreationPolicy(CreationPolicy.Shared)]
	public class UserService : IUserService
	{
		public bool Login(string userName, string password)
		{
			return true;
		}
	}
}
