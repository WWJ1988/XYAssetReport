using System.Collections.Generic;
using System.Text;
using EasyNetQ;
using OMS.Communicator.Constracts;
using OMS.Communicator.Interfaces;
using OMS.Communicator.Models;

namespace OMS.Communicator.Services
{
	public class NetworkConnectionManager : INetworkConnectionManager
	{
		private static readonly NetworkConnectionManager instance = new NetworkConnectionManager();
		private readonly IDictionary<MqServiceType, MqServiceDescription> providedServices;

		private NetworkConnectionManager()
		{
			providedServices = new Dictionary<MqServiceType, MqServiceDescription>();
			InitializeServices();
		}

		public static INetworkConnectionManager Instance
		{
			get
			{
				return instance;
			}
		}

		public IBus GetBus(MqServiceType type)
		{
			if (!providedServices.ContainsKey(type))
			{
				return null;
			}

			var description = providedServices[type];
			StringBuilder strBuilder = new StringBuilder();
			strBuilder.Append("host=");
			strBuilder.Append(description.HostName);

			if (!string.IsNullOrWhiteSpace(description.VirtualHost))
			{
				strBuilder.Append(";virtualHost=");
				strBuilder.Append(description.VirtualHost);
			}

			if (!string.IsNullOrWhiteSpace(description.UserName))
			{
				strBuilder.Append(";username=");
				strBuilder.Append(description.UserName);
			}

			if (!string.IsNullOrWhiteSpace(description.Password))
			{
				strBuilder.Append(";password=");
				strBuilder.Append(description.Password);
			}

			strBuilder.Append(";timeout=");
			strBuilder.Append(description.Timeout);

			return RabbitHutch.CreateBus(strBuilder.ToString());
		}

		private void InitializeServices()
		{
			var tradingServiceDescription = new MqServiceDescription();
			tradingServiceDescription.HostName = "localhost";
			tradingServiceDescription.VirtualHost = "/";

			providedServices.Add(MqServiceType.Trading, tradingServiceDescription);
		}
	}
}
