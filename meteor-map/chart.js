
var map = new Datamap({
    element: document.getElementById('container'),
    responsive: true,
    scope: 'world',
    geographyConfig: {
        popupOnHover: false,
        highlightOnHover: false,

    },

    // dataUrl: 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json',
    fills: {
        defaultFill: 'pink'
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
            meteor["latitude"] = coords[0];
            meteor["longitude"] = coords[1];
            meteor["radius"] = 10;
            let props = response.features[i].properties;
            meteor["name"] = props.name;
            meteor["year"] = props.year;
            arr.push(meteor);
        }
        catch(error) {
            console.log(i);
        }
    }
    map.bubbles(arr, {
        popupTemplate: function (geo, data) {
                return ['<div>' +  data.name,
                '<br/>Year: ' +  data.year + '',
                '</div>'].join('');
        }
    });
});
