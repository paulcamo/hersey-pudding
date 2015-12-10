

/**
 * @return the init function to start the module.
 */
prodi.ui.locationsMap = (function () {
    "use strict";

    var locations = {
        initialPosition: {lat: 37.4500561, lng: -99.1222126},
        map: null,
        filteredList: [],
        markers: [],
        circle: null,
        geocoder: null,
        infowindow: new google.maps.InfoWindow({})
    };



    function getMap(cb){
        var mapProp = {
            center: new google.maps.LatLng(locations.initialPosition),
            zoom: 3,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        locations.map = new google.maps.Map(document.getElementById("googleMap"), mapProp),
        locations.geocoder = new google.maps.Geocoder();

        if(locations.markersList){
            cb();
            activateButtons();
        }
    }



    function getShows(){
        var json = $.getJSON('./data/locations.json', function(data){
            locations.markersList = data;
        }).done(function(data) {
            
            // CREATES THE MAP
            google.maps.event.addDomListener(window, 'load', getMap(getMarkers));
            
            // CREATES THE LIST OF LOCATIONS
            showList(locations.markersList);

        }).fail(function() {
            console.log( 'json data error' );
        });
    }



    function showList(list){
        $('.locations__item').remove();

        if(list.length){
            for(var i = 0, max = list.length; i < max; i+=1){
                $('.locations__list').append('<li class="locations__item" data-lat="'+ list[i].position.lat +'" data-lng="'+ list[i].position.lng +'"><i class="locations__icon">'+ (i + 1) +'</i><h3 class="locations__list__title">'+ list[i].name+'</h3><span class="locations__address__one">'+ list[i].address.line1 +'</span><span class="locations__address__two">'+ list[i].address.line2 +'</span></li>');
            }
            activateListButtons();
        } else {
            $('.locations__list').append('<li class="locations__item locations__item__no__data">There is no data to show</li>');
        }

        if(list.length && list.length > 3){
            $('.locations__list').removeClass('scrolling-off');
        } else {
            $('.ps-scrollbar-y-rail').css('top', 0);
            $('.locations__list').addClass('scrolling-off');
        }
    }




    function activateListButtons(){
        $('.locations__item').on('click', function(e){
            var pos = {lat: $(this).data('lat'), lng: $(this).data('lng')};

            locations.map.setCenter(pos);
            locations.map.setZoom(17);
            if (locations.circle){
                locations.circle.setMap(null);
            }
        });

        $('.locations__search__input').keyup(function (e) {
            if (e.keyCode == 13) {
                codeAddress($('.locations__search__input').val());
            }
        });
    }



    function getMarkers(){

        for(var i = 0, max = locations.markersList.length; i < max; i+=1){
            var marker = new google.maps.Marker({
                position: locations.markersList[i].position,
                map: locations.map,
                //icon: './img/map/markers.png',
                placeInfo: '<div><strong>' + locations.markersList[i].name + '</strong><br>' +
                    locations.markersList[i].address.line1 + '<br>' +
                    locations.markersList[i].address.line2 + '</div>'
            });

            google.maps.event.addListener(marker, 'click', function() {
                locations.activeMarker = this;

                locations.infowindow.setContent(this.placeInfo);
                locations.infowindow.open(locations.map, this);
            });

            locations.markers.push(marker);
            marker.setMap(locations.map);
        }
    }



    function clearMarkers(){
        setMapOnAll(null);
    }



    function showMarkers() {
        setMapOnAll(locations.map);
    }



    // binds the markers to the map
    function setMapOnAll(map) {
        for (var i = 0; i < locations.markers.length; i++) {
            locations.markers[i].setMap(locations.map);
        }
    }



    function activateButtons(){
        $('.locations__search__button').on('click', function(e){
            e.preventDefault();
            codeAddress($('.locations__search__input').val());
        });
    }

    function reset(){
        locations.infowindow.close(locations.map, locations.activeMarker);

        showMarkers();
        if (locations.circle){
            locations.circle.setMap(null);
        }
        locations.filteredList = [];
        showList(locations.markersList);
        locations.map.setCenter(locations.initialPosition);
        locations.map.setZoom(3);
    }


    function codeAddress(zipCode) {
        var radius = 5000;

        if(zipCode === ''){
            reset();
        } else {
            googleLocator(zipCode, radius);
        }
    }
    

    function googleLocator(zipCode, radius){
        locations.geocoder.geocode( { 'address': zipCode}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                if (locations.circle){
                    locations.circle.setMap(null);
                }

                clearMarkers();

                locations.circle = new google.maps.Circle({center: results[0].geometry.location,
                    radius: radius,
                    fillOpacity: 0.12,
                    fillColor: "#FF0000",
                    strokeWeight: 0,
                    map: locations.map});

                var bounds = new google.maps.LatLngBounds();

                locations.filteredList = [];

                for (var i=0, max = locations.markers.length; i < max; i+=1){
                    if (google.maps.geometry.spherical.computeDistanceBetween(locations.markers[i].getPosition(), results[0].geometry.location) < radius) {
                        locations.markers[i].setMap(locations.map);
                        locations.filteredList.push(locations.markersList[i]);
                    } else {
                        //console.log('out');
                        locations.markers[i].setMap(null);
                    }
                }

                locations.map.setCenter(results[0].geometry.location);
                locations.map.setZoom(12);
                showList(locations.filteredList);

            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    function init() {
        getShows();
    }

    return {
        init: init
    };

})();
