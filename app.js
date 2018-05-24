function initialize() 
{ var myCenter = new google.maps.LatLng(51.508742,-0.120850)
  map = new google.maps.Map(document.getElementById('googleMap'), {
    center: myCenter,
    zoom: 10
  });
  var marker = new google.maps.Marker({position:myCenter});
  marker.setMap(map);
}

function setLocation(lat,lng)
{ 
  var myCenter = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({position: myCenter});

  marker.setMap(map);
  map.setCenter({
    lat : lat,
    lng : lng
  });
}

function setWeather(continent, city)
{
  
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=7687b12d9a2bcf2eb361aafb96085ebd&units=metric", function(data){ 
    $(".temperature").replaceWith("<p class='temperature text-center'> <strong>" + Math.round(data.main.temp) + "° </strong> </p>");
    $(".description").replaceWith("<p class='description text-center text-capitalize'> <strong>" + data.weather[0].description + "</strong> </p>");
    var c = moment.tz(new Date(), "" + continent + "/" + city.split(' ').join('_') + "");
    $(".city-datetime").replaceWith("<p class='city-datetime text-center'> " + c.format("ddd MMM D YYYY HH:mm:ss") + " </p>")
    
  });
}

$( document ).ready(function() {
	$.getJSON( "cities.json", function( data ) {

$.each(data, function(key, val){
      $('<option />', {
       value: key,
       text: val.city
      }).appendTo('#select-city');
      if (key == 0){
        $(".city-heading").replaceWith("<h2 class='city-heading'> <strong>" + val.city + ": </strong> </h2>");
        $(".city-description").replaceWith("<p class='city-description'>" + val.description + "</p>");
        setWeather(val.continent, val.city);
        $(".carousel-indicators").replaceWith("<ul class='carousel-indicators'></ul>");
          $(".carousel-inner").replaceWith("<div class='carousel-inner'></div>");
          $.each(val.images, function (key, val) {
          $('<div class="carousel-item"><img src="images/'+ val.name +'"><div class="carousel-caption"><p>' + val.description + '</p></div></div>').appendTo('.carousel-inner');
          $('<li data-target="#slideshow-carousel" data-slide-to="'+ key +'"></li>').appendTo('.carousel-indicators')
          })
          $('.carousel-indicators > li').first().addClass('active');
          $('.carousel-item').first().addClass('active');
          $('#slideshow-carousel').carousel();
      }

      });
});
  
  $('#select-city').on('change', function() {
    var c = $(this).val()
    $.getJSON( "cities.json", function(data) {
       $.each(data, function(key, val){
      if (key == c) {
       $(".city-heading").replaceWith("<h2 class='city-heading'> <strong>" + val.city + ": </strong> </h2>");
       $(".city-description").replaceWith("<p class='city-description'>" + val.description + "</p>");
        setLocation(parseFloat(val.latitude), parseFloat(val.longitude));
        setWeather(val.continent, val.city);
        $(".carousel-indicators").replaceWith("<ul class='carousel-indicators'></ul>");
          $(".carousel-inner").replaceWith("<div class='carousel-inner'></div>");
          $.each(val.images, function (key, val) {
          $('<div class="carousel-item"><img src="images/'+ val.name +'"><div class="carousel-caption"><p>' + val.description + '</p></div></div>').appendTo('.carousel-inner');
          $('<li data-target="#slideshow-carousel" data-slide-to="'+ key +'"></li>').appendTo('.carousel-indicators')
          })
          $('.carousel-indicators > li').first().addClass('active');
          $('.carousel-item').first().addClass('active');
          $('#slideshow-carousel').carousel();
        }
      })
    })
  })
});