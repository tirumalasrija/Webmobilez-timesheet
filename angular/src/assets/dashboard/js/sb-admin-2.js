(function ($) {
    "use strict"; // Start of use strict

    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
            $('.sidebar .collapse').collapse('hide');
            $('.mobile-nav-bar').addClass('show-logo-onscroll');
        } else {
            if ($("nav").hasClass("fixed-top")) {
                $('.mobile-nav-bar').addClass('show-logo-onscroll');                
            } else {
                $('.mobile-nav-bar').removeClass('show-logo-onscroll');
            }
        }
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function () {
        if ($(window).width() < 768) {
            $('.sidebar .collapse').collapse('hide');
        }
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
        if ($(window).width() > 768) {
            var e0 = e.originalEvent,
                    delta = e0.wheelDelta || -e0.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
        }
    });

    // Scroll to top button appear
    $(document).on('scroll', function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', function (e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
    });

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
        $(".alert-dismissible").fadeTo(2000, 500).slideUp(500, function () {
            $(this).alert('close');
        });
    });
   /* $(window).scroll(function () {
        var windscroll = $(window).scrollTop();
        if (windscroll >= 50) {
            $('nav').addClass('fixed-top');
            $('.mobile-nav-bar').addClass('show-logo-onscroll');
        } else {
            $('nav').removeClass('fixed-top');
            $('.mobile-nav-bar').removeClass('show-logo-onscroll');
            if ($(".sidebar").hasClass("toggled")) {
                $('.mobile-nav-bar').addClass('show-logo-onscroll');
            }
        }
    }); */

})(jQuery); // End of use strict
