using System;
using System.Collections.Generic;
using System.Windows.Controls;
using OMS.Framework.Desktop.Common.BaseViewModels;
using OMS.Framework.Desktop.Common.Metadatas;

namespace OMS.Framework.Desktop.Common.Interfaces
{
	public interface IApplicationWidgetManager
	{
		void Initialize();

		void Register(ApplicationWidgetMetadata metadata, Func<IServiceProvider, Tuple<TabItem, ApplicationWidgetBaseViewModel>> getVmFunc);

		IEnumerable<ApplicationWidgetMetadata> GetWidgetMetadatas();

		KeyValuePair<ApplicationWidgetMetadata, Func<IServiceProvider, Tuple<TabItem, ApplicationWidgetBaseViewModel>>> GetApplicationWidget(string widgetName);

		void AddActiveWidget(string widgetName);

		void RemoveActiveWidget(string widgetName);
	}
}
