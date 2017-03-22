using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using OMS.TradingService.Gateway;

namespace TradingServiceStart
{
	public partial class Form1 : Form
	{
		private TradingServiceGateway gateway;

		public Form1()
		{
			InitializeComponent();
		}

		private void button1_Click(object sender, EventArgs e)
		{
			gateway = new TradingServiceGateway();
		}

		private void Form1_FormClosed(object sender, FormClosedEventArgs e)
		{
			if (gateway != null)
			{
				gateway.Dispose();
			}
		}
	}
}
