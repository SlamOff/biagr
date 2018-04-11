'use strict';

function ready(d) {
	new WOW().init();
	let lang = d.getElementsByClassName('current')[0];
	let ul = d.getElementsByClassName('choose_lang')[0];
	let li = ul.getElementsByTagName('li');
	document.onclick = function(e){
		if(e.target == lang){
			ul.style.maxHeight = '60px';
			lang.classList.add('active');
		}
		else {
			ul.style.maxHeight = 0;
		}
	}
	for (let i = 0; i < li.length; i++){
		li[i].onclick = function(){
			let text = this.textContent;
			lang.textContent = text;
			ul.style.maxHeight = 0;
		}
	}

	let header = d.getElementsByClassName('main__header')[0];
	window.onscroll = function(){
		if(window.pageYOffset){
			header.classList.add('main__header--scrolled');
		}
		else {
			header.classList.remove('main__header--scrolled');
		}
	}

	let contact = d.getElementById('contact');
	let headerBtn = d.getElementsByClassName('main__header__btn')[0];

	let linkNav = document.querySelectorAll('[href^="#"]');
	let speed = .3;
	for (let i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function(e){
			e.preventDefault();
			let height = parseInt(getComputedStyle(header).height);
			let w = window.pageYOffset - height;
			let hash = this.href.replace(/[^#]*(.*)/, '$1');
			let t = document.querySelector(hash).getBoundingClientRect().top;
			let start = null;
			requestAnimationFrame(step);
			function step(time) {
				if (start === null) start = time;
				let progress = time - start,
				r = (t < 0 ? Math.max(w - progress/speed, w + t) : Math.min(w + progress/speed, w + t));
				window.scrollTo(0,r);
				if (r != w + t) {
					requestAnimationFrame(step);
				}
			}
		}, false);
	}

	let message1, message2, message3, message4, message5;
	if(d.documentElement.getAttribute('lang') == 'en'){
		message1 = 'Fill in this field';
		message2 = 'Fill in a valid name';
		message3 = 'Fill in a valid email';
		message4 = 'Fill in your delivery address';
		message5 = 'Fill in a valid phone number';
	}
	else {
		message1 = 'Заполните это поле';
		message2 = "Введите корректное имя";
		message3 = 'Введите корректный email';
		message4 = 'Введите адрес доставки';
		message5 = 'Введите корректный номер';
	}
	let form = d.querySelector('.form');
	
	function validate(form) {
		let elems = form.getElementsByTagName('input');
		let emailCheck = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
		let nameCheck = new RegExp('^[A-Za-z А-Яа-я]+$');

		if(!elems.name.value || elems.name.value.length < 2){
			elems.name.previousElementSibling.textContent = message1;
		}
		else if(!nameCheck.test(elems.name.value)){
			elems.name.previousElementSibling.textContent = message2;
		}

		if(!elems.email.value){
			elems.email.previousElementSibling.textContent = message1;
		}
		else if(!emailCheck.test(elems.email.value)){
			elems.email.previousElementSibling.textContent = message3;
		}

		if(!elems.phone.value){
			elems.phone.previousElementSibling.textContent = message1;
		}
		else if(elems.phone.value.length !== 16){
			elems.phone.previousElementSibling.textContent = message5;
		}
		if(!elems.delivery.value){
			elems.delivery.previousElementSibling.textContent = message4;
		}
	}
	let phone = d.querySelector('.phone');
	let maskOptions = {
		mask: '+{3}(\\000)000-00-00'
	};
	let mask = new IMask(phone, maskOptions);
	form.onsubmit = function(e){
		validate(this);
		let span = d.getElementsByClassName('error');
		for(let i = 0; i < span.length; i++){
			if (span[i].textContent != ''){
				return false;
			}
		}
	}
	let placeholder;
	let elems = form.getElementsByTagName('input');
	for(let i = 0; i < elems.length; i++){
		elems[i].onfocus = function(){
			this.previousElementSibling.textContent = '';
			placeholder = this.getAttribute('placeholder');
			this.setAttribute('placeholder', '');
		}
		elems[i].onblur = function(){
			this.setAttribute('placeholder', placeholder);
		}
	}
	let textarea = d.getElementsByTagName('textarea')[0];
	let textareaPlaceholder;
	textarea.onfocus = function(){
		textareaPlaceholder = this.getAttribute('placeholder');
		this.setAttribute('placeholder', '');
	}
	textarea.onblur = function(){
		this.setAttribute('placeholder', textareaPlaceholder);
	}

	let icons = d.querySelectorAll('.carousel__item');
	let paragraph = d.querySelector('.carousel__centered p');
	function changeContent() {
		let text = this.querySelector('.about__text').innerHTML;
		paragraph.innerHTML = text;
		for (let i = 0; i < icons.length; i++) {
			icons[i].classList.remove('hovered');
		}
		this.classList.add('hovered');
	}

	for (let i = 0; i < icons.length; i++) {
		if (window.innerWidth > 960) {
			icons[i].addEventListener('mouseover', changeContent);
		} else {
			icons[i].addEventListener('click', changeContent);
		}
	}

	let firstTable = d.querySelectorAll('.table_wrapper')[0];
	let secondTable = d.querySelectorAll('.table_wrapper')[1];
	let ps = new PerfectScrollbar(firstTable, {
		wheelSpeed: 2,
		wheelPropagation: false,
		minScrollbarLength: 20
	});
	let ps2 = new PerfectScrollbar(secondTable, {
		wheelSpeed: 2,
		wheelPropagation: false,
		minScrollbarLength: 20
	});
	const picts = d.getElementsByTagName('img');
	for(let i = 0; i < picts.length; i++){
		picts[i].ondragstart = function(){
			return false;
		}
	}
};

document.addEventListener("DOMContentLoaded", ready.bind(null, document));