/*
#############################
#   Main JS for HOVARD LP   #
#############################
*/

jQuery(document).ready(function($) {

// OnePage scroll
  $(".one_page").onepage_scroll({
   sectionContainer: ".section",     // sectionContainer accepts any kind of selector in case you don't want to use section
   easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                    // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
   animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
   pagination: false,                // You can either show or hide the pagination. Toggle true for show, false for hide.
   updateURL: true,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
   beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
   afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
   loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
   keyboard: true,                  // You can activate the keyboard controls
   responsiveFallback: 500,        // You can fallback to normal page scroll by defining the width of the browser in which
                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                    // the browser's width is less than 600, the fallback will kick in.
   direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
  });

  $('.next_slide').on('click', function(event) {
    event.preventDefault();
    $('.one_page').moveDown();
  });

// Perfect Scroll bar initialization
  $(function() {
    $('.scrollbar').perfectScrollbar({
      suppressScrollX: true
    });

  });




// jQueryUI tabs initialization
  $(function() {
    $( "#info_tabs" ).tabs();
  });

  $(function() {
    $( "#places_tabs" ).tabs();
  });

  $(function() {
    $( "#infra_tabs" ).tabs();
  });



// Magnific popup initialization
  $('.magnific').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: false,

    overflowY: 'auto',
    modal: false,

    closeBtnInside: true,
    preloader: false,
    
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
  });

  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });


// Configurating Google map
  var infrastructure = [
    {
      lat: '59.917656',
      lng: '30.337495',
      image: 'marker-image.png',
      title: 'Skver',
    },
    {
      lat: '59.918603',
      lng: '30.347194',
      image: 'marker-image.png',
      title: 'Skver2',
    },
    {
      lat: '59.918297',
      lng: '30.354031',
      image: 'marker-image.png',
      title: 'Skver2',
    },
    {
      lat: '59.914838',
      lng: '30.344790',
      image: 'marker-image.png',
      title: 'Skver3',
    }
  ];

  var places = [
    {
      lat: '59.917656',
      lng: '30.337495',
      image: 'marker-image.png',
      title: 'Skver',
    },
    {
      lat: '59.914838',
      lng: '30.344790',
      image: 'marker-image.png',
      title: 'Skver3',
    }
  ]

  var map;
  var markers = [];

  function initMap(points) {
    var mapCenter = {lat: 59.918043, lng: 30.346625};

    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: mapCenter,
      zoom: 16,
      //draggable: false,
      disableDefaultUI: true,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var markerImage = new google.maps.MarkerImage('images/main_marker.png');
    var markerMain = new google.maps.Marker({
      icon: markerImage,
      position: mapCenter, 
      map: map,
      title: "HOVARD"
    });

    addMarker(points);


    $('.selectMarkers').on('click', function(event) {
      event.preventDefault();
      var pointsNm = $(this).attr('data-marker-group');

      switch (pointsNm) {
        case 'infrastructure':
          var points = infrastructure;
          break;
        case 'places':
          var points = places;
          break;
      } // end switch
      deleteMarkers()
      addMarker(points);
    });

    // Adds a Main marker at the center of the map
    addMarker(mapCenter);
  }



  // Adds a marker to the map and push to the array
  function addMarker(points) {
    for (var i = 0; i < points.length; i++) {
      var latLng = new google.maps.LatLng(points[i]['lat'], points[i]['lng']);
      var markerImage = new google.maps.MarkerImage('images/y_marker.png');
      var marker = new google.maps.Marker({
        position: latLng,
        icon: markerImage,
        map: map
      });
      markers.push(marker);
    }
  };

  function addOneMarker(){

  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }

  initMap(infrastructure);




// Slick slider initialization (floor_slider)
  $(function () {
    $('.flats_slider').slick({})
  })


// Custom functions for floor navigation
  $(function (){

    $('.floor').on('click', function(event) {
      event.preventDefault();
      var slide = $(this).attr('floor-index') - 1;
      $('.one_page').moveDown();
      $('.flats_slider').slick('slickGoTo', slide);
    });

    $('.flat_area').on('click', function(event) {
      event.preventDefault();
      $(this).attr('class', 'active flat_area').siblings().attr('class', 'flat_area');
      var label = $(this).parent().siblings('.label');
      var flat = {
        flNumber: $(this).attr('fl-number'),
        flArea: $(this).attr('fl-area'),
        flType: $(this).attr('fl-type')
      }

      label.find('.fl_num').text(flat.flNumber);
      label.find('.fl_type').text(flat.flType);
      label.find('.fl_area').text(flat.flArea);
    }); // end click event function

  }); // end main function


});




