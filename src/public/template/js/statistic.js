'use strict';

var server_cur = s_serv;
var page_cur = '';
var subpage_cur = '';
var filter_cur = '';

function page(name)
{
	if(typeof(name) !== 'undefined' && page_cur != name)
	{
		var page = $.get('/data/'+server_cur+'/'+name+'/'+subpage_cur+'/'+filter_cur+'/');
		page.done(function(data) { $('#stat-data').html(data); });
		page_cur = name;
		$('.button-stat').each(function()
		{
			$(this).removeClass('active');
			let name = $(this).attr('data-page');
			if(name == server_cur || name == page_cur || name == subpage_cur || $(this).attr('data-server') == server_cur)
				$(this).addClass('active');
		});
	}
}

function server(name)
{
	if(server_cur != name)
	{
		server_cur = name;
		if(page_cur != '')
		{
			let x = page_cur;
			page_cur = '';
			page(x);
		}
	}
}

function subpage(name)
{
	if(subpage_cur != name)
	{
		subpage_cur = name;
		if(page_cur != '')
		{
			let x = page_cur;
			page_cur = '';
			page(x);
		}
	}
}

function filter(name)
{
	if(filter_cur != name)
	{
		filter_cur = name;
		if(page_cur != '')
		{
			let x = page_cur;
			page_cur = '';
			page(x);
		}
	}
}
	
$(document).ready(function()
{
	$('.button-stat').each(function()
	{
		$(this).on('click', function()
		{
			let s = $(this).attr('data-server');
			if(s != undefined) server(s);
			else page($(this).attr('data-page'));
		});
	});
	
	page(s_page);
});
