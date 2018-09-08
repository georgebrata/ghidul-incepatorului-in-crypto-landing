/* ===================================================================
 * Glint - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL: 'https://georgebrata.us15.list-manage.com/subscribe/post-json?u=c3829e593b299b876d81256cb&id=e38bdb6be0&c='   // mailchimp url
    },
    //https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=4ab7b0b121

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    var clPreloader = function() {
        
        $("html").addClass('cl-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');
        
        });
    };


   /* Menu on Scrolldown
    * ------------------------------------------------------ */
    var clMenuOnScrolldown = function() {
        
        var menuTrigger = $('.header-menu-toggle');

        $WIN.on('scroll', function() {

            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            }
            else {
                menuTrigger.removeClass('opaque');
            }

        });
    };


   /* OffCanvas Menu
    * ------------------------------------------------------ */
    var clOffCanvas = function() {

        var menuTrigger     = $('.header-menu-toggle'),
            nav             = $('.header-nav'),
            closeButton     = nav.find('.header-nav__close'),
            siteBody        = $('body'),
            mainContents    = $('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function(e){
            e.preventDefault();
            // menuTrigger.toggleClass('is-clicked');
            siteBody.toggleClass('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.on('click', function(e){
            e.preventDefault();
            menuTrigger.trigger('click');	
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function(e){
            if( !$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span') ) {
                // menuTrigger.removeClass('is-clicked');
                siteBody.removeClass('menu-is-open');
            }
        });

    };


   /* photoswipe
    * ----------------------------------------------------- */
    var clPhotoswipe = function() {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

            // get items
            $folioItems.each( function(i) {

                var $folio = $(this),
                    $thumbLink =  $folio.find('.thumb-link'),
                    $title = $folio.find('.item-folio__title'),
                    $caption = $folio.find('.item-folio__caption'),
                    $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                    $captionText = $.trim($caption.html()),
                    $href = $thumbLink.attr('href'),
                    $size = $thumbLink.data('size').split('x'),
                    $width  = $size[0],
                    $height = $size[1];
         
                var item = {
                    src  : $href,
                    w    : $width,
                    h    : $height
                }

                if ($caption.length > 0) {
                    item.title = $.trim($titleText + $captionText);
                }

                items.push(item);
            });

            // bind click event
            $folioItems.each(function(i) {

                $(this).on('click', function(e) {
                    e.preventDefault();
                    var options = {
                        index: i,
                        showHideOpacity: true
                    }

                    // initialize PhotoSwipe
                    var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                    lightBox.init();
                });

            });

    };
    

   /* Stat Counter
    * ------------------------------------------------------ */
    var clStatCount = function() {
        
        var statSection = $(".about-stats"),
            stats = $(".stats__count");

        statSection.waypoint({

            handler: function(direction) {

                if (direction === "down") {

                    stats.each(function () {
                        var $this = $(this);

                        $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function (curValue) {
                                //$this.text(Math.ceil(curValue));

                                var formatter = new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                    // the default value for minimumFractionDigits depends on the currency
                                    // and is usually already 2
                                });
                                if($this.hasClass('nan')) {
                                    $this.text(Math.ceil(curValue));
                                } else {
                                    $this.text(formatter.format(curValue)); /* $2,500.00 */
                                }
                            }
                        });
                    });

                } 

                // trigger once only
                this.destroy();

            },

            offset: "90%"

        });
    };


   /* Masonry
    * ---------------------------------------------------- */ 
    var clMasonryFolio = function () {
        
        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });
    };


   /* slick slider
    * ------------------------------------------------------ */
    var clSlickSlider = function() {

        $('.clients').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 2,
            //autoplay: true,
            pauseOnFocus: false,
            autoplaySpeed: 1000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }

            ]
        });

        $('.testimonials').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    
    };

   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var clSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* Placeholder Plugin Settings
    * ------------------------------------------------------ */
    var clPlaceholder = function() {
        $('input, textarea, select').placeholder();  
    };


   /* Alert Boxes
    * ------------------------------------------------------ */
    var clAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };


   /* Contact Form
    * ------------------------------------------------------ */
    var clContactForm = function() {
        
        /* local validation */
        $('#contactForm').validate({
        
            /* submit via ajax */
            submitHandler: function(form) {
    
                var sLoader = $('.submit-loader');
    
                $.ajax({
    
                    type: "POST",
                    url: "inc/sendEmail.php",
                    data: $(form).serialize(),
                    beforeSend: function() { 
    
                        sLoader.slideDown("slow");
    
                    },
                    success: function(msg) {
    
                        // Message was sent
                        if (msg == 'OK') {
                            sLoader.slideUp("slow"); 
                            $('.message-warning').fadeOut();
                            $('#contactForm').fadeOut();
                            $('.message-success').fadeIn();
                        }
                        // There was an error
                        else {
                            sLoader.slideUp("slow"); 
                            $('.message-warning').html(msg);
                            $('.message-warning').slideDown("slow");
                        }
    
                    },
                    error: function() {
    
                        sLoader.slideUp("slow"); 
                        $('.message-warning').html("⚠️ Ceva nu a mers bine. Încearcă din nou după ce dai refresh la pagina.");
                        $('.message-warning').slideDown("slow");
    
                    }
    
                });
            }
    
        });
    };


   /* Animate On Scroll
    * ------------------------------------------------------ */
    var clAOS = function() {
        
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };


   /* AjaxChimp
    * ------------------------------------------------------ */
    var clAjaxChimp = function() {
        
        $('#mc-form').ajaxChimp({
            language: 'es',
            url: cfg.mailChimpURL
        });

        // Mailchimp translation
        //
        //  Defaults:
        //	 'submit': 'Submitting...',
        //  0: 'We have sent you a confirmation email',
        //  1: 'Please enter a value',
        //  2: 'An email address must contain a single @',
        //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
        //  4: 'The username portion of the email address is invalid (the portion before the @: )',
        //  5: 'This email address looks fake or invalid. Please enter a real email address'

        $.ajaxChimp.translations.es = {
            'submit': 'Submitting...',
            0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
            1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
            2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
        } 

    };


   /* Back to Top
    * ------------------------------------------------------ */
    var clBackToTop = function() {
        
        var pxShow  = 500,         // height on which the button will show
        fadeInTime  = 400,         // how slow/fast you want the button to show
        fadeOutTime = 400,         // how slow/fast you want the button to hide
        scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
        goTopButton = $(".go-top");
        var timer;

        // Show or hide the sticky footer button
        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }

            //button fading in and out
            $(".smoothscroll").addClass("scrolling");

            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                $(".smoothscroll").removeClass("scrolling");
            }, 1500);
        });
    };

    var initResources = function() {
        

        var init = function() {
            var resourceElem = "asd";

            $.each(window.resources, function(index, element) {

                resourceElem = $("<a></a>").attr({
                    'target': '_blank',
                    'class': 'btn btn--stroke',
                    'href': element.link,
                });
                resourceElem.addClass(element.categories);

                var rName = $("<span></span>").attr('class', 'resource-name').text(element.name);
                var rDesc = $("<span></span>").attr('class', 'resource-description').text(element.description);
                var rCat = $("<span></span>").attr('class', 'resource-category').text(element.categories.replace('resource-item', ''));

                resourceElem.append(rName); //resource name
                resourceElem.append(rDesc); //resource description
                resourceElem.append(rCat); //resource category

                //string.concat(string1, string2, stringX)

                $(".resources-links-wrapper").append(resourceElem);
            });


        }();



        var updateResources = function(showAll) {

            $.each($('.resource-item'), function (index, element) {
                $(this).attr('is-updated', 'false');
            });

            $.each($('.category-toggle.toggle-on:not([id="all-resources"])'), function (index, element) {
                $('.' + element.id).removeClass('hide-resources'); 
                $('.' + element.id).attr('is-updated', 'true');
            });

            $.each($('.category-toggle.toggle-off:not([id="all-resources"])'), function (index, element) {

                if ($('.' + element.id).attr('is-updated') !== "true") {
                    $('.' + element.id).addClass('hide-resources');
                }
            });
            if(showAll) {
                if ($('#all-resources').hasClass('toggle-off')) {
                    $.each($('.category-toggle.toggle-on:not([id="all-resources"])'), function (index, element) {
                        $('.' + element.id).removeClass('hide-resources');
                    });
                } else if ($('#all-resources').hasClass('toggle-on')) {
                    $.each($('.resource-item'), function (index, element) {
                        $(this).removeClass('hide-resources');
                    });
                }
            }

        }

        $('.category-toggle').on('click', function(e) {
            var $btn = $(this);
            $btn.toggleClass('toggle-on').toggleClass('toggle-off');

            var elemId = $btn.attr('id');
            
            setTimeout(function() {
                if (elemId ==="all-resources") {
                    updateResources(true);
                } else {
                    updateResources();                    
                }
            }, 100);
            

        });

        updateResources(true);
    };


    var initCoins = function () {

        var init = function () {
            var coinElem;

            $.each(window.coins, function (index, element) {

                coinElem = $("<a></a>").attr({
                    'target': '_blank',
                    'class': 'btn btn--stroke',
                    'href': element.link,
                });
                coinElem.addClass(element.categories);

                var cName = $("<span></span>").attr('class', 'coin-name').text(element.name);
                //var cLogo = $('<span></span>').attr({'class': 'coin-logo', 'background-image': 'plm'});
                var cDesc = $("<span></span>").attr('class', 'coin-description').text(element.description);
                var cCat = $("<span></span>").attr('class', 'coin-category').text($.trim(element.categories.replace('coin-item', '')).replace(/ /g, ', '));

                //cCat = $(cCat).replace('internetof', 'Internet Of Things'); //edge case

                coinElem.append(cName); //coin name
                coinElem.append(cDesc); //coin description
                coinElem.append(cCat); //coin category

                //string.concat(string1, string2, stringX)

                $(".coin-links-wrapper").append(coinElem);
            });


        }();



        var updateCoins = function (showAll, elemId) {

            $.each($('.coin-item'), function (index, element) {
                $(this).attr('is-updated', 'false');
            });

            $.each($('.coin-toggle.toggle-on:not([id="all-coins"])'), function (index, element) {
                $('.' + element.id).removeClass('hide-coin');
                $('.' + element.id).attr('is-updated', 'true');
            });

            $.each($('.coin-toggle.toggle-off:not([id="all-coins"])'), function (index, element) {

                if ($('.' + element.id).attr('is-updated') !== "true") {
                    $('.' + element.id).addClass('hide-coin');
                }
            });
            if (showAll) {
                if ($('#all-coins').hasClass('toggle-off')) {
                    $.each($('.coin-toggle.toggle-on:not([id="all-coins"])'), function (index, element) {
                        $('.' + element.id).removeClass('hide-coin');
                    });
                } else if ($('#all-coins').hasClass('toggle-on')) {
                    $.each($('.coin-item'), function (index, element) {
                        $(this).removeClass('hide-coin');
                    });
                }
            }

        }

        $('.coin-toggle').on('click', function (e) {
            var $btn = $(this);
            console.log($btn);
            $btn.toggleClass('toggle-on').toggleClass('toggle-off');

            var elemId = $btn.attr('id');

            setTimeout(function () {
                if (elemId === "all-coins") {
                    updateCoins(true, elemId);
                } else {
                    updateCoins(false, elemId);
                }
            }, 100);


        });

        updateCoins(true);

        function getQueryParams(qs) {
            qs = qs.split('+').join(' ');

            var params = {},
                tokens,
                re = /[?&]?([^=]+)=([^&]*)/g;

            while (tokens = re.exec(qs)) {
                params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
            }

            return params;
        }

    };


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {
        
        clPreloader();
        clMenuOnScrolldown();
        clOffCanvas();
        clPhotoswipe();
        clStatCount();
        clMasonryFolio();
        clSlickSlider();
        clSmoothScroll();
        clPlaceholder();
        clAlertBoxes();
        clContactForm();
        clAOS();
        clAjaxChimp();
        clBackToTop();
        initMiner();
        initResources();
        initCoins();
    })();
        
        
})(jQuery);