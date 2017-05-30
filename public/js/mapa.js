var socket = io.connect('/mapa', {'forceNew': true});
var socket2 = io.connect('/clientes', {'forceNew': true});

var map;
var device = [];
var clientes = [];
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
        ]
    });
});

socket.on('flota', function (value) {
    var html = '<select id="flota">';
    html += '<option value="all"> all </option>';
    for (var i = 0; i < value.length; i++) {
        html += '<option value="' + value[i].id + '">';
        html += ' T-' + value[i].id;
        html += '</option>';
    }
    html += '</select>';
    $('#floating-panel').html(html);
});

socket.on('mapa', function (data) {
    var newDevice = new google.maps.Marker({
        position: data.position,
        title: data.status
    });
    if (device.length) {
        device.push(newDevice);
        newDevice.setMap(map);
    } else {
        lastIndex(device).setMap(null);
        device.push(newDevice);
        newDevice.setMap(map);
    }
    console.log(data.position);
});

socket.on('flotaMapa', function (data) {
    console.log(excluir);
    for (var i = 0; i < data.length; i++) {
        var newDevice = new google.maps.Marker({
            position: {lat: data[i].lat, lng: data[i].lon},
            title: data[i].status,
            id: data[i].vehicle
        });

        if (flota[data[i].vehicle] && !excluir[data[i].vehicle]) {
            flota[data[i].vehicle].setMap(null);
        }
        flota[data[i].vehicle] = newDevice;
        if (!excluir[data[i].vehicle]) {
            newDevice.setMap(map);
        }
    }
    console.log(flota);
});

$(document).on("change", "#flota", function () {
    borrarClientes();
    var selected = $(this).val();
    $.each(flota, function (key, value) {
        if (selected === 'all' && excluir[key]) {
            excluir[key] = null;
            value.setMap(map);
        } else if (key !== selected) {
            excluir[key] = value;
            value.setMap(null);
        } else {
            socket2.emit('clientes', selected);
            excluir[key] = null;
            value.setMap(map);
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
            icon: '/imgs/cliente.png',
            map: map
        });
        clientes.push(cliente);
    }
//    var markerCluster = new MarkerClusterer(map, clientes, {
//        minimumClusterSize: 2,
//        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
//    });
});

function borrarClientes() {
    if (clientes.length) {
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