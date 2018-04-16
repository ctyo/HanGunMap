/**
 * 初期化
 */
var opts = {
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(35, 135),
    styles: [{
      stylers: [
        {gamma: 0},
        {lightness: 0},
        {saturation: -100},
        {inverse_lightness: false}
      ]
    }]
  };
map = new google.maps.Map(document.getElementById("map"), opts);

var imageBounds = {
  south: 34.56,
  west: 135.04,
  north: 35.41,
  east: 136.08,
};



var historicalOverlay;

historicalOverlay = new google.maps.GroundOverlay(
    'img/01zyosetu-1.gif',
    imageBounds,
    {
      clickable : true,
      draggable: true,
      opacity : 0.6
    }
  );

historicalOverlay.addListener('click', function(e){
  $('#overlayimg').attr('src', this.getUrl());

  $('#sw_lat').val(this.getBounds().getSouthWest().lat());
  $('#sw_lon').val(this.getBounds().getSouthWest().lng());
  $('#ne_lat').val(this.getBounds().getNorthEast().lat());
  $('#ne_lon').val(this.getBounds().getNorthEast().lng());

  //var bounds = this.getBounds().toString();
  //var ret = window.prompt('', bounds)


});

$('#sw_lat,#sw_lon,#ne_lat,#ne_lon').change(function(){
  console.log('change');
  sw = new google.maps.LatLng( $('#sw_lat').val(), $('#sw_lon').val()),
  ne = new google.maps.LatLng( $('#ne_lat').val(), $('#ne_lon').val()),
  bounds = new google.maps.LatLngBounds( sw, ne );
  historicalOverlay.set("bounds", bounds);
  historicalOverlay.setMap(map);
});


function boundsFromCoordString( coordString ) {
  var match = coordString
  .replace( /\s/g, '' )
  .match( /^\(\((.*),(.*)\),\((.*),(.*)\)\)$/ );
  var
      s = +match[1],
      w = +match[2],
      n = +match[3],
      e = +match[4],
      sw = new google.maps.LatLng( s, w ),
      ne = new google.maps.LatLng( n, e ),
      bounds = new google.maps.LatLngBounds( sw, ne );
  return bounds;
}


historicalOverlay.setMap(map);
