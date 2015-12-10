var prodi = prodi || {ui:{}};

/**
 * Function executed when document is ready. It calls all modules' init function.
 */
$(function () {
    "use strict";

    /**
     * Inits Utilities
     */
    prodi.ui.utilities.init();

    /**
     * Inits Scrollto
     */
    prodi.ui.scrollto.init();
    
    /**
     * Inits Locations Map
     */
    prodi.ui.locationsMap.init();

    /**
     * Inits Popup windows
     */
    prodi.ui.popups.init();
});
