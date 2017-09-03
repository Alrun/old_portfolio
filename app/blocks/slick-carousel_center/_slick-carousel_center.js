$('.portfolio-carousel').slick({
  centerMode: true,
  centerPadding: '0',
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  dots: true,
  draggable: false,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        centerMode: false,
        slidesToShow: 1,
        draggable: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        arrows: false,
        draggable: true
      }
    }
  ]
});