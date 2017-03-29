using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Windows.Controls;
using System.Windows.Input;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Mvvm;
using Microsoft.Practices.Prism.Regions;
using Microsoft.Practices.ServiceLocation;
using OMS.Framework.Desktop.Common.Interfaces;
using OMS.Framework.Desktop.Common.Metadatas;

namespace OMS.Framework.Desktop.Controls
{
	public class FrameworkSummaryViewModel : BindableBase
	{
		private IEnumerable<SummaryWidgetMetadata> widgets;
		private string selectedVidgetName = "";
		private bool showPopup = false;

		private readonly DelegateCommand addSummaryWidgetCommand;
		private readonly DelegateCommand doAddSummaryWidgetCommand;
		private readonly DelegateCommand cancelAddSummaryWidgetCommand;

		[Import]
		private readonly IServiceProvider rootServiceProvider;

		private IRegionManager regionManager;
		private ISummaryWidgetManager summaryWidgetManager;

		public FrameworkSummaryViewModel()
		{
			addSummaryWidgetCommand = new DelegateCommand(() =>
			{
				ShowPopup = true;
			});
			doAddSummaryWidgetCommand = new DelegateCommand(() =>
			{
				var region = regionManager.Regions["SummaryWidget"];

				var widget = summaryWidgetManager.GetSummaryWidget(selectedVidgetName);

				if (widget.Key != null)
				{
					var view = widget.Key.View as UserControl;
					view.DataContext = widget.Value(rootServiceProvider);
					region.Add(view);
				}

				ShowPopup = false;
			});
			cancelAddSummaryWidgetCommand = new DelegateCommand(() =>
			{
				ShowPopup = false;
			});
		}

		public ICommand AddSummaryWidgetCommand { get { return addSummaryWidgetCommand; } }
		public ICommand DoAddSummaryWidgetCommand { get { return doAddSummaryWidgetCommand; } }
		public ICommand CancelAddSummaryWidgetCommand { get { return cancelAddSummaryWidgetCommand; } }

		public IEnumerable<SummaryWidgetMetadata> Widgets
		{
			get
			{
				if (summaryWidgetManager != null && widgets == null)
				{
					widgets = summaryWidgetManager.GetWidgetMetadatas();
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
			regionManager = serviceLocator.GetInstance<IRegionManager>();
			summaryWidgetManager = serviceLocator.GetInstance<ISummaryWidgetManager>();
			summaryWidgetManager.Initialize();
		}
	}
}
