$(function onDomReady() {

  $(document).ready(function() {
    var hash = window.location.hash;
    var link = $('.questions a');
    //pass event here
    $('.questions a').click(function(e) {
      e.preventDefault();
      hash = "#"+link.attr("href");
    });
  }); 


  if ($('#home').length) home()
  if ($('#becomeastaffr').length) becomeastaffr()

  $('.menu').on('click', function openMenu() {
    $('#mobileMenu').css('display', 'block')
    $('body').css('overflow', 'hidden')
    $('.menu').css('display', 'none')
  })

  $('#mobileMenu').on('click', function closeMenu() {
    $('#mobileMenu').css('display', 'none')
    $('.menu').css('display', 'block')
  })

  function home() {

    /**
     * Rotating staffr types
     */

    (function () {
      var spans = $('.rotate').addClass('animated').toArray();
      var $activeSpan = $(spans.shift())
      $activeSpan.css('display', 'block')
      var spanIndex=0;
      var eventName = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
      var inClass = 'fadeInUpCustom'
      var outClass = 'fadeOutUpCustom'

      function hideCurrent() {
        $activeSpan.addClass(outClass)
        $activeSpan.one(eventName, function () {
          $activeSpan.css('display', 'none')
          $activeSpan.removeClass(outClass)
          showNext()
        })
      }

      function showNext() {
        if (0 === spans.length) {
          spans = $('.rotate').toArray()
           spanIndex =-1;
        }
        spanIndex ++;
        if(spanIndex==3){
          //Change the title for wait staffr
          $('#BookTitle').html('Book');
        }
        else if(spanIndex>3 || spanIndex==0){
          $('#BookTitle').html('Book a');
        }

        $activeSpan = $(spans.shift())
        $activeSpan.addClass(inClass)
        $activeSpan.css('display', 'block')
        $activeSpan.one(eventName, function () {
          $activeSpan.removeClass(inClass)
          hideCurrent()
        })
      }

      hideCurrent()
    })();

    /**
     * Rotating images
     */

    (function () {
      var images = $('.slideshow img').addClass('animated').toArray()
      var $activeImage = $(images.shift())
      var eventName = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
      var inClass = 'fadeIn'
      var outClass = 'fadeOut'

      function hideCurrent() {
        $activeImage.addClass(outClass)
        $activeImage.one(eventName, function () {
          $activeImage.css('display', 'none')
          $activeImage.removeClass(outClass)
          showNext()
        })
      }

      function showNext() {
        if (0 === images.length) {
          images = $('.slideshow img').toArray()
        }

        $activeImage = $(images.shift())
        $activeImage.addClass(inClass)
        $activeImage.css('display', 'block')
        $activeImage.one(eventName, function () {
          $activeImage.removeClass(inClass)
          hideCurrent()
        })
      }

      hideCurrent()
    })();
  }
  function becomeastaffr() {
    var $apply = $('.apply')
    var iTunesLink = $apply.attr('href-itunes')
    var playStoreLink = $apply.attr('href-play-store')
    var ua = navigator.userAgent.toLowerCase()

    if (~ua.indexOf('android')) {
      $apply.attr('href', playStoreLink)
    } else if (~ua.indexOf('iphone')) {
      $apply.attr('href', iTunesLink)
    } else {
      $apply.on('click', function () {
        $('#applyModal').css('display', 'block')
        $('body').css('overflow', 'hidden')
        return false
      })
    }

    $('#applyModal .close').on('click', function () {
      $('#applyModal').css('display', 'none')
      $('body').css('overflow', 'auto')
      return false
    })
  }
})