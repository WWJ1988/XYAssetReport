using OMS.Framework.Desktop.Common.BaseViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Framework.Desktop.Common.Interfaces
{
	public interface ISummaryWidgetFactory
	{
		void Initialize(IServiceProvider serviceProvider);
	}
}
