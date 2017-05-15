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
	$('.slider-works').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: true,
		dots: true,
		infinite: true,
		speed: 300,
		responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
		]
	});
	$('.slider-partner').slick({
		arrows: true,
		initialSlide: 7,
		dots: false,
		infinite: true,
		variableWidth: true,
		centerMode: true,
		speed: 300
	});
	$('.slider-reviews-main').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,	
		asNavFor: '.slider-reviews-nav'
	});
	$('.slider-reviews-nav').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.slider-reviews-main',
		//dots: true,
		//centerMode: true,
		focusOnSelect: true
	});

});
;( function( window, document ) {
  'use strict';

  var file = 'img/sprite.symbol.svg',
      revision = 6;

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

$(function() {
  $('#save').click(function() {
    var formValid = true;

    // $('input, textarea').each(function() {
    //   var formGroup = $(this).parents('.form-group');
    //   var glyphicon = formGroup.find('.form-control-feedback');

    //   if (this.checkValidity()) {
    //     formGroup.addClass('has-success').removeClass('has-error');
    //     glyphicon.addClass('glyphicon-ok').removeClass('glyphicon-remove');
    //   } else {
    //     formGroup.addClass('has-error').removeClass('has-success');
    //     glyphicon.addClass('glyphicon-remove').removeClass('glyphicon-ok');
    //     formValid = false;
    //     }
    // });

    if (formValid) {
      $('form').val(function() {
        var str = $(this).serialize();

        $.ajax({
          url: "send.php",
          type: 'POST',
          data: str,
          success: function(data) {
            data
          }
        });
        console.log(str);
      });

      // $('#myModal').modal('hide');
      // $('#success-alert').removeClass('hidden');
      $('#save').attr('disabled', 'disabled');

    }
  });
});