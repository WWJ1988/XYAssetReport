using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using OMS.Communicator.Constracts;
using OMS.Communicator.Interfaces;
using OMS.Communicator.Services;
using OMS.Trading.Common.Proxy;

namespace OMS.Client
{
	public partial class Form1 : Form
	{
		private MqClient mqClient;

		public Form1()
		{
			InitializeComponent();
			mqClient = new MqClient(NetworkConnectionManager.Instance.GetBus(MqServiceType.Trading));
		}

		private void button1_Click(object sender, EventArgs e)
		{
			TradingMqMessage message = new TradingMqMessage();
			message.Message = "Test Publish";
			mqClient.PublishMessage(message, "");
		}

		private void button2_Click(object sender, EventArgs e)
		{
			TradingMqMessage message = new TradingMqMessage();
			message.Message = "Test Send";
			mqClient.SendMessage(message, "queue");
		}

		private void button3_Click(object sender, EventArgs e)
		{
			TradingMqRequest request = new TradingMqRequest();
			TradingMqResponse response = mqClient.RequestMessage<TradingMqRequest, TradingMqResponse>(request);
		}

		private void Form1_FormClosed(object sender, FormClosedEventArgs e)
		{
			mqClient.Dispose();
		}
	}
}
