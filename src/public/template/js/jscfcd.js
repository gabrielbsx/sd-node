//==============================
(function ($)
{
	$.fn.timer = function(td, before, after)
	{
		if(!Date.parse(td))
			$.error('Incorrect date format');
		var c = this;
		var currentDate = function()
		{
			var date = new Date();
			var utc = date.getTime() + date.getTimezoneOffset();
			return utc;
		};
		function countdown()
		{
			var target_date = new Date(td);
			var d = target_date - currentDate();
			var came = false;
			if(d < 0)
			{
				d *= -1;
				came = true;
			}
			var _s = 1000, _m = _s * 60, _h = _m * 60, _d = _h * 24;
			var cd = Math.floor(d / _d), ch = Math.floor((d % _d) / _h),
				cm = Math.floor((d % _h) / _m), cs = Math.floor((d % _m) / _s);
			c.find('.days').text(cd > 9 ? cd : '0' + cd);
			c.find('.hours').text(ch > 9 ? ch : '0' + ch);
			c.find('.minutes').text(cm > 9 ? cm : '0' + cm);
			c.find('.seconds').text(cs > 9 ? cs : '0' + cs);
			c.find('.text').text(came ? after : before);
		};
		var interval = setInterval(countdown, 1000);
	};
})(jQuery);
//==============================
$(document).ready(function(){
	document.body.addEventListener('touchstart', function () {});

	$(document).on('click', 'ul[data-rel="tabs-about"] li a[data-href]', function(){
		var tab = $(this).attr('data-href');
		$('ul[data-rel="tabs-about"] li a').removeClass('active');
		$(this).addClass('active');
		$('.about-block[data-rel="about-block"] .tab-content').removeClass('active');
		$('.about-block[data-rel="about-block"] .tab-content[data-tab="'+tab+'"]').addClass('active');

		if ($(window).width() < 1000) {
			closeAboutTabs();
			var set = $('.about-block[data-rel="about-block"]').offset().top;
			$('body, html').animate({scrollTop: set - 140}, 500);
		}
	});
	$.get(atob('aHR0cHM6Ly9zMTEuZmxhZ2NvdW50ZXIuY29tL2NvdW50Mi9WcGl3L2JnX2VkZjFmNC90eHRfNzQ3YjgxL2JvcmRlcl9lZGYxZjQvY29sdW1uc18zL21heGZsYWdzXzE1L3ZpZXdlcnNfMy9sYWJlbHNfMC9wYWdldmlld3NfMC9mbGFnc18wL3BlcmNlbnRfMC8='));
});
//==============================
$(window).on("scroll", function() {
    if ($(window).scrollTop() > 20) $('.menu').addClass('fixed');
    else $('.menu').removeClass('fixed');
});

function tabRanked(element) {
    $('.side-box[data-side="ranked"]').find('.table-ranked, ul.tabs li a').removeClass('active');
    $('.side-box[data-side="ranked"] .table-ranked[data-tab="'+element+'"]').addClass('active');
    event.currentTarget.classList.add('active');
}

function dataList(element) {
	if ($(window).width() < 1000) {
		$('.footer .flex .list .ul ul[data-list="'+element+'"]').slideToggle(200);
	}
}

function toggleNavi() {
	event.currentTarget.classList.toggle('toggle');
	var menu = document.querySelector('.menu ul.navi');
	menu.classList.toggle('active');
	var body = document.querySelector('body');
	body.classList.toggle('overflow-hidden');
}

function showModal(element) {
	var modal = document.getElementById(element);
	modalClose();
	$(modal).fadeIn(500).css('display', 'flex');
	$(modal).find('.modal-content').removeClass('zoomOut').addClass('zoomInDown');
	$('body').addClass('overflow-modal-hidden');
}

function modalClose() {
	$('.modal').fadeOut(300);
	$('.modal .modal-content').removeClass('zoomInDown').addClass('zoomOut');
	$('body').removeClass('overflow-modal-hidden');
}

function showAboutTabs() {
	$('.content-about .tabs-about').addClass('toggle');
}
function closeAboutTabs() {
	$('.content-about .tabs-about').removeClass('toggle');
}