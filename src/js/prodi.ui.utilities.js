/**
 * @return the init function to start the module.
 */
prodi.ui.utilities = (function () {
    "use strict";

    var share = {
        'url': 'http://www.hersheys.com/',
        'text': 'This is a sample text'
    };

    function sharing(){
        $('.facebook__share').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(share.url) + '&t=' + encodeURIComponent(share.text));
        
        $('.twitter__share').attr('href', 'http://twitter.com/intent/tweet?status='+ encodeURIComponent(share.text)+'+'+ encodeURIComponent(share.url));
    }


    function init() {
        sharing();
    }


    return {
        init: init
    };

})();