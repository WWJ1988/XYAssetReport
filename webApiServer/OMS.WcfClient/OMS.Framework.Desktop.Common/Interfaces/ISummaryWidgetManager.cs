using System;
using System.Collections.Generic;
using OMS.Framework.Desktop.Common.Controls;
using OMS.Framework.Desktop.Common.Metadatas;

namespace OMS.Framework.Desktop.Common.Interfaces
{
	public interface ISummaryWidgetManager
	{
		void Initialize();
		void Register(SummaryWidgetMetadata metadata, Func<IServiceProvider, SummaryWidgetBaseViewModel> getVmFunc);
		IEnumerable<SummaryWidgetMetadata> GetWidgetMetadatas();
		KeyValuePair<SummaryWidgetMetadata, Func<IServiceProvider, SummaryWidgetBaseViewModel>> GetSummaryWidget(string widgetName);
	}
}
