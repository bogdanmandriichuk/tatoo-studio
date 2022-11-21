let menuBtn = document.querySelector('.burger');
let menu = document.querySelector('.header__menu');
// let phone = document.querySelector('.phone');
menuBtn.addEventListener('click', function(){
	document.body.classList.toggle('lock-burger');
	menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
    // phone.classList.toggle('active');
})

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('click', onMenuLinkLlick);
	});
	function onMenuLinkLlick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
			
			if (menu.classList.contains('active')){
				document.body.classList.remove('lock-burger');
	menuBtn.classList.remove('active');
	menu.classList.remove('active');
			}
			
			
			window.scrollTo({
				top: gotoBlockValue,
				behavior: 'smooth'
			});
			e.preventDefault();
		}
	}
};

$(document).ready(function(){
	$('.slider').slick({
		arrows:true,
		dots:true,
		autoplay:true,
		adaptiveHeight:true
	});
	$('.artist__slider').slick({
		arrows:true,
		dots:true,
		slidesToShow:5,
		adaptiveHeight:true,
		centerMode: true,
		variableWidth: true,
		asNavFor:".artists__avatar-slider",
		responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 1,
				
				
			  }
			},
			{
			  breakpoint: 923,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 708,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
				breakpoint: 479,
				settings: {
				  slidesToShow: 1,
				  slidesToScroll: 1
				}
			  },
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	});
	$('.artists__avatar-slider').slick({
		arrows:false,
		fade:true,
		slidesToShow:1,
		asNavFor:".artist__slider"
	});
});
// new Swiper('.swiper',{
// 	navigation: {
// 		nextEl: '.swiper-button-next',
// 		prevEl: '.swiper-button-prev',
// 	},
// 	pagination: {
// 		el: '.swiper-pagination',
// 		clickable: true,
// 	},
// 	slidesPerView: 5,
// 	spaceBetween: 150,
// 	breakpoints: {
// 		1300:{
// 			slidesPerView: 5,
// 		},
// 		1159:{
// 			slidesPerView: 5,
// 		},
// 		690:{
// 			slidesPerView: 3,
// 		},
// 		450:{
// 			slidesPerView: 2,
// 		},
// 		450:{
// 			slidesPerView: 2,
// 		},
// 	}
// });

// new Swiper('.artists__avatar',{
	
	
	
	
// });
//====================popups================
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0){
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e){
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault()
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener("click", function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
				}
			});
		}
	}

	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			if (doUnlock) {
				bodyUnlock();
			}
		}
	}


	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		if (lockPadding.lenght > 0){
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = lockPaddingValue;
			}
		}
		
		body.style.paddingRight = lockPaddingValue;
		body.classList.add('lock');

		unlock = false;
		setTimeout(function() {
			unlock = true;
		}, timeout);
	}

function bodyUnlock() {
	setTimeout(function(){
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
		}, timeout);


		unlock = false;
		setTimeout(function() {
			unlock = true;
			}, timeout);
}


