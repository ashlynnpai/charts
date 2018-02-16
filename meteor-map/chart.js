
var map = new Datamap({
    element: document.getElementById('container'),
    responsive: true,
    scope: 'world',
    geographyConfig: {
        popupOnHover: false,
        highlightOnHover: false,

    },
    fills: {
        "huge": "#ff8b94",
        "large": "#ffaaa5",
        "medium": "#dcedc1",
        "small": "#a8e6cf",
        "defaultFill": "#ffd3b6",
    },
    data: {
    }
});
window.addEventListener('resize', function() {
    map.resize();
});

d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json", function(error, response) {
    var arr = [];
    var meteor = {};
    for (i=0; i<response.features.length; i++) {
        try {
            let coords = response.features[i].geometry.coordinates;
            let props = response.features[i].properties;
            var rad = 0;
            var size = "";
            if (props.mass > 100000) {
              rad = 30;
              size = "huge";
            }
            else if (props.mass > 50000) {
              rad = 15;
              size = "large";
            }
            else if (props.mass > 10000) {
              rad = 10;
              size = "medium";
            }
            else {
              rad = 3;
              size = "small";
            }
            arr.push({"latitude": coords[1], "longitude": coords[0], "radius": rad,
                     "name": props.name, "year": props.year, "fillkey": size, "mass": props.mass})
        }
        catch(error) {
            console.log(i);
        }
    }
    //var formatTime = d3.time.format("%Y");
    map.bubbles(arr, {
       fills: {
        "huge": "#ff8b94",
        "large": "#ffaaa5",
        "medium": "#dcedc1",
        "small": "#a8e6cf",
        "defaultFill": "#ffd3b6",
        },
        popupTemplate: function (geo, data) {
                return ['<div>' +  data.name,
                '<br/>Year: ' +  data.year + '',
                '<br/>Mass: ' +  data.mass + '',
                '</div>'].join('');
        }
    });
});
