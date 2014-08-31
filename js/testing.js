var finish_test = function(){
  client.disconnect();
  msj_env=0;
  $('#estado').html("");
  //$('#estado').append('<center><h1>########### FIN COMUNICACION ###########</h1></center><br/>');
  alert("Listo");
}
//Test 1 evalua la cantidad de tráfico generado y la cantidad de procesamiento que se necesita para enviar 1000
//cadenas de texto, solo enviando el texto (no suscrito) con una calidad de servicio qs.
var test1 = function (qs) {
    var run_test_1 = function(qs){

      for (var i = 0; i < cant_msj; i++) {
        setTimeout(function(j) { publish("hola mundo "+j,'test1/',qs); }, delay*i, i);
      }

      $('#estado').html("");
      //$('#estado').append('<center><h1>########### FIN ENVIO TEST 1 ###########</h1></center><br/>');
    }
    $('#mensajes').html("");
    $('#estado').append('<center><h1>########### INICIO TEST 1 ###########</h1></center><br/>');

    var options = {
      timeout: 7,
      onSuccess: function () {
        run_test_1(qs);
        },
      onFailure: function (message) {
        alert("Error conexion: " + message.errorMessage);
        }
      };
    client.connect(options);
}


//Test 2 evalua la cantidad de tráfico generado y la cantidad de procesamiento que se necesita para enviar 1000
//cadenas de texto, enviando el texto a un tópico en cuestion y estando suscrito al mismo (con diversas qs).
var test2 = function (qs_env, qs_rec) {
    var run_test_2 = function(qs_env){

      for (var i = 0; i < cant_msj; i++) {
        setTimeout(function(j) { publish("hola mundo "+j,'test2/',qs_env); }, delay*i, i);
      }

      $('#estado').html("");
      $('#estado').append('<center><h1>########### FIN ENVIO TEST 2 ###########</h1></center><br/>');
    }
    $('#mensajes').html("");
    $('#estado').html("");
    $('#estado').append('<center><h1>########### INICIO TEST 2 ###########</h1></center><br/>');

    var options = {
      timeout: 7,
      onSuccess: function () {
        client.subscribe('test2/#', {qos: qs_rec});
        run_test_2(qs_env);
        },
      onFailure: function (message) {
        alert("Error conexion: " + message.errorMessage);
        }
      };
    client.connect(options);
}
