'use strict';

function ready(d) {
	new WOW().init();
	var lang = d.getElementsByClassName('current')[0];
	var ul = d.getElementsByClassName('choose_lang')[0];
	var li = ul.getElementsByTagName('li');
	document.onclick = function (e) {
		if (e.target == lang) {
			ul.style.maxHeight = '60px';
			lang.classList.add('active');
		} else {
			ul.style.maxHeight = 0;
		}
	};
	for (var i = 0; i < li.length; i++) {
		li[i].onclick = function () {
			var text = this.textContent;
			lang.textContent = text;
			ul.style.maxHeight = 0;
		};
	}

	var toggleBtn = d.querySelector('.main__menu_btn');
	var sandwich = d.querySelector('.sandwich');
	var menu = d.querySelector('.main__header__menu');

	toggleBtn.onclick = function () {
		sandwich.classList.toggle('active');
		if (sandwich.classList.contains('active')) {
			menu.style.maxHeight = '100vh';
			menu.style.opacity = 1;
			d.querySelector('.main__header').style.backgroundColor = '#fff';
		} else {
			menu.style.maxHeight = 0;
			menu.style.opacity = 0;
			d.querySelector('.main__header').style.backgroundColor = 'transparent';
		}
	};

	var header = d.getElementsByClassName('main__header')[0];
	var main = d.getElementsByClassName('main')[0];
	window.addEventListener('scroll', scroll);
	scroll();
	function scroll() {
		if (window.pageYOffset) {
			header.classList.add('main__header--scrolled');
			main.style.zIndex = 25;
		} else {
			header.classList.remove('main__header--scrolled');
			main.style.zIndex = 20;
		}
	}

	var contact = d.getElementById('contact');
	var headerBtn = d.getElementsByClassName('main__header__btn')[0];

	var linkNav = document.querySelectorAll('[href^="#"]');
	var speed = .3;
	for (var _i = 0; _i < linkNav.length; _i++) {
		linkNav[_i].addEventListener('click', function (e) {
			e.preventDefault();
			if (window.innerWidth < 768) {
				menu.style.maxHeight = 0;
				sandwich.classList.remove('active');
			}
			var height = parseInt(getComputedStyle(header).height);
			var w = window.pageYOffset - height;
			var hash = this.href.replace(/[^#]*(.*)/, '$1');
			var t = document.querySelector(hash).getBoundingClientRect().top;
			var start = null;
			requestAnimationFrame(step);
			function step(time) {
				if (start === null) start = time;
				var progress = time - start,
				    r = t < 0 ? Math.max(w - progress / speed, w + t) : Math.min(w + progress / speed, w + t);
				window.scrollTo(0, r);
				if (r != w + t) {
					requestAnimationFrame(step);
				}
			}
		}, false);
	}

	var message1 = void 0,
	    message2 = void 0,
	    message3 = void 0,
	    message4 = void 0,
	    message5 = void 0;
	if (d.documentElement.getAttribute('lang') == 'en') {
		message1 = 'Fill in this field';
		message2 = 'Fill in a valid name';
		message3 = 'Fill in a valid email';
		message4 = 'Fill in your delivery address';
		message5 = 'Fill in a valid phone number';
	} else {
		message1 = 'Заполните это поле';
		message2 = "Введите корректное имя";
		message3 = 'Введите корректный email';
		message4 = 'Введите адрес доставки';
		message5 = 'Введите корректный номер';
	}
	var form = d.querySelector('.form');

	function validate(form) {
		var elems = form.getElementsByTagName('input');
		var emailCheck = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
		var nameCheck = new RegExp('^[A-Za-z А-Яа-я]+$');

		if (!elems.name.value || elems.name.value.length < 2) {
			elems.name.previousElementSibling.textContent = message1;
		} else if (!nameCheck.test(elems.name.value)) {
			elems.name.previousElementSibling.textContent = message2;
		}

		if (!elems.email.value) {
			elems.email.previousElementSibling.textContent = message1;
		} else if (!emailCheck.test(elems.email.value)) {
			elems.email.previousElementSibling.textContent = message3;
		}

		if (!elems.phone.value) {
			elems.phone.previousElementSibling.textContent = message1;
		} else if (elems.phone.value.length !== 16) {
			elems.phone.previousElementSibling.textContent = message5;
		}
		if (!elems.delivery.value) {
			elems.delivery.previousElementSibling.textContent = message4;
		}
	}
	var phone = d.querySelector('.phone');
	var maskOptions = {
		mask: '+{3}(\\000)000-00-00'
	};
	var mask = new IMask(phone, maskOptions);

	var close = d.querySelector('.close_thanks');
	var thanks = d.querySelector('.thanks');
	close.onclick = function (e) {
		e.preventDefault();
		thanks.classList.remove('visible');
	};

	form.onsubmit = function (e) {
		function sendData() {
			var xhr = new XMLHttpRequest();
			var url = 'mail.php';
			xhr.open('GET', url, true);
			xhr.send();
			xhr.onreadystatechange = function () {
				if (xhr.readyState != 4) return;
				if (xhr.status != 200) {
					console.log('Ошибка. Данные с сервера не получены.');
				} else {
					thanks.classList.add('visible');
					setTimeout(function () {
						thanks.classList.remove('visible');
					}, 5000);
				}
			};
		}
		var valid = false;
		validate(this);
		var span = d.getElementsByClassName('error');
		for (var _i2 = 0; _i2 < span.length; _i2++) {
			if (span[_i2].textContent != '') {
				return false;
			} else {
				valid = true;
			}
		}
		if (valid) {
			sendData();
		}
	};
	var placeholder = void 0;
	var elems = form.getElementsByTagName('input');
	for (var _i3 = 0; _i3 < elems.length; _i3++) {
		elems[_i3].onfocus = function () {
			this.previousElementSibling.textContent = '';
			placeholder = this.getAttribute('placeholder');
			this.setAttribute('placeholder', '');
		};
		elems[_i3].onblur = function () {
			this.setAttribute('placeholder', placeholder);
		};
	}
	var textarea = d.getElementsByTagName('textarea')[0];
	var textareaPlaceholder = void 0;
	textarea.onfocus = function () {
		textareaPlaceholder = this.getAttribute('placeholder');
		this.setAttribute('placeholder', '');
	};
	textarea.onblur = function () {
		this.setAttribute('placeholder', textareaPlaceholder);
	};

	var icons = d.querySelectorAll('.carousel__item');
	var paragraph = d.querySelector('.carousel__centered p');
	function changeContent() {
		var text = this.querySelector('.about__text').innerHTML;
		paragraph.innerHTML = text;
		for (var _i4 = 0; _i4 < icons.length; _i4++) {
			icons[_i4].classList.remove('hovered');
		}
		this.classList.add('hovered');
	}

	for (var _i5 = 0; _i5 < icons.length; _i5++) {
		if (window.innerWidth > 960) {
			icons[_i5].addEventListener('mouseover', changeContent);
		} else {
			icons[_i5].addEventListener('click', changeContent);
		}
	}

	var firstTable = d.querySelectorAll('.table_wrapper')[0];
	var secondTable = d.querySelectorAll('.table_wrapper')[1];
	function tableSettings() {
		if (window.innerWidth > 768) {
			var ps = new PerfectScrollbar(firstTable, {
				wheelSpeed: 2,
				wheelPropagation: false,
				minScrollbarLength: 20
			});
			var ps2 = new PerfectScrollbar(secondTable, {
				wheelSpeed: 2,
				wheelPropagation: false,
				minScrollbarLength: 20
			});
		} else {
			d.querySelector('.table_wrapper').classList.remove('ps');
		}
	}
	tableSettings();

	window.addEventListener("resize", function () {
		tableSettings();
		setMapScroll();
	});
	window.addEventListener("orientationchange", function () {
		tableSettings();
		setMapScroll();
	});

	var picts = d.getElementsByTagName('img');
	for (var _i6 = 0; _i6 < picts.length; _i6++) {
		picts[_i6].ondragstart = function () {
			return false;
		};
	}

	function setMapScroll() {
		var mapWrapper = document.querySelector('.map');
		var map = mapWrapper.querySelector('.map__pict_m');
		var w = window.innerWidth;
		var imgW = parseFloat(getComputedStyle(map).width);
		mapWrapper.scrollLeft = imgW / 2 - w / 2;
	}
	setMapScroll();
};

document.addEventListener("DOMContentLoaded", ready.bind(null, document));