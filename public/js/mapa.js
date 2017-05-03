var socket = io.connect('192.168.1.203:8027/mapa', {'forceNew': true});
var socket2 = io.connect('192.168.1.203:8027/clientes', {'forceNew': true});

var map;
var device = [];
var clientes = new google.maps.Marker();


socket2.emit('clientes', '588');

//function initMap() {
//    map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: -11.970892, lng: -77.071365},
//       zoom: 12
//   });
//} 
$(document).ready(function () {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -11.970892, lng: -77.071365},
        zoom: 12
    });
});

socket.on('mapa', function (data) {
    var newDevice = new google.maps.Marker({
        position: data.position,
        title: data.status
    });
    if(device.length === 0){
        device.push(newDevice);
        newDevice.setMap(map);
    }else{
        device[device.length-1].setMap(null);
        device.push(newDevice);
        newDevice.setMap(map);
    }
    console.log(data.position);
});

socket2.on('cli', function (data) {
    //console.log(data);
    for (var i = 0; i < data.length; i++) {
        var cliente = new google.maps.Marker({
            position: {lat: parseFloat(data[i].YCoord)
                , lng: parseFloat(data[i].XCoord)},
            title: data[i].nombreCliente,
            icon: '/imgs/cliente.png'
        });
        cliente.setMap(map);
    }
});


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

