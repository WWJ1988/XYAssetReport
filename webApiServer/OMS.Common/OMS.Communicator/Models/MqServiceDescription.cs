using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyNetQ.Topology;

namespace OMS.Communicator.Models
{
	public class MqServiceDescription
	{
		public MqServiceDescription()
		{
			Timeout = 60;
		}

		public string HostName { get; set; }
		public string UserName { get; set; }
		public string Password { get; set; }
		public string ExchangeName { get; set; }
		public List<MqQueue> Queues { get; set; }
		public int Timeout { get; set; }
		public string VirtualHost { get; set; }
		public string ExchangeType { get; set; }
	}
}
