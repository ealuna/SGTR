var socket = io.connect('/mapa', {'forceNew': true});
var socket2 = io.connect('/clientes', {'forceNew': true});
var socket3 = io.connect('/rutas', {'forceNew': true});
var imgPaths = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

var database = "terranorte";
var markerCluster;
var map;


var clientes2 = {};
var planilla = {};
var flota = {};
var rutas = {};
var clientes = [];
var vendedor = {};
//var documentos = {};




//socket2.emit('clientes', '588');

//function initMap() {
//    map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: -11.970892, lng: -77.071365},
//       zoom: 12
//   });
//} 
$(document).ready(function () {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -11.970892, lng: -77.071365},
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        fullscreenControl: true,
        zoom: 12,
        styles: [
            {
                featureType: "poi",
                stylers: [
                    {visibility: "off"}
                ]
            }
            //,{"stylers": [{"saturation": -100}]}
        ]
    });
    cargarFlota(database);
    cargarClientes(database);
    pintarClientes(null);
});


socket.on('databases', function (value) {
    $('#floating-panel').html('');
    var html = '<select id="databases">';
    for (var i = 0; i < value.length; i++) {
        html += '<option value="' + value[i] + '">';
        html += value[i];
        html += '</option>';
    }
    html += '</select>';
    $('#floating-panel').html(html);
});

socket.on('flota', function (data) {
    for (var i = 0; i < data.length; i++) {
        var coords = {
            marker: null,
            visible: true,
            positions: []
        };
        var position = {lat: data[i].lat, lng: data[i].lon};
        var newDevice = new google.maps.Marker({
            position: position,
            title: data[i].vehicle,
            icon: '/imgs/truck2.png',
            iddevice: data[i].iddevice,
            desc: data[i].desc,
            date: data[i].date,
            time: data[i].time,
            status: data[i].status,
            kmh: data[i].kmh,
            dir: data[i].dir
        });
        if (flota[data[i].vehicle]) {
            var camion = flota[data[i].vehicle];
            if (camion['coords']) {
                if (camion['coords']['visible'] === true) {
                    camion['coords']['marker'].setMap(null);
                    newDevice.setMap(map);
                }
            } else {
                flota[data[i].vehicle]['coords'] = coords;
                newDevice.setMap(map);
            }
        } else {
            flota[data[i].vehicle] = {};
            flota[data[i].vehicle]['coords'] = coords;
            newDevice.setMap(map);
        }
        flota[data[i].vehicle]['coords']['marker'] = newDevice;
        flota[data[i].vehicle]['coords']['positions'].push(position);
    }
    console.log(flota);
});

function pintarClientes(numcam) {
    if (numcam) {
        $.each(clientes2[numcam], function (key, value) {
            if (value) {
                value.setMap(map);
            }
        });
    } else {
        $.each(clientes2, function (key, value) {
            $.each(value, function (key, value) {
                if (value) {
                    value.setMap(map);
                }
            });
        });
    }
}



$(document).on("change", "#flota", function () {
    borrarClientes();
    borrarRutas();
    console.log(flota);
    var selected = $(this).val();
    $.each(flota, function (key, value) {
        console.log(key + '  ' + selected);
        if (selected === 'all') {
            if (value['coords']) {
                if (!value['coords']['visible']) {
                    flota[key]['coords']['visible'] = true;
                    value['coords']['marker'].setMap(map);
                }
            }
            pintarClientes(null);
        } else {
            if (key === selected) {
                if (value['coords']) {
                    if (!value['coords']['visible']) {
                        flota[key]['coords']['visible'] = true;
                        value['coords']['marker'].setMap(map);
                    }
                }
                //socket2.emit('clientes', selected);
                pintarClientes(selected);

            } else {
                if (flota[key]['coords']) {
                    if (value['coords']['visible']) {
                        flota[key]['coords']['visible'] = false;
                        value['coords']['marker'].setMap(null);
                    }
                }
            }
        }
    });
});

socket2.on('cli', function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var cliente = new google.maps.Marker({
            position: {
                lat: parseFloat(data[i].YCoord),
                lng: parseFloat(data[i].XCoord)
            },
            title: data[i].nombreCliente,
            icon: '/imgs/customer.png',
            map: map
        });
        if (clientes2[data[i].idTransportista]) {
            var id = clientes2[data[i].idTransportista];
            id[data[i].idCliente] = cliente;
        } else {
            clientes2[data[i].idTransportista] = {};
            clientes2[data[i].idTransportista][data[i].idCliente] = cliente;
        }
        clientes.push(cliente);
    }
//    markerCluster = new MarkerClusterer(map, clientes, {
//        minimumClusterSize: 2,
//        maxZoom: 12,
//        imagePath: imgPaths
//    });
});

