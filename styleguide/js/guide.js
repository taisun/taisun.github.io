

(function (window, document, $, Waypoint) {
  'use strict';

  $(document).ready(function () {
    var $guideMenu = $('.guide-menu');
    if ($guideMenu.length){
      new Waypoint.Sticky({
        element: $guideMenu[0],
        stuckClass: 'guide-sticky',
        wrapper: '<div class="guide-sticky-menu-wrapper" />',
        offset: 5
      });
    }

    function selectMenuItem(hash) {
      $('.guide-menu-item').removeClass('selected');
      $('.guide-menu-item[href="' + hash + '"]').addClass('selected');
    }

    $('.guide-content > h1').waypoint({
      handler: function() {
        selectMenuItem('#' + $(this.element).attr('id'));
      }
    });

    $('.guide-menu-item').on('click', function (event) {
      var hash = $(this).attr('href'),
        pos = Math.min($(hash).offset().top, $(document).height() - $(window).height());

      event.preventDefault();

      $('html,body').stop().animate({scrollTop : pos}, 200, function (){
        window.location.hash = hash;
        selectMenuItem(hash);
      });
    });

    if (window.location.hash) {
      setTimeout(function () {
        selectMenuItem(window.location.hash);
      }, 0);
    } else {
      $('.guide-menu-item:first-child').addClass('selected');
    }
  });
})(window, window.document, jQuery, Waypoint);
