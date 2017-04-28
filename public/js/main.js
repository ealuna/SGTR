var socket = io.connect('192.168.1.203:8027/mapa', {'forceNew': true});

var map;
var device;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -11.970892, lng: -77.071365},
        zoom: 12
    });
}

socket.on('mapa', function (data) {    
    var device = new google.maps.Marker({
        position: data.position,
        map: map,
        title: data.status
    });
});

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
//    socket.emit('new-message', message);
//    return false;
//}

