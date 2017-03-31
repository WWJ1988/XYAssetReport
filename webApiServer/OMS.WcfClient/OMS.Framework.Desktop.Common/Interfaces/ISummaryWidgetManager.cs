using System;
using System.Collections.Generic;
using OMS.Framework.Desktop.Common.BaseViewModels;
using OMS.Framework.Desktop.Common.Metadatas;
using System.Windows.Controls;

namespace OMS.Framework.Desktop.Common.Interfaces
{
	public interface ISummaryWidgetManager
	{
		void Initialize();
		void Register(SummaryWidgetMetadata metadata, Func<IServiceProvider, Tuple<UserControl, SummaryWidgetBaseViewModel>> getVmFunc);
		IEnumerable<SummaryWidgetMetadata> GetWidgetMetadatas();
		KeyValuePair<SummaryWidgetMetadata, Func<IServiceProvider, Tuple<UserControl, SummaryWidgetBaseViewModel>>> GetSummaryWidget(string widgetName);
		void AddActiveWidget(string widgetName);
		void RemoveActiveWidget(string widgetName);
	}
}
