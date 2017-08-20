// $(document).ready(function(){
  $('.portfolio-carousel').slick({
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    draggable: false,
    responsive: [ 
      {
        breakpoint: 1200,
        settings: {
          centerMode: false,
          slidesToShow: 1,
          dots: true,
          draggable: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
          draggable: true
        }
      }
    ]
  });
// });