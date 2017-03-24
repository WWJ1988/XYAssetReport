using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OMS.Shell.Desktop.Api.Interfaces;

namespace OMS.Trading.Desktop.Order
{
	[Export(typeof(ITileFactory))]
	public class DashboardTileFactory : ITileFactory
	{
	}
}
