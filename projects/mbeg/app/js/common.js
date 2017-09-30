$(document).ready(function () {

  // Smooth anchor
  (function () {

    $('a[href*="html#"]')
      // .not('a[href*="details.html#"]')
      .click(function (e) {
        // On-page links
        if ((location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')) && (location.hostname === this.hostname )) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            e.preventDefault();

            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000, function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target);

              $target.focus();

              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            });
          }
        }
      });
  }());

  // Slick-carousel
  $('.slider-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider-bg',
    dots: true,
    focusOnSelect: true,
    autoplay: true,
    speed: 600,
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
    speed: 600,
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
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  });

  $('.slider-partner').slick({
    arrows: true,
    initialSlide: 2,
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    speed: 300,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 544,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $('.slider-reviews-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: '.slider-reviews-nav'
  });
  $('.slider-reviews-nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.slider-reviews-main',
    focusOnSelect: true,
    responsive: [
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
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Magnific-popup

  // Home - Carousel works
  $('.gallery-works-home').magnificPopup({

    tClose: 'Закрыть (Esc)',
    delegate: 'a',
    type: 'image',
    mainClass: 'mfp-with-zoom mfp-img-mobile',

    gallery: {
      enabled: false, // set to true to enable gallery
      preload: [0, 3], // read about this option in next Lazy-loading section
      navigateByImgClick: true,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
      tPrev: 'Предыдущая работа', // title for left button
      tNext: 'Следующая работа', // title for right button
      tCounter: '<span class="mfp-counter">%curr% из %total%</span>' // markup of counter
    },

    image: {
      cursor: null, // or 'mfp-zoom-out-cur'
      tError: '<a href="%url%">Изображение #%curr%</a> недоступно.',
      titleSrc: function (item) {
        // return item.el.attr('title') + '<small>ООО "МБИ"</small>';
        return item.el.find('img').attr('alt');
      }
    },

    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function (element) {
        return element.find('img');
      }
    }

  });

  // Portfolio-montaz/Portfolio-project
  $('.works').magnificPopup({

    tClose: 'Закрыть (Esc)',
    delegate: 'a',
    type: 'image',
    mainClass: 'mfp-with-zoom mfp-img-mobile',

    gallery: {
      enabled: true, // set to true to enable gallery
      //preload: [0,2], // read about this option in next Lazy-loading section
      navigateByImgClick: true,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
      tPrev: 'Предыдущая работа', // title for left button
      tNext: 'Следующая работа', // title for right button
      tCounter: '<span class="mfp-counter">%curr% из %total%</span>' // markup of counter
    },

    image: {
      cursor: null, // or 'mfp-zoom-out-cur'
      tError: '<a href="%url%">Изображение #%curr%</a> недоступно.',
      titleSrc: function (item) {
        // return item.el.attr('title') + '<small>ООО "МБИ"</small>';
        return item.el.find('img').attr('alt');
      }
    },

    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function (element) {
        return element.find('img');
      }
    }

  });


  // Footer - Map
  $('.footer-map').magnificPopup({

    tClose: 'Закрыть (Esc)',
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: true,

    index: '//maps.google.',
    src: '%id%&output=embed',

    fixedContentPos: true
  });

});

// Form
$(function () {
  $('#send').click(function () {
    var formValid = true;

    $('input, textarea').each(function () {
      var input = $(this);

      if (this.checkValidity()) {
        input.removeClass('form__input_error');
      } else {
        input.addClass('form__input_error');
        formValid = false;
      }
    });

    if (formValid) {
      $('form').val(function () {
        var str = $(this).serialize();

        $.ajax({
          url: "/send.php",
          type: 'POST',
          data: str,
          success: function (data) {
            data
          }
        });
      });

      $('.contacts-feedback__success').removeClass('hidden-xs-up');
      $('#send').attr('disabled', 'disabled');

    }
  });
});