using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace OMS.Framework.Styles
{
    public class OMSFrameworkStyle : ResourceDictionary
    {
        /// <summary>
        /// Gets or sets the uniform resource identifier (URI) to load resources from.
        /// </summary>
        /// <returns>The source location of an external resource dictionary. </returns>
        public new Uri Source
        {
            get { return null; }
            set
            {
                throw new Exception("Use DesignTimeSource instead Source!");
            }
        }

        /// <summary>
        /// Hardcode Source
        /// </summary>
        public OMSFrameworkStyle()
        {
            if ((bool)DesignerProperties.IsInDesignModeProperty.GetMetadata(typeof(DependencyObject)).DefaultValue)
            {
                base.Source = new Uri("pack://application:,,,/OMS.Framework.Styles;component/OMSFramewokStyle.xaml");
            }
        }
    }
}
