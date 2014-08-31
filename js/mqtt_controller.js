var msj_rec = 0;
var msj_env = 0;
var delay = 250;
//var server = "204.87.169.95"
var server = "192.168.0.24"
var cant_msj = 1000;

var client = new Messaging.Client(server, 80, "USER_ID_" + parseInt(Math.random() * 100, 10));

client.onConnectionLost = function (responseObject) {
  //alert("Conexión Perdida: " + responseObject.errorMessage);
};

client.onMessageArrived = function (message) {
    $('#mensajes').append('<span>Topico: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>');
    msj_rec = msj_rec+1;
    console.log("msj_rec:" + msj_rec);
    if(msj_rec==cant_msj){
    msj_rec=0;
    finish_test();
    }
};

var publish = function (payload, topic, qos) {
    var message = new Messaging.Message(payload);
    message.destinationName = topic;
    message.qos = qos;
    client.send(message);
    msj_env = msj_env+1;
    console.log("msj_env:" + msj_env);
    if(msj_env==cant_msj){
    msj_env=0;
    }
}
