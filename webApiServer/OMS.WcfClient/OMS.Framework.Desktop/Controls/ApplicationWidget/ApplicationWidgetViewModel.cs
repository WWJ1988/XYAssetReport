using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Mvvm;
using Microsoft.Practices.ServiceLocation;
using OMS.Framework.Desktop.Common.Interfaces;
using OMS.Framework.Desktop.Common.Metadatas;

namespace OMS.Framework.Desktop.Controls
{
	public class ApplicationWidgetViewModel : BindableBase
	{
		private IApplicationWidgetManager applicationWidgetManager;

		private IEnumerable<ApplicationWidgetMetadata> widgets;
		private string selectedVidgetName = "";
		private bool showPopup = false;

		private readonly DelegateCommand addApplicationWidgetCommand;
		private readonly DelegateCommand doAddApplicationWidgetCommand;
		private readonly DelegateCommand cancelAddApplicationWidgetCommand;

		public ApplicationWidgetViewModel()
		{
			addApplicationWidgetCommand = new DelegateCommand(() =>
			{
				ShowPopup = true;
			});
			doAddApplicationWidgetCommand = new DelegateCommand(() =>
			{
				applicationWidgetManager.AddActiveWidget(selectedVidgetName);

				ShowPopup = false;
			});
			cancelAddApplicationWidgetCommand = new DelegateCommand(() =>
			{
				ShowPopup = false;
			});
		}

		public ICommand AddApplicationWidgetCommand { get { return addApplicationWidgetCommand; } }
		public ICommand DoAddApplicationWidgetCommand { get { return doAddApplicationWidgetCommand; } }
		public ICommand CancelAddApplicationWidgetCommand { get { return cancelAddApplicationWidgetCommand; } }

		public IEnumerable<ApplicationWidgetMetadata> Widgets
		{
			get
			{
				if (applicationWidgetManager != null && widgets == null)
				{
					widgets = applicationWidgetManager.GetWidgetMetadatas();
				}

				return widgets;
			}
		}

		public bool ShowPopup
		{
			get { return showPopup; }
			set { SetProperty(ref showPopup, value); }
		}

		public string SelectedVidgetName
		{
			get
			{
				return selectedVidgetName;
			}
			set
			{
				SetProperty(ref selectedVidgetName, value);
			}
		}

		public void InitializeServices(IServiceLocator serviceLocator)
		{
			applicationWidgetManager = serviceLocator.GetInstance<IApplicationWidgetManager>();
			applicationWidgetManager.Initialize();
		}
	}
}