socket3.on('rut', function (data) {
    //console.log(data);
    var i, j, array;
    for (i = 0; i < data.length; i++) {
        var coords = data[i].coords.match(/-?\d+\.?\d*/g);
        //console.log(coords)
        for (j = 0, array = []; j < coords.length; j += 2) {
            var lng = parseFloat(coords[j + 1]);
            var lat = parseFloat(coords[j]);
            array.push(new google.maps.LatLng(lng, lat).toJSON());
        }
        var polygon = new google.maps.Polygon({
            paths: array,
            strokeColor: '#ff6262', //rojo
            strokeOpacity: 0.5,
            strokeWeight: 1,
            fillColor: '#ff6262', //rojo
            fillOpacity: 0.1,
            title: data[i].ruta,
            transporte: data[i].idTransportista,
            planilla: data[i].numeroPlanilla,
            clientes: data[i].numcli
        });
        if (!rutas[data[i].ruta]) {
            rutas[data[i].ruta] = polygon;
            rutas[data[i].ruta].setMap(map);
        } else {

        }
    }
//        
//        var cliente = new google.maps.Marker({
//            position: {
//                lat: parseFloat(data[i].YCoord),
//                lng: parseFloat(data[i].XCoord)
//            },
//            title: data[i].nombreCliente,
//            icon: '/imgs/cliente.png',
//            map: map
//        });
//        clientes.push(cliente);
//    }
//    markerCluster = new MarkerClusterer(map, clientes, {
//        minimumClusterSize: 2,
//        maxZoom: 12,
//        imagePath: imgPaths
//    });
});



function borrarClientes() {
    //if (clientes.length) {
    //markerCluster.remove();
//        for (var i = 0; i < clientes.length; i++) {
//            clientes[i].setMap(null);
//        }
    $.each(clientes2, function (key, item) {
        $.each(item, function (key, value) {
            if (value) {
                value.setMap(null);
            }
        });
    });
    //}
}

function borrarRutas() {
    if (rutas) {
        //markerCluster.remove();
//        for (var i = 0; i < rutas.length; i++) {
//            rutas[i].setMap(null);
//        }
        $.each(rutas, function (key, item) {
            //console.log(item);
            //rutas[key].map = null;

            item.setMap(null);
            //console.log(clientes[key].map);
        });
    }
}

function cargarFlota(database) {
    $.ajax({
        url: "get/" + database + "/flota",
        type: "POST",
        success: function (respuesta) {
            aderirFlota(respuesta);
            cbxFlota(respuesta);
        }});
}

function cbxFlota(respuesta) {
    var html = '<select id="flota">';
    html += '<option value="all"> all </option>';
    for (var i = 0; i < respuesta.length; i++) {
        html += '<option value="' + respuesta[i].id + '">';
        html += respuesta[i].id;
        html += '</option>';
    }
    html += '</select>';
    $('#flota-panel').html(html);
}

function aderirFlota(respuesta) {
    for (var i = 0; i < respuesta.length; i++) {
        var datos = {
            nombres: respuesta[i].nombres,
            telefono: respuesta[i].telefono,
            direccion: respuesta[i].direccion,
            placa: respuesta[i].placa,
            vehiculo: respuesta[i].vehiculo
        };
        if (!flota[respuesta[i].id]) {
            flota[respuesta[i].id] = {};
            flota[respuesta[i].id]['datos'] = datos;
        } else {
            flota[respuesta[i].id]['datos'] = datos;
        }
    }
}

function cargarClientes(database) {
    $.ajax({
        url: "get/" + database + "/ventas/",
        type: "POST",
        //data: {cbxEsquema: esquema},
        success: function (respuesta) {
            //var bounds = new google.maps.LatLngBounds();
            //console.log(respuesta);
            for (var i = 0; i < respuesta.length; i++) {
                var position = {
                    lat: parseFloat(respuesta[i].YCoord),
                    lng: parseFloat(respuesta[i].XCoord)
                };
                var cliente = new google.maps.Marker({
                    position: position,
                    title: respuesta[i].nombreCliente,
                    icon: '/imgs/customer.png',
                    map: map
                });
                if (clientes2[respuesta[i].idTransportista]) {
                    var id = clientes2[respuesta[i].idTransportista];
                    id[respuesta[i].idCliente] = cliente;
                } else {
                    clientes2[respuesta[i].idTransportista] = {};
                    clientes2[respuesta[i].idTransportista][respuesta[i].idCliente] = cliente;
                }
                clientes.push(cliente);
            }
        }});
}

socket.on('prueba', function (data) {
    console.log(clientes2);
    var marker = clientes2[data['idtransporte']][data['idcliente']];
    if (data['estado']) {
        marker.setIcon('/imgs/customer2.png');
    } else {
        marker.setIcon('/imgs/customer3.png');
    }
    console.log(data);
});

function lastIndex(array) {
    return array[array.length - 1];
}