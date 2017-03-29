using OMS.Framework.Desktop.Common.Interfaces;
using System.ComponentModel.Composition;

namespace OMS.Framework.Desktop.Services
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
