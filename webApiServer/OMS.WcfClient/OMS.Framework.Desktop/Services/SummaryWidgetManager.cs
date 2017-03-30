using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using OMS.Framework.Desktop.Common.Controls;
using OMS.Framework.Desktop.Common.Interfaces;
using OMS.Framework.Desktop.Common.Metadatas;
using System.Windows.Controls;

namespace OMS.Framework.Desktop.Services
{
    [Export(typeof(ISummaryWidgetManager)), PartCreationPolicy(CreationPolicy.Shared)]
    internal class SummaryWidgetManager : ISummaryWidgetManager
    {
        private readonly IEnumerable<ISummaryWidgetFactory> widgetFactories;
        private readonly IServiceProvider rootServiceProvider;
        private readonly Dictionary<SummaryWidgetMetadata, Func<IServiceProvider, Tuple<UserControl, SummaryWidgetBaseViewModel>>> summaryWidgets = new Dictionary<SummaryWidgetMetadata, Func<IServiceProvider, Tuple<UserControl, SummaryWidgetBaseViewModel>>>();

        [ImportingConstructor]
        public SummaryWidgetManager([ImportMany]IEnumerable<ISummaryWidgetFactory> widgetFactories,
            IServiceProvider rootServiceProvider)
        {
            this.rootServiceProvider = rootServiceProvider;
            this.widgetFactories = widgetFactories;
        }

        public void Initialize()
        {
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
    }
}
