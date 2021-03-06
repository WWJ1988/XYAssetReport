using OMS.Framework.Desktop.Common.Interfaces;
using System;
using System.ComponentModel.Composition;
using System.Threading;
using System.Windows;
using System.Windows.Controls;

namespace OMS.Framework.Desktop.ShellCores.Login
{
    /// <summary>
    /// Interaction logic for LoginWindow.xaml
    /// </summary>
    [Export]
    public partial class LoginWindow : Window
    {
        private int _nestingCounter = 0;

        public event EventHandler LoginComplete;

        [ImportingConstructor]
        public LoginWindow(IUserService userService)
        {
            InitializeComponent();

            LoginWindowViewModel viewModel = new LoginWindowViewModel(userService);
            viewModel.AuthenticationComplete += OnViewModelLoginComplete;

            this.DataContext = viewModel;
        }

        private void OnViewModelLoginComplete(object sender, AuthenticateResult result)
        {
            switch (result)
            {
                case AuthenticateResult.Connected:
                    {
                        var handler = LoginComplete;
                        if (handler != null)
                        {
                            handler(this, EventArgs.Empty);
                        }
                    }
                    break;

                case AuthenticateResult.ConnectionFailed:
                    break;

                case AuthenticateResult.NeedsPassword:
                    break;

                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void OnPasswordChanged(object sender, RoutedEventArgs e)
        {
            try
            {
                Interlocked.Increment(ref _nestingCounter);
                ((LoginWindowViewModel)DataContext).Password = ((PasswordBox)e.Source).Password;
            }
            finally
            {
                Interlocked.Decrement(ref _nestingCounter);
            }
        }
    }
}
