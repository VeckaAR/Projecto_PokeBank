
//var pswd = [1244,1234];

var formulario = document.getElementById('formcenter')[0],
elementos = formulario.elements;
boton = document.getElementById('btn');

var validarPin = function(){
    
    for(var user in usuarios ){
        if (formulario.pin.value == usuarios[user][1]) {

            alert("entro"+ usuarios[user]);
        
        }
        else{
            alert("No es el pin");
            return;
        }
    return;
    }
}
var validar = function(){
    validarPin();
}
formulario.addEventListener("submit", validar);

