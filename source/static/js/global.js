(function(){

  //
  // ANCHOR SMOOTH SCROLLING
  //

  // $(document).on('click', 'a[href^="#"]', function (e) {

  //   e.preventDefault()

  //   var target = this.hash
  //     , $target = $(target)
  //     , offset = 70

  //   $('html, body').stop().animate({
  //     'scrollTop': $target.offset().top - offset
  //   }, 300, 'swing', function () {
  //     window.location.hash = target
  //   })

  // })

  $('.js-toggle-mobile-nav').on('click', function() {
    $('body').toggleClass('mobile-sidebar-open')
  })

})()