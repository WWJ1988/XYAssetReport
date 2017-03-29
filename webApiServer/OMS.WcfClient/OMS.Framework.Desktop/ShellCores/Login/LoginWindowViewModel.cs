using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Mvvm;
using OMS.Framework.Desktop.Common.Interfaces;
using System;
using System.Diagnostics;
using System.Windows.Input;

namespace OMS.Framework.Desktop.ShellCores.Login
{
    internal class LoginWindowViewModel : BindableBase
	{
		private string errorMessage;
		private string username;
		private string password;
		private bool isUserRemembered;

		private readonly DelegateCommand okButtonCommand;
		private readonly IUserService userService;

		public event EventHandler<AuthenticateResult> AuthenticationComplete;

		internal LoginWindowViewModel(IUserService userService)
		{
			this.userService = userService;

			okButtonCommand = new DelegateCommand(() =>
			{
				if (Validate())
				{
					Authenticate(UserName, Password);
				}
			});
		}

		public ICommand OkButtonCommand { get { return okButtonCommand; } }

		public bool HasAlertText
		{
			get { return !string.IsNullOrEmpty(ErrorMessage); }
		}

		public string ErrorMessage
		{
			get { return errorMessage; }
			set
			{
				SetProperty(ref errorMessage, value);
				OnPropertyChanged("HasAlertText");
			}
		}

		public bool IsUserRemembered
		{
			get { return isUserRemembered; }
			set { SetProperty(ref isUserRemembered, value); }
		}

		public string UserName
		{
			get { return username; }
			set { SetProperty(ref username, value); }
		}

		public string Password
		{
			get { return password; }
			set { SetProperty(ref password, value); }
		}

		private bool Validate()
		{
			ErrorMessage = null;

			if (string.IsNullOrEmpty(UserName) || string.IsNullOrEmpty(Password))
			{
				ErrorMessage = "用户名和密码不能为空";
				return false;
			}

			return true;
		}

		public AuthenticateResult Authenticate(string username, string password)
		{
			this.UserName = username;
			this.Password = password;

			AuthenticateResult result;
			try
			{
				if (userService.Login(username, password))
				{
					result = AuthenticateResult.Connected;
				}
				else
				{
					result = AuthenticateResult.ConnectionFailed;
				}
			}
			catch (Exception ex)
			{
				ErrorMessage = ex.Message;
				return OnAuthenticationComplete(AuthenticateResult.ConnectionFailed);
			}

			switch (result)
			{
				case AuthenticateResult.Connected:
				case AuthenticateResult.NeedsPassword:
					return OnAuthenticationComplete(result);

				case AuthenticateResult.ConnectionFailed:
				default:
					ErrorMessage = "Unknown connection state";

					Debug.Assert(false, "Unknown connection state");
					return OnAuthenticationComplete(AuthenticateResult.ConnectionFailed);
			}
		}

		protected virtual AuthenticateResult OnAuthenticationComplete(AuthenticateResult result)
		{
			EventHandler<AuthenticateResult> handler = AuthenticationComplete;
			if (handler != null) handler(this, result);

			return result;
		}
	}

	public enum AuthenticateResult
	{
		Connected,
		ConnectionFailed,
		NeedsPassword,
	}
}
