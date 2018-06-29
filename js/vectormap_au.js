$(function(){
  new jvm.Map({
    container: $('#aus-map'),
    map: 'au_mill',
    focusOn: {
        x: 0.6,
        y: -0.2,
        scale: 1
    },
    regionStyle: {
        initial: {
            fill: '#eee'
        }
    },
    backgroundColor: 'none',
    normalizeFunction: 'polynomial',
    markers: au_sites.map(function(h){ return {name: h.name, latLng: h.coords} }),
    labels: {
        markers: {
          render: function(index){
            //return au_sites[index].name;
          },
          offsets: function(index){
            var offset = au_sites[index]['offsets'] || [0, 0];
            return [offset[0] - 7, offset[1] + 3];
          }
        }
    },
    series: {
      markers: [{
        attribute: 'fill',
        scale: {
          'nbn': '#00FF00',
          'adsl': '#00FFFF',
          'fibre': '#FFFF00'
        },
        values: au_sites.reduce(function(p, c, i){ p[i] = c.status; return p }, {}),
        legend: {
          horizontal: true,
          title: 'Current Map of NBN/ADSL sites in Aus',
          labelRender: function(v){
            return {
              nbn: 'nbn',
              adsl: 'adsl - nbn scheduled for 2018',
              fibre: 'fibre'
            }[v];
          }
        }
      }]
    }
  });
});
