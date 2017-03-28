using OMS.Framework.Desktop.Common.Controls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Framework.Desktop.Common.Interfaces
{
    public interface ISummaryWidgetFactory
    {
        string ViewName { get; }
        SummaryWidget SummaryView { get; }
        SummaryWidgetBaseViewModel SummaryViewModel { get; }
    }
}
