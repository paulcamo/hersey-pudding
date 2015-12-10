/**
 * @return the init function to start the module.
 */
prodi.ui.scrollto = (function () {
    "use strict";

    var options = {
        selector: '.scroll__to',
        offset: 0,
        speed: 500,
        page: prodi.ui.constants.PAGE || $('body')
    };

    // scroll to functionality 
    function scrollTo(){
        $(options.selector).on('click', function(e){
            e.preventDefault();

            var $section = $($(this).attr('href')),
            offset = $(this).data('offset') || options.offset,
            speed = $(this).data('speed') || options.speed;
            
            options.page.animate({ 
                scrollTop: $section.offset().top - offset
            }, speed);
        });
    }

    function init() {
        scrollTo();
    }


    return {
        init: init
    };

})();