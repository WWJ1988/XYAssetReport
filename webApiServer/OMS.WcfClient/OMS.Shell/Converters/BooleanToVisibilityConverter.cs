using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Data;

namespace OMS.Shell.Converters
{
	[ValueConversion(typeof(bool), typeof(Visibility))]
	public class BooleanToVisibilityConverter : IValueConverter
	{
		public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
		{
			try
			{
				if (value == null)
					return DependencyProperty.UnsetValue;

				return (bool)value ? Visibility.Visible : Visibility.Hidden;
			}
			catch
			{
				return DependencyProperty.UnsetValue;
			}
		}

		public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
		{
			try
			{
				if (value == null)
					return DependencyProperty.UnsetValue;

				return (Visibility)value == Visibility.Hidden ? false : true;
			}
			catch
			{
				return DependencyProperty.UnsetValue;
			}
		}
	}
}
