using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using Microsoft.Practices.Prism.Regions;
using OMS.Framework.Desktop.Common.BaseViewModels;
using OMS.Framework.Desktop.Common.Interfaces;
using OMS.Framework.Desktop.Common.Metadatas;

namespace OMS.Framework.Desktop.Services
{
	[Export(typeof(IApplicationWidgetManager)), PartCreationPolicy(CreationPolicy.Shared)]
	internal class ApplicationWidgetManager : IApplicationWidgetManager
	{
		private readonly IEnumerable<IApplicationWidgetFactory> widgetFactories;
		private readonly IServiceProvider rootServiceProvider;
		private IRegionManager regionManager;
		private readonly Dictionary<ApplicationWidgetMetadata, Func<IServiceProvider, Tuple<TabItem, ApplicationWidgetBaseViewModel>>> applicationWidgets = new Dictionary<ApplicationWidgetMetadata, Func<IServiceProvider, Tuple<TabItem, ApplicationWidgetBaseViewModel>>>();
		private readonly Dictionary<string, object> activeWidgets = new Dictionary<string, object>();

		[ImportingConstructor]
		public ApplicationWidgetManager([ImportMany]IEnumerable<IApplicationWidgetFactory> widgetFactories,
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

		public void Register(ApplicationWidgetMetadata metadata, Func<IServiceProvider, Tuple<TabItem, ApplicationWidgetBaseViewModel>> getVmFunc)
		{
			if (!applicationWidgets.ContainsKey(metadata))
			{
				applicationWidgets[metadata] = getVmFunc;
			}
		}

		public IEnumerable<ApplicationWidgetMetadata> GetWidgetMetadatas()
		{
			return applicationWidgets.Keys;
		}

		public KeyValuePair<ApplicationWidgetMetadata, Func<IServiceProvider, Tuple<TabItem, ApplicationWidgetBaseViewModel>>> GetApplicationWidget(string widgetName)
		{
			return applicationWidgets.FirstOrDefault(w => w.Key.WidgetName == widgetName);
		}

		public void AddActiveWidget(string widgetName)
		{
			if (!activeWidgets.ContainsKey(widgetName))
			{
				var region = regionManager.Regions["ApplicationWidget"];

				var widget = GetApplicationWidget(widgetName);

				if (widget.Key != null)
				{
					var applicationWidgetData = widget.Value(rootServiceProvider);
					var view = applicationWidgetData.Item1;
					view.DataContext = applicationWidgetData.Item2;
					region.Add(view);
					region.Activate(view);

					activeWidgets.Add(widgetName, view);
				}
			}
		}

		public void RemoveActiveWidget(string widgetName)
		{
			if (activeWidgets.ContainsKey(widgetName))
			{
				var region = regionManager.Regions["ApplicationWidget"];
				region.Remove(activeWidgets[widgetName]);
				activeWidgets.Remove(widgetName);
			}
		}
	}
}
