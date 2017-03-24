using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Practices.Prism.Regions;

namespace OMS.Shell.VIewModels
{
	public class TopSummaryWidgetViewModel : INotifyPropertyChanged
	{
		private IRegion contentRegion;

		public string Header { get; set; }

		public IRegion ContentRegion
		{
			get { return contentRegion; }
			set { Notify("contentRegion"); }
		}

		public string ContentRegionName
		{
			get
			{
				return "";
			}
		}

		public event PropertyChangedEventHandler PropertyChanged;

		public void Notify(string propertyName)
		{
			PropertyChangedEventHandler handler = this.PropertyChanged;
			if (handler != null)
				handler(this, new PropertyChangedEventArgs(propertyName));
		}
	}
}
