using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OMS.Shell.Desktop.Api.Interfaces;

namespace OMS.Shell.Services
{
	[Export(typeof(TileManager)), PartCreationPolicy(CreationPolicy.Shared)]
	public class TileManager
	{
		[ImportingConstructor]
		public TileManager([ImportMany]IEnumerable<ITileFactory> factories)
		{

		}
	}
}
