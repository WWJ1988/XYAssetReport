using Microsoft.Practices.Prism.Regions;
using OMS.Framework.Desktop.Common.Interfaces;
using OMS.Shell.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;

namespace OMS.Shell.Services
{
    [Export(typeof(ISummaryWidgetManager)), PartCreationPolicy(CreationPolicy.Shared)]
    internal class SummaryWidgetManager : ISummaryWidgetManager
    {
        private readonly IEnumerable<ISummaryWidgetFactory> widgetFactories;
        private readonly IServiceProvider rootServiceProvider;
        private readonly IRegionManager regionManager;

        [ImportingConstructor]
        public SummaryWidgetManager([ImportMany]IEnumerable<ISummaryWidgetFactory> widgetFactories,
            IServiceProvider rootServiceProvider,
            IRegionManager regionManager)
        {
            this.rootServiceProvider = rootServiceProvider;
            this.widgetFactories = widgetFactories;
            this.regionManager = regionManager;
        }
    }
}
