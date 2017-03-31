using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using OMS.Framework.Desktop.Common.BaseViewModels;
using OMS.Framework.Desktop.Common.Interfaces;
using OMS.Framework.Desktop.Common.Metadatas;
using System.Windows.Controls;
using Microsoft.Practices.Prism.Regions;

namespace OMS.Framework.Desktop.Services
{
	[Export(typeof(ISummaryWidgetManager)), PartCreationPolicy(CreationPolicy.Shared)]
	internal class SummaryWidgetManager : ISummaryWidgetManager
	{
		private readonly IEnumerable<ISummaryWidgetFactory> widgetFactories;
		private readonly IServiceProvider rootServiceProvider;
		private IRegionManager regionManager;
		private readonly Dictionary<SummaryWidgetMetadata, Func<IServiceProvider, Tuple<UserControl, SummaryWidgetBaseViewModel>>> summaryWidgets = new Dictionary<SummaryWidgetMetadata, Func<IServiceProvider, Tuple<UserControl, SummaryWidgetBaseViewModel>>>();
		private readonly Dictionary<string, object> activeWidgets = new Dictionary<string, object>();

		[ImportingConstructor]
		public SummaryWidgetManager([ImportMany]IEnumerable<ISummaryWidgetFactory> widgetFactories,
			IServiceProvider rootServiceProvider)
		{
			this.rootServiceProvider = rootServiceProvider;
			this.widgetFactories = widgetFactories;
		}

		public void Initialize()
		{
			regionManager = rootServiceProvider.GetService(typeof(IRegionManager)) as IRegionManager;

			if (widgetFactories != null)
			{
				foreach (var factory in widgetFactories)
				{
					factory.Initialize(rootServiceProvider);
				}
			}
		}

		public void Register(SummaryWidgetMetadata metadata, Func<IServiceProvider, Tuple<UserControl, SummaryWidgetBaseViewModel>> getVmFunc)
		{
			if (!summaryWidgets.ContainsKey(metadata))
			{
				summaryWidgets[metadata] = getVmFunc;
			}
		}

		public IEnumerable<SummaryWidgetMetadata> GetWidgetMetadatas()
		{
			return summaryWidgets.Keys;
		}

		public KeyValuePair<SummaryWidgetMetadata, Func<IServiceProvider, Tuple<UserControl, SummaryWidgetBaseViewModel>>> GetSummaryWidget(string widgetName)
		{
			return summaryWidgets.FirstOrDefault(w => w.Key.WidgetName == widgetName);
		}

		public void AddActiveWidget(string widgetName)
		{
			if (!activeWidgets.ContainsKey(widgetName))
			{
				var region = regionManager.Regions["SummaryWidget"];

				var widget = GetSummaryWidget(widgetName);

				if (widget.Key != null)
				{
					var summaryWidgetData = widget.Value(rootServiceProvider);
					var view = summaryWidgetData.Item1;
					view.DataContext = summaryWidgetData.Item2;
					region.Add(view);

					activeWidgets.Add(widgetName, view);
				}
			}
		}

		public void RemoveActiveWidget(string widgetName)
		{
			if (activeWidgets.ContainsKey(widgetName))
			{
				var region = regionManager.Regions["SummaryWidget"];
				region.Remove(activeWidgets[widgetName]);
				activeWidgets.Remove(widgetName);
			}
		}
	}
}
