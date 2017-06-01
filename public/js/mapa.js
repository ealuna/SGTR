var socket = io.connect('/mapa', {'forceNew': true});
var socket2 = io.connect('/clientes', {'forceNew': true});
var socket3 = io.connect('/rutas', {'forceNew': true});
var imgPaths = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

var database = "terranorte";
var markerCluster;
var map;
var device = {};
var rutas = {};
var clientes = [];
var clientes2 = {};
var flota = {};
var excluir = {};


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
//socket.on('flota', function (value) {
//    var html = '<select id="flota">';
//    html += '<option value="all"> all </option>';
//    for (var i = 0; i < value.length; i++) {
//        html += '<option value="' + value[i].id + '">';
//        html += ' T-' + value[i].id;
//        html += '</option>';
//    }
//    html += '</select>';
//    $('#floating-panel').html(html);
//});

//socket.on('mapa', function (data) {
//    var newDevice = new google.maps.Marker({
//        position: data.position,
//        title: data.id
//    });
//    if (device.length) {
//        device.push(newDevice);
//        newDevice.setMap(map);
//    } else {
//        lastIndex(device).setMap(null);
//        device.push(newDevice);
//        newDevice.setMap(map);
//    }
//    //console.log(data.position);
//});

socket.on('flotaMapa', function (data) {
    //console.log(excluir);
    for (var i = 0; i < data.length; i++) {
        var newDevice = new google.maps.Marker({
            position: {lat: data[i].lat, lng: data[i].lon},
            title: data[i].vehicle,
            icon: '/imgs/truck2.png',
            id: data[i].vehicle
        });

        if (device[data[i].vehicle] && !excluir[data[i].vehicle]) {
            device[data[i].vehicle].setMap(null);
        }
        device[data[i].vehicle] = newDevice;
        if (!excluir[data[i].vehicle]) {
            newDevice.setMap(map);
        }
    }
    //console.log(flota);
});

$(document).on("change", "#flota", function () {
    borrarClientes();
    borrarRutas();
    var selected = $(this).val();
    $.each(flota, function (key, value) {
        if (selected === 'all' && excluir[key]) {
            if (device[key]) {
                excluir[key] = null;
                device[key].setMap(map);
            } else {

            }
        } else if (key !== selected && device[key]) {
            excluir[key] = value;
            device[key].setMap(null);
        } else {
            //socket2.emit('clientes', selected);
            cargarClientes('terranorte', selected);
            excluir[key] = null;
            if (device[key]) {
                device[key].setMap(map);
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
    if (clientes.length) {
        //markerCluster.remove();
        for (var i = 0; i < clientes.length; i++) {
            clientes[i].setMap(null);
        }
//        $.each(clientes, function (key, item) {
//            console.log(clientes[key].map);
//            item.setMap(null);
//            console.log(clientes[key].map);
//        });
    }
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
        //data: {cbxEsquema: esquema},
        success: function (respuesta) {

            var html = '<select id="flota">';
            html += '<option value="all"> all </option>';
            for (var i = 0; i < respuesta.length; i++) {
                html += '<option value="' + respuesta[i].id + '">';
                html += respuesta[i].id;
                html += '</option>';
                flota[respuesta[i].id] = respuesta[i];
            }
            html += '</select>';
            $('#flota-panel').html(html);
        }});
}

function cargarClientes(database, transporte) {
    $.ajax({
        url: "get/" + database + "/clientesDia/" + transporte,
        type: "POST",
        //data: {cbxEsquema: esquema},
        success: function (respuesta) {
            console.log(respuesta);
            for (var i = 0; i < respuesta.length; i++) {
                var cliente = new google.maps.Marker({
                    position: {
                        lat: parseFloat(respuesta[i].YCoord),
                        lng: parseFloat(respuesta[i].XCoord)
                    },
                    title: respuesta[i].nombreCliente,
                    icon: '/imgs/customer.png',
                    map: map
                });
                if (flota[respuesta[i].idTransportista]) {
                    var id = flota[respuesta[i].idTransportista];
                    clientes2[id][respuesta[i].idCliente] = cliente;
                }
                clientes.push(cliente);
            }
        }});
}


//socket.on('clientes', function (data) {
//    for (var i = 0; i < data.length; i++) {
//        var cliente = new google.maps.Marker({
//            position: data.position,
//            map: map,
//            title: data.nombreCliente
//        });
//    }
//});

//function render(data) {
//    var html = data.map(function (elem, index) {
//        return(`<div>
//              <strong>${elem.author}</strong>:
//              <em>${elem.text}</em>
//            </div>`);
//    }).join(" ");
//    document.getElementById('messages').innerHTML = html;
//}

//function addMessage(e) {
//    var message = {
//        author: document.getElementById('username').value,
//        text: document.getElementById('texto').value
//    };
//

//    return false;
//}

function lastIndex(array) {
    return array[array.length - 1];
}