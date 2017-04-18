$(document).ready(function(){
	
	$('.slider-main').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.slider-bg',
		dots: true,
		focusOnSelect: true,
		autoplay: true,
		autoplaySpeed: 10000
	});
	$('.slider-bg').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.slider-main'
	});
	$('.slider-work').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: true,
		dots: true,
		infinite: true,
		speed: 300,
		responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
		]
	});
	$('.slider-partner').slick({
		slidesToShow: 9,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		speed: 300,
		responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 7,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 544,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
		]
	});

});
;( function( window, document ) {
  'use strict';

  var file = 'img/sprite.symbol.svg',
      revision = 1;

  if ( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
    return true;

  var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
      request,
      data,
      insertIT = function() {
        document.body.insertAdjacentHTML( 'afterbegin', data );
      },
      insert = function() {
        if( document.body ) insertIT();
        else document.addEventListener( 'DOMContentLoaded', insertIT );
      };

  if ( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision ) {
    data = localStorage.getItem( 'inlineSVGdata' );

    if( data ) {
      insert();
      return true;
    }
  }

  try {
    request = new XMLHttpRequest();
    request.open( 'GET', file, true );
    request.onload = function() {
      if ( request.status >= 200 && request.status < 400 ) {
        data = request.responseText;
        insert();
        if ( isLocalStorage ) {
          localStorage.setItem( 'inlineSVGdata', data );
          localStorage.setItem( 'inlineSVGrev', revision );
        }
      }
    }
    request.send();
  }
  catch(e){}

}( window, document ) );