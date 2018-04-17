/**
 * 初期化
 */
var opts = {
    zoom: 7,
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

var defaultImages = {
  1 : {
    url : 'img/01zyosetu-1.gif',
    bounds :  {
      south: 34.56,
      west: 135.04,
      north: 35.41,
      east: 136.08,
    }
  },
  2 : {
    url : 'img/02yamato.gif',
    bounds :  {
      south: 33.82,
      west: 135.5,
      north: 34.8,
      east: 136.29,
    }
  },
  3 : {
    url : 'img/03kasen.gif',
    bounds :  {
      south: 34.23,
      west: 135.06,
      north: 34.91,
      east: 135.8,
    }
  },
  11 : {
    url : 'img/11siseiga-1.gif',
    bounds :  {
      south: 33.68,
      west: 135.84,
      north: 35.29,
      east: 137.01,
    }
  },
  12 : {
    url : 'img/12bisan-1.gif',
    bounds :  {
      south: 34.55,
      west: 136.64,
      north: 35.47,
      east: 137.87,
    }
  },
  13 : {
    url : 'img/13kosunen.gif',
    bounds :  {
      south: 34.5,
      west: 137.43,
      north: 35.99,
      east: 139.2,
    }
  },
  14 : {
    url : 'img/14zuso.gif',
    bounds :  {
      south: 34.52,
      west: 138.67,
      north: 35.71,
      east: 139.79,
    }
  },
  15 : {
    url : 'img/15musasi.gif',
    bounds :  {
      south: 35.08,
      west: 138.63,
      north: 36.33,
      east: 140,
    }
  },
  16 : {
    url : 'img/16boso-1.gif',
    bounds :  {
      south: 34.88,
      west: 139.69,
      north: 35.79,
      east: 140.59,
    }
  },
  21 : {
    url : 'img/21omi.gif',
    bounds :  {
      south: 34.75,
      west: 135.69,
      north: 35.72,
      east: 136.51,
    }
  },
  22 : {
    url : 'img/22mino.gif',
    bounds :  {
      south: 35.11,
      west: 136.27,
      north: 36.03,
      east: 137.64,
    }
  },
  23 : {
    url : 'img/23sinhi.gif',
    bounds :  {
      south: 35.16,
      west: 136.71,
      north: 37.07,
      east: 138.79,
    }
  },
  24 : {
    url : 'img/24ryomo.gif',
    bounds :  {
      south: 35.91,
      west: 138.36,
      north: 37.25,
      east: 140.32,
    }
  },
  25 : {
    url : 'img/25nano.gif',
    bounds :  {
      south: 36.75,
      west: 139.08,
      north: 38.23,
      east: 141.11,
    }
  },
  26 : {
    url : 'img/26tyuo.gif',
    bounds :  {
      south: 37.9,
      west: 140.33,
      north: 40.53,
      east: 142.33,
    }
  },
  27 : {
    url : 'img/27hokuo.gif',
    bounds :  {
      south: 39.88,
      west: 139.75,
      north: 42.3,
      east: 141.74,
    }
  },
  28 : {
    url : 'img/28ryou.gif',
    bounds :  {
      south: 37.78,
      west: 139.1,
      north: 40.52,
      east: 141.37,
    }
  },
};


for (name in defaultImages) {
  console.log(name);
  addOverlayImage(defaultImages[name]);
}


var currentLayer = null;
function addOverlayImage (image) {
  var historicalOverlay;
  historicalOverlay = new google.maps.GroundOverlay(
      image.url,
      image.bounds,
      {
        clickable : true,
        draggable: true,
        opacity : 0.7
      }
    );
  
  historicalOverlay.addListener('click', function(e){
    $('#overlayimg').attr('src', this.getUrl());
  
    $('#sw_lat').val(this.getBounds().getSouthWest().lat());
    $('#sw_lon').val(this.getBounds().getSouthWest().lng());
    $('#ne_lat').val(this.getBounds().getNorthEast().lat());
    $('#ne_lon').val(this.getBounds().getNorthEast().lng());
  
    currentLayer = historicalOverlay;
    //var bounds = this.getBounds().toString();
    //var ret = window.prompt('', bounds)
  });

  historicalOverlay.setMap(map);

}



$('#sw_lat,#sw_lon,#ne_lat,#ne_lon').change(function(){
  console.log('change');
  sw = new google.maps.LatLng( $('#sw_lat').val(), $('#sw_lon').val()),
  ne = new google.maps.LatLng( $('#ne_lat').val(), $('#ne_lon').val()),
  bounds = new google.maps.LatLngBounds( sw, ne );
  currentLayer.set("bounds", bounds);
  currentLayer.setMap(map);
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


