using System;
using System.Windows.Forms;
using OMS.Common.Transports.Trading;
using OMS.Trading.Common.Proxy;
using OMS.Trading.Common.Services;
using OMS.Trading.Common.Transports;

namespace OMS.Client
{
	public partial class Form1 : Form
	{
		private TradingService tradingService;

		public Form1()
		{
			InitializeComponent();
			tradingService = new TradingService();
		}

		private void button1_Click(object sender, EventArgs e)
		{
			TradingMqMessage message = new TradingMqMessage();
			message.Message = "Test Publish";
			//tradingService.PublishMessage(message, "");
		}

		private void button2_Click(object sender, EventArgs e)
		{
			TradingMqMessage message = new TradingMqMessage();
			message.Message = "Test Send";
			//mqClient.SendMessage(message, "queue");
		}

		private void button3_Click(object sender, EventArgs e)
		{
			TradeOrder order = new TradeOrder();
			order.Action = TradingAction.Buy;
			order.Amount = 1000;
			order.Security = "IBM";

			var response = tradingService.AddOrder(order);
			//TradingMqRequest request = new TradingMqRequest();
			//TradingMqResponse response = tradingService.RequestMessage<TradingMqRequest, TradingMqResponse>(request);
		}

		private void Form1_FormClosed(object sender, FormClosedEventArgs e)
		{
			tradingService.Dispose();
		}
	}
}
