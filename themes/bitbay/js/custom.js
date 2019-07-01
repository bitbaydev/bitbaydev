(function ($, Drupal, Bootstrap) {
  $(function () {
    if(window.location.href.indexOf("_newsite") > -1) {
      $("a[href='/']").attr('href', 'http://bitbay.market/_newsite/')
    }

    $(".fadein-delay > div").each(function(index) {
      //$(this).delay(300*index).fadeIn(600);
      $(this).delay(300*index).animate({opacity: 1}, 600);
    });

    $('a').not('.videoOpenModal').each(function() {
      var a = new RegExp('/' + window.location.host + '/');
      if(!a.test(this.href)) {
        $(this).click(function(event) {
          event.preventDefault();
          event.stopPropagation();
          window.open(this.href, '_blank');
        });
      }
    });
    function addClearClasses(elem){
      $(elem).each(function(i) {
        if(i % 2 === 0  )
          $(this).addClass("list-item-2n1");
        else if(i % 3 === 0  )
          $(this).addClass("list-item-3n1");
      });
    }
    //addClearClasses(".fadein-delay > div");
    //addClearClasses(".cols-3-2-1 > div");

    $('.team-image,.team-item-title').on('click', function(e){
      if($(document).width()>767)
        return;

      var wrap = $(this).parent().parent();

      if($(wrap).hasClass("active")){
        $(wrap).removeClass("active");
      }
      else {
        $('.views-row.active').removeClass("active");
        $(wrap).addClass("active");
      }
    });

    //filtering team by position
    if($('.view-the-team').length) {
      //add filters
      var filters = '';
      $('.team-section-title').each(function( index ) {
        //console.log( index + ": " + $( this ).text() );
        $(this).parent().attr('id','pos-'+index);
        filters = filters + "<span class='filter active' for='pos-"+index+"'>" + $(this).text().trim() + "</span>";
      });
      filters = "<div class='filters'><span class='filterall active'><i class='fas fa-check'></i></span>" + filters + "</div>";
      $( ".view-the-team .view-content" ).prepend( filters );

      //on click event
      $('.filters .filter').on('click', function(e){
        var pos = $(this).attr("for");
        if($(this).hasClass("active")){
          $(this).removeClass("active");
          $("#"+pos).slideUp(500);
        }
        else {
          $(this).addClass("active");
          $("#"+pos).slideDown(500);
        }

        //status of filterall
        if( $('.filters .filter.active').length == $('.filters .filter').length){
          $('.filters .filterall').addClass('active');
        }else if( $('.filters .filter.active').length == 0){
          $('.filters .filterall').removeClass('active');
        }

      });

      //on click filterall
      $('.filters .filterall').on('click', function(e){
        var act = $(this).hasClass("active");
        if(act){
          $('.filters > span').removeClass("active");
          //$('.team-section-title').parent().addClass('inactive');
          $('.team-section-title').parent().slideUp();
        }else{
          $('.filters > span').addClass("active");
          //$('.team-section-title').parent().removeClass('inactive');
          $('.team-section-title').parent().slideDown();
        }
      });

    }

    function equalHeights(){
      if($(document).width() > 768){
        $('.view-the-team .features-row').each(function( index ) {
          var col = $(this).find('.w-col .team-details');

          var maxHeight = 0;
          $(col).each(function(){
            if ($(this).height() > maxHeight) {
               maxHeight = $(this).height();
            }
          });

          $(col).height(maxHeight);
          //console.log(col.length);
        });
      }else{
        $('.view-the-team .features-row .w-col').css('height','auto');
      }

    }
    equalHeights();
    $(window).on('resize',equalHeights);

    //not needed anymore
    $('.team-image').on('touchend', function(e){
      var touch = e.touches[0];
      if(touch){
        $(this).addClass("hover");
      }
      else {
        $(this).removeClass("hover");
      }
    });

    /* animation not used */
    var $animation_elements = $('.animation');
    var $window = $(window);
    function check_if_in_view() {
      var window_height = $window.height();
      var window_top_position = $window.scrollTop();
      var window_bottom_position = (window_top_position + window_height);

      $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)) {
          $element.addClass('in-view');
        } else {
          $element.removeClass('in-view');
          if($element.hasClass('animation-run-once')){
            $element.removeClass('animation');
          }
        }
      });
    }
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

    var testing = getUrlParameter('testing');
    if(testing == "true"){
      $("a").attr('href', function(i, h) {
        return h + (h.indexOf('?') != -1 ? "&testing=true" : "?testing=true");
      });
    }

    function addModal(cla,bodyMessage, headerTitle,footerButtons){
      var footer  = `
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
                <button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button>
              </div>
     `;
      if (footerButtons == false){
        footer = '';
      }
      var header = `
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">${headerTitle}</h4>
              </div>
      `;
      if(headerTitle == ''){
        header = '';
      }
      var modalTemplate = `
        <div class="modal fade ${cla}" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              ${header}
              <div class="modal-body">${bodyMessage}</div>
              ${footer}
            </div>
          </div>
        </div>
      `;
      $('body').append(modalTemplate);
    }

    $(".videoOpenModal").on('click',function(e){
      e.preventDefault();
      href = $(this).attr('href') + "?rel=0&autoplay=1";
      var ar = 560/315;
      var vw = $(window).width();
      var margin = 60;
      if(vw < 500) margin = 30;
      var w = vw - margin;
      if(w > 1000) w = 1000;
      var h = w / ar;

      var body = '<div class="videoWrapper"><iframe width="'+w+'" height="'+h+'" src="'
        +href+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>';

      if ( ! $( ".videoModal" ).length ) {
         addModal('videoModal',body,'',false);
      }else{
        $(".videoModal iframe").attr("src", $(".videoModal iframe").attr("src") + "&autoplay=1" );
      }
      var modal = $('.videoModal');
      $(".videoModal").on('hidden.bs.modal', function (e) {
          var src_noplay = $(".videoModal iframe").attr("src");
          src_noplay = src_noplay.replace("&autoplay=1", "");
          $(".videoModal iframe").attr("src", src_noplay);
          $(".par-video-background video").get(0).play();
      });

      var video = ".par-video-background video";
      if ($(video).length)
        $(video).get(0).pause();

      modal.modal('show');
    });

    //slideDown slideUp function for downloads page
    $(".click-slide-next").on('click', function (e) {
      e.stopPropagation();
      if ($(this).hasClass('pressed')) {
        $(this).removeClass("pressed").next().slideUp(200);
      } else {
        $(".click-slide-next.pressed").removeClass("pressed").next().slideUp(200);
        $(this).addClass("pressed").next().slideDown(250);
      }
      return 0;
    });
    //slideUp everything that is currently slideDown'ed
    $("body").on('click', function () {
      $(".click-slide-next.pressed").removeClass("pressed").next().slideUp(200);
    });

  });

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

})(jQuery, Drupal, Drupal.bootstrap);
