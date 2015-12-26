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
   responsiveFallback: 1201,        // You can fallback to normal page scroll by defining the width of the browser in which
                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                    // the browser's width is less than 600, the fallback will kick in.
   direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
  });

  $('.next_slide').on('click', function(event) {
    event.preventDefault();
    $('.one_page').moveDown();
  });



// Top menu functions 
  $(function(){
    $('.mobile_menu').on('click', function(event) {
      event.preventDefault();
      $('.navigation').toggleClass('active');
      $(this).toggleClass('active').siblings('ul').toggleClass('active');
    });
  });





// Perfect Scroll bar initialization
  $(function() {
    $('.scrollbar').perfectScrollbar({
      suppressScrollX: true
    });

  });


// jQueryUI tabs initialization
  $(function() {
    $( ".info_tabs" ).tabs();
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
      id: '#01',
      group: 'gr#01'
    },
    {
      lat: '59.918603',
      lng: '30.347194',
      image: 'marker-image.png',
      title: 'Skver2',
      id: '#02',
      group: 'gr#01'
    },
    {
      lat: '59.918297',
      lng: '30.354031',
      image: 'marker-image.png',
      title: 'Skver2',
      id: '#03',
      group: 'gr#01'
    },
    {
      lat: '59.914838',
      lng: '30.344790',
      image: 'marker-image.png',
      title: 'Skver3',
      id: '#04',
      group: 'gr#02'
    },
    {
      lat: '59.915',
      lng: '30.345',
      image: 'marker-image.png',
      title: 'Skver3',
      id: '#05',
      group: 'gr#02'
    },
    {
      lat: '59.916',
      lng: '30.346',
      image: 'marker-image.png',
      title: 'Skver3',
      id: '#06',
      group: 'gr#03'
    },
    {
      lat: '59.917',
      lng: '30.347',
      image: 'marker-image.png',
      title: 'Skver3',
      id: '#07',
      group: 'gr#03'
    },
    {
      lat: '59.918',
      lng: '30.348',
      image: 'marker-image.png',
      title: 'Skver3',
      id: '#08',
      group: 'gr#04'
    }
  ];

// надо так как в певом масиве
  var places = [];






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

    for (var i = 0; i < markers.length; i++) {
    
    };
    

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

    $('.group-selector').on('click', function(event) {
      event.preventDefault();
      var pointsNm = $(this).attr('data-main-group');
      var group = $(this).attr('data-group');

      switch (pointsNm) {
        case 'infrastructure':
          var points = infrastructure;
          break;
        case 'places':
          var points = places;
          break;
      } // end switch
      deleteMarkers()
      addMarkerGroup(points, group);
    });

    $('.place-selector').on('click', function(event) {
      event.preventDefault();
      $('.place-selector').parent().removeClass('active');
      $(this).parent().addClass('active');
      var pointsNm = $(this).attr('data-main-group');
      var group = $(this).attr('data-group');
      var id = $(this).attr('place-id');
      console.log(id)

      switch (pointsNm) {
        case 'infrastructure':
          var points = infrastructure;
          break;
        case 'places':
          var points = places;
          break;
      } // end switch
      deleteMarkers()
      addMarkerPlace(points, group, id);
    });

    // Adds a Main marker at the center of the map
    addMarker(mapCenter);
  }



  var infowindow = null;

  /* now inside your initialise function */
  infowindow = new google.maps.InfoWindow({
    content: "holding..."
  });


  // Adds a marker to the map and push to the array
  function addMarker(points) {
    for (var i = 0; i < points.length; i++) {
      var latLng = new google.maps.LatLng(points[i]['lat'], points[i]['lng']);
      var content = points[i]['image'];
      var markerImage = new google.maps.MarkerImage('images/y_marker.png');
      var marker = new google.maps.Marker({
        position: latLng,
        icon: markerImage,
        map: map
      });

      google.maps.event.addListener(marker, 'click', function () {
        // where I have added .html to the marker object.
        infowindow.setContent('<img src="images/'+content+'">');
        infowindow.open(map, this);
      });

      markers.push(marker);
    }
  };

  // Adds a marker to the map and push to the array
  function addMarkerGroup(points, group) {
    for (var i = 0; i < points.length; i++) {

      if (points[i]['group'] == group) {
          var latLng = new google.maps.LatLng(points[i]['lat'], points[i]['lng']);
          var content = points[i]['image'];
          var markerImage = new google.maps.MarkerImage('images/y_marker.png');
          var marker = new google.maps.Marker({
            position: latLng,
            icon: markerImage,
            map: map
          });

          google.maps.event.addListener(marker, 'click', function () {
            // where I have added .html to the marker object.
            infowindow.setContent('<img src="images/'+content+'">');
            infowindow.open(map, this);
          });

          markers.push(marker);  
        }; // end if  
    } // end loop
  }; // end AddMarkerGroup

  // Adds a marker to the map and push to the array
  function addMarkerPlace(points, group, id) {
    for (var i = 0; i < points.length; i++) {
      if ( (points[i]['group'] == group) && (points[i]['id'] == id) ) {
          var latLng = new google.maps.LatLng(points[i]['lat'], points[i]['lng']);
          var content = points[i]['image'];
          var markerImage = new google.maps.MarkerImage('images/y_marker.png');
          var marker = new google.maps.Marker({
            position: latLng,
            icon: markerImage,
            map: map
          });

          google.maps.event.addListener(marker, 'click', function () {
            // where I have added .html to the marker object.
            infowindow.setContent('<img src="images/'+content+'">');
            infowindow.open(map, this);
          });

          markers.push(marker);  
        }; // end if  
    } // end loop
  }; // end AddMarkerGroup


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




// Slick slider initialization (floor_slider, sliderChoose)
  $(function () {

    $('.flats_slider').slick();

    var $status = $('.pagingInfo');
    var $slickElement = $('.sliderChoose');

    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.text(i + '/' + slick.slideCount);
    });

    $slickElement.slick({
        autoplay: false,
        dots: true
    });

  }) // end



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



