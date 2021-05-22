'use strict';

$(document).ready(function()
{
	var donate_processing = false;

	$('#donate-submit').on('click', function()
	{
		if(donate_processing) return;
		let f = $('#donate-form');
		let server = f.find('#donate-server');
		let method = f.find('#donate-method');
		let name = f.find('#donate-name');
		let price = f.find('#donate-price');
		let agree = f.find('#donate-agree');
		let error = f.find('#donate-error');
		error.addClass('d-none');
		
		if(name.val().length < 1 || name.val().length > 16)
			error.html('Character name incorrect!');
		else if(method.val() < 1 || method.val() > 3)
			error.html('Incorrect payment method!');
		else if(price.val() < 1 || price.val() > 10000)
			error.html('You cannot donate less than 1 and more than 10000 euro!');
		else if(!agree.is(':checked'))
			error.html('You must accept rules to make a donation!');
		else
		{
			donate_processing = true;
			var posting = $.post('/callback/donate/',{'server':server.val(),'method':method.val(),'name':name.val(),'price':price.val()});
			posting.done(function(data)
			{
				if(data.startsWith('success:'))
					location.href = data.substr(8);
				else {error.html(data);error.removeClass('d-none');}
				donate_processing = false;
			});
			return;
		}
		
		error.removeClass('d-none');
	});
	
	var f_coins = $('#donate-amount');
	var f_price = $('#donate-price');
	document.oninput = function()
	{
		let price = f_price.val();
		if(price != '')
		{
			price = price.replace(/[^\+\d]/g, '');
			if(price < 1)
				price = 1;
			if(price > 10000)
				price = 10000;
			f_price.val(price);
			
			if(price >= 500)
				price = price * 1.4;
			else if(price >= 400)
				price = price * 1.3;
			else if(price >= 300)
				price = price * 1.25;
			else if(price >= 200)
				price = price * 1.2;
			else if(price >= 150)
				price = price * 1.15;
			else if(price >= 100)
				price = price * 1.1;
			
			let coins = price * 10;
			
			f_coins.val(coins.toFixed(0));
		}
		else f_coins.val('');
	}
});