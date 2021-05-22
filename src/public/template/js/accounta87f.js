'use strict';

var acc_text = '\r\n\r\n1. if you don\'t use real email you cannot change your password, or if you lose account you will not be able to recover it.\r\n2. If you delete the txt file with account information and you will forgot your account, password or email its in your responsibility.\r\n3. If you typed a mistake when creating an account, or use not real email, create a new one immediately.\r\n4. Server Admins never ask for account information, take care and have a nice game !';

function saveFile(name, value)
{
	var val = value;
	if(value === undefined)
		val = '';
	var d = document.createElement('a');
	d.href = 'data:text/plain;content-disposition=attachment;filename=file,' + val;
	d.download = name;
	d.style.display = 'none';
	d.id = 'download';
	document.body.appendChild(d);
	document.getElementById('download').click();
	document.body.removeChild(d);
}

var reg_captcha = null;
var restore_captcha = null;
var restore1_captcha = null;
var restore2_captcha = null;
var change_captcha = null;
	
var reg_processing = false;

$(document).ready(function()
{
	$('#reg-submit').on('click', function()
	{
		if(reg_processing) return;
		let f = $('#reg-form');
		let prefix = f.find('#reg-prefix');
		let login = f.find('#reg-login');
		let email = f.find('#reg-email');
		let pass = f.find('#reg-pass');
		let pass2 = f.find('#reg-pass2');
		var captcha = f.find('textarea[name=\'g-recaptcha-response\']').val();
		let token = f.find('#reg-token');
		let ref = f.find('#reg-ref');
		let error = f.find('#reg-error');
		let understand = f.find('#reg-understand');
		let validate = f.find('#reg-validate');
		let agree = f.find('#reg-agree');
		error.addClass('d-none');
		error.removeClass('alert-success');
		error.removeClass('alert-danger');
		if(prefix.val() == 0 && !understand.prop('checked')){error.html('If you don\'t want to use a prefix, you must confirm, that you are understand all risks!');error.removeClass('d-none');error.addClass('alert-danger');return;}
		if(email.val().length == 0 || !validate.prop('checked')){error.html('You must confirm that your email is real!');error.removeClass('d-none');error.addClass('alert-danger');return;}
		if(!agree.prop('checked')){error.html('You must agree with server rules!');error.removeClass('d-none');error.addClass('alert-danger');return;}
		reg_processing = true;
		var posting = $.post('/callback/register/',{'prefix':prefix.val(),'login':login.val(),'email':email.val(),'pass':pass.val(),'pass2':pass2.val(),'captcha':captcha,'token':token.val(),'ref':ref.val()});
		posting.done(function(data)
		{
			if(data.startsWith('success:'))
			{
				let p = '';
				if(prefix.val() != 0)
					p = prefix.find('option:selected').text();
				saveFile('L2Hardcore.com - ' + p + login.val() + '.txt', 'Login: ' + p + login.val() + '\r\nPassword: ' + pass.val() + '\r\n\r\nE-Mail: ' + email.val() + acc_text);
				error.html('Account successfully created!');error.removeClass('d-none');error.addClass('alert-success');
				login.val('');
				email.val('');
				pass.val('');
				pass2.val('');
				let a = data.split(':');
				token.val(a[1]);
				prefix.html(atob(a[2]));
				prefix.change();
				understand.prop('checked', false);
				validate.prop('checked', false);
				agree.prop('checked', false);
			}
			else{error.html(data);error.removeClass('d-none');error.addClass('alert-danger');}
			grecaptcha.reset(reg_captcha);
			reg_processing = false;
		});
	});

	var restore_processing = false;

	$('#restore-submit').on('click', function()
	{
		if(restore_processing) return;
		let f = $('#restore-form');
		let login = f.find('#restore-login');
		var captcha = f.find('textarea[name=\'g-recaptcha-response\']').val();
		let error = f.find('#restore-error');
		error.addClass('d-none');
		error.removeClass('alert-success');
		error.removeClass('alert-danger');
		restore_processing = true;
		var posting = $.post('/callback/restore/',{'login':login.val(),'captcha':captcha});
		posting.done(function(data)
		{
			if(data.startsWith('success:'))
			{
				let a = data.split(':');
				error.html(a[1]);error.removeClass('d-none');error.addClass('alert-success');
				login.val('');
			}
			else{error.html(data);error.removeClass('d-none');error.addClass('alert-danger');}
			grecaptcha.reset(restore_captcha);
			restore_processing = false;
		});
	});

	var restore1_processing = false;

	$('#restore1-submit').on('click', function()
	{
		if(restore1_processing) return;
		let f = $('#restore1-form');
		let email = f.find('#restore1-email');
		var captcha = f.find('textarea[name=\'g-recaptcha-response\']').val();
		let error = f.find('#restore1-error');
		error.addClass('d-none');
		error.removeClass('alert-success');
		error.removeClass('alert-danger');
		restore1_processing = true;
		var posting = $.post('/callback/restore/',{'email':email.val(),'captcha':captcha,'list':'true'});
		posting.done(function(data)
		{
			if(data.startsWith('success:'))
			{
				let a = data.split(':');
				error.html(a[1]);error.removeClass('d-none');error.addClass('alert-success');
				email.val('');
			}
			else{error.html(data);error.removeClass('d-none');error.addClass('alert-danger');}
			grecaptcha.reset(restore1_captcha);
			restore1_processing = false;
		});
	});

	var restore2_processing = false;

	$('#restore2-submit').on('click', function()
	{
		if(restore2_processing) return;
		let f = $('#restore2-form');
		let pass = f.find('#restore2-pass');
		let pass2 = f.find('#restore2-pass2');
		var captcha = f.find('textarea[name=\'g-recaptcha-response\']').val();
		let token = f.find('#restore2-token');
		let error = f.find('#restore2-error');
		if(token.val() == '')
		{
			error.html('Invalid or outdated restore link!');
			error.removeClass('d-none');
			error.addClass('alert-danger');
			return;
		}
		error.addClass('d-none');
		error.removeClass('alert-success');
		error.removeClass('alert-danger');
		restore2_processing = true;
		var posting = $.post('/callback/restore/',{'pass':pass.val(),'pass2':pass2.val(),'captcha':captcha,'token':token.val()});
		posting.done(function(data)
		{
			if(data.startsWith('success:'))
			{
				let a = data.split(':');
				error.html(a[1]);error.removeClass('d-none');error.addClass('alert-success');
				pass.val('');
				pass2.val('');
				token.val('');
			}
			else{error.html(data);error.removeClass('d-none');error.addClass('alert-danger');}
			grecaptcha.reset(restore2_captcha);
			restore2_processing = false;
		});
	});

	var change_processing = false;

	$('#change-submit').on('click', function()
	{
		if(change_processing) return;
		let f = $('#change-form');
		let login = f.find('#change-login');
		let pass = f.find('#change-pass');
		let pass2 = f.find('#change-pass2');
		let pass3 = f.find('#change-pass3');
		var captcha = f.find('textarea[name=\'g-recaptcha-response\']').val();
		let error = f.find('#change-error');
		error.addClass('d-none');
		error.removeClass('alert-success');
		error.removeClass('alert-danger');
		change_processing = true;
		var posting = $.post('/callback/change/',{'login':login.val(),'pass':pass.val(),'pass2':pass2.val(),'pass3':pass3.val(),'captcha':captcha});
		posting.done(function(data)
		{
			if(data.startsWith('success:'))
			{
				let a = data.split(':');
				error.html(a[1]);error.removeClass('d-none');error.addClass('alert-success');
				login.val('');
				pass.val('');
				pass2.val('');
				pass3.val('');
			}
			else{error.html(data);error.removeClass('d-none');error.addClass('alert-danger');}
			grecaptcha.reset(change_captcha);
			change_processing = false;
		});
	});

	$('#reg-prefix').on('change', function()
	{
		if($(this).val() == 0)
			$('#prefix-note').removeClass('d-none');
		else
			$('#prefix-note').addClass('d-none');
	});

	$('a.submenu').each(function()
	{
		$(this).on('click', function()
		{
			if($(this).hasClass('active'))
				return false;
			
			$('a.submenu').removeClass('active');
			$(this).addClass('active');
			$('.subform').hide();
			var tab = $(this).attr('data-form');
			$('#'+tab).fadeIn(500);
			return false;
		});
	});
});

var init_captcha = function()
{
	reg_captcha = grecaptcha.render('reg-captcha', { 'theme': 'dark', 'sitekey': $('#reg-captcha').attr('data-sitekey') });
	restore_captcha = grecaptcha.render('restore-captcha', { 'theme': 'dark', 'sitekey': $('#restore-captcha').attr('data-sitekey') });
	restore1_captcha = grecaptcha.render('restore1-captcha', { 'theme': 'dark', 'sitekey': $('#restore1-captcha').attr('data-sitekey') });
	restore2_captcha = grecaptcha.render('restore2-captcha', { 'theme': 'dark', 'sitekey': $('#restore2-captcha').attr('data-sitekey') });
	change_captcha = grecaptcha.render('change-captcha', { 'theme': 'dark', 'sitekey': $('#change-captcha').attr('data-sitekey') });
};
