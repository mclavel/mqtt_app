  //Using the HiveMQ public Broker, with a random client Id
 var client = new Messaging.Client("broker.mqttdashboard.com", 8000, "USER_ID_" + parseInt(Math.random() * 100, 10));
 var msj_rec = 0;
 var msj_env = 0;

 var cant_msj = 1000;

 //Gets  called if the websocket/mqtt connection gets disconnected for any reason
 client.onConnectionLost = function (responseObject) {
     //Depending on your scenario you could implement a reconnect logic here
     //alert("Conexión Perdida: " + responseObject.errorMessage);
 };

 //Gets called whenever you receive a message for your subscriptions
 client.onMessageArrived = function (message) {
     //Do something with the push message you received
     $('#mensajes').append('<span>Topico: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>');
     msj_rec = msj_rec+1;
     console.log("msj_rec:" + msj_rec);
     if(msj_rec==cant_msj){
       msj_rec=0;
       finish_test();
     }
 };

 //Creates a new Messaging.Message Object and sends it to the HiveMQ MQTT Broker
 var publish = function (payload, topic, qos) {
     //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
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
