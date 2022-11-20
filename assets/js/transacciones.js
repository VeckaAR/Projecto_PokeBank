//var usuario=[];
var transaccion=[];
var valores = window.location.search;
const urlParams = new URLSearchParams(valores);
var TotalRetiro = 0;
var TotalDeposito = 0;
var TotalPago = 0;


var pin =  urlParams.get('pin');

if(localStorage.getItem("pagos")!=null){
    
   transaccion =  JSON.parse(localStorage.getItem("pagos"));
} if(localStorage.getItem("depositos") !=null){
    transaccion = JSON.parse(localStorage.getItem("depositos"));
}if(localStorage.getItem("retiros") !=null){
    transaccion = JSON.parse(localStorage.getItem("retiros"));
}




/* metodo para datos*/  

var entrar= false;


for( var user in usuario){
    
 if (pin == usuario[user][1]){
    document.getElementById("nombreCliente").innerHTML= "Nombre Cliente: "+usuario[user][0];
    document.getElementById("numeroDeCuenta").innerHTML= "Numero de Cuenta: "+usuario[user][3]
    entrar=true;
    break;
 }  
 
}
if(entrar==false){
    window.location.href="../login.html";
}


/* metodo para saldo*/
for( var user in usuario){
        
    if (pin == usuario[user][1]){
   document.getElementById("SaldoActu").innerHTML= "$"+usuario[user][2];
          
       break;
    }  
   }


   var numeros="0123456789";
   var bandera = false;

/* metodo para retirar*/
var retiros = function(){
    var retiro = document.getElementById("valorRetiro").value;
    bandera = validarcamponumerico(retiro);    
    if(retiro != "0" && retiro != "" ){   
    for( var user in usuario){
     if (pin == usuario[user][1]){
       if (usuario[user][2]>0 && retiro<=usuario[user][2]&& !bandera){
            usuario[user][2] = usuario[user][2] - parseInt(retiro);
            //usuario,tipotransaccio, valor transaccion, saldo actual
            data = [usuario[user][0],"Retiro", "$"+retiro, "$"+usuario[user][2],"Su retiro es de: "+"$"+retiro];
            transaccion.push(data);  
            swal("¡Pokefantástico!", "La transacción fue realizada con éxito", "success");
            message(data);
            imprimirTotal( usuario[user][2]);
            genera_tabla();
            
           
            localStorage.setItem("retiros",JSON.stringify(transaccion));
            TotalRetiro = parseFloat(retiro) + parseFloat(TotalRetiro);
            localStorage.setItem("TotalRetiros",TotalRetiro); 
          
            
           
           
            
        }else{
            if(bandera == false){
                swal("Oooh no", "Usted no posee fondos suficientes para realizar la operación", "error");
             }
             else{
                swal("Error", "El dato ingresado no es numerico", "error");
             }

        }  
        break;
     }  
    }
}else{
    swal("Operación incompleta", "Por Favor digite un monto para la transaccion", "warning");
}
}
var retirar = function(){
    retiros();
}

/* metodo para depositar*/
var depositos = function(){
    
    var deposito = document.getElementById("valorDeposito").value;
    bandera = validarcamponumerico(deposito);  
    if(deposito === "0" || deposito ==="" ){ 
        swal("Operación incompleta", "Por Favor digite un monto para la transaccioón", "warning");
       
    }else{
        for( var user in usuario){
            if (pin == usuario[user][1]){
                if(usuario[user][2]>0 && !bandera){
                    usuario[user][2] = usuario[user][2] + parseInt(deposito);
                    //usuario,tipotransaccio, valor transaccion, saldo actual
                    var data= [usuario[user][0],"Deposito", "$"+ deposito, "$"+usuario[user][2],"Su deposito es de $"+deposito];
                    transaccion.push(data);                     
                    swal("¡Pokefantástico!", "La transacción fue realizada con éxito", "success");
                    message(data);
                    imprimirTotal( usuario[user][2]);
                    genera_tabla();
                    
                    
                    localStorage.setItem("depositos",JSON.stringify(transaccion));
                    TotalDeposito = parseFloat(deposito) + parseFloat(TotalDeposito);
                    localStorage.setItem("TotalDepositos",TotalDeposito); 
                }else{
                    if(bandera == false){
                        swal("Oooh no", "No ha colocado una cantidad correcta", "error");
                     }
                     else{
                        swal("Error", "El dato ingresado no es numerico", "error");
                     }

                }  
                break;
            }  
        }
        
    }
    
}
function validarcamponumerico(textovalidar){
    
    for(i=0; i<textovalidar.length; i++){  //en vez de texto debes poner donde recibis el dato a evaluar
        if (numeros.indexOf(textovalidar.charAt(i),0)!=-1){        
            bandera = false;  
    
        }
        else{
            bandera = true;
            return bandera;
            
        }
     }
     return bandera;
}


var depositar = function(){
    depositos();
}


/* Pago de servicios */

var pagos = document.getElementById("servicios");
pagos.addEventListener("change", function() {
    console.log(pagos.value)
});



function imprimirTotal(){
    var divT = document.getElementById("SaldoActu");
    divT.replaceChildren("");
    var divTotal = document.createTextNode("$" + usuario[user][2]);
    divT.appendChild(divTotal);
}



var pagos = function(){
    
    var pago = document.getElementById("valorPago").value;
    bandera = validarcamponumerico(pago); 
    if(pago === "0" || pago ==="" ){ 
        swal("Operación incompleta", "Por Favor digite un monto para la transaccion", "warning"); 
         }else{   
            for( var user in usuario){
                if (pin == usuario[user][1]){
                   if(usuario[user][2]>0 && pago<=usuario[user][2]&& !bandera){
                       usuario[user][2] = usuario[user][2] - parseInt(pago);
                       //usuario,tipotransaccio, valor transaccion, saldo actual
                       var data = [usuario[user][0],"Retiro", " $"+pago, "$"+usuario[user][2],"Pago de factura "+servicios.value+" $"+pago];
                       transaccion.push(data);  
                       swal("¡Pokefantástico!", "La transacción fue realizada con éxito", "success");
                       message(data);
                       imprimirTotal( usuario[user][2]);
                       genera_tabla();
                       localStorage.setItem("pagos",JSON.stringify(transaccion));
                       TotalPago = parseFloat(pago) + parseFloat(TotalPago);
                       localStorage.setItem("TotalPagos",TotalPago); 
                       
                       
                       }else{
                        if(bandera == false){
                            swal("Oooh no", "Usted no posee fondos suficientes para realizar la operación", "error");
                         }
                         else{
                            swal("Error", "El dato ingresado no es numerico", "error");
                         }
                   }  
                   break;
                }  
               }
          } 
   
}
var pagar = function(){
    pagos();
}



/* metodo de la tabla*/
function genera_tabla() {
    var tblBody = document.getElementById("tbody");
    tblBody.replaceChildren("");
    for(var trans in transaccion){
        var hilera = document.createElement("tr");
        for(var i =0;i<5;i++){
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(transaccion[trans][i])
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            
        }

        tblBody.appendChild(hilera);
    }
  }

  /*metodo datos */
  function imprimir(dataImprimir) {

    var doc = new jsPDF(('p', 'pt', 'a02'));  
  
  //doc.text("Dato de Transaccion", 10,10)
 
  
  doc.text("Transaccion realizada",10,10);
  //doc.spacing(1);
  
  doc.text(dataImprimir,20,20);

  
  
  doc.save("T.pdf");
    
  }



  function message(dataEntry){
    swal("Transaccion Realizada con Exito, Desea Imprimirla?", {
        icon:"success",
        buttons: {
          ok: {
            text: "Imprimir",
            value: "imprimir",
          },
          catch: {
            text: "Continuar",
            value: "go",
          },
         
        },
      })
      .then((value) => {
        switch (value) {
       
          case "imprimir":
            imprimir(dataEntry);
            swal("El comprobante se ha impreso correctamente");
            
            break;
       
          case "go":
            swal({title: "Transaccion Exitosa",
            icon:"success"
        });
           
            break;
       
          default:
            swal("Hola XD!");
        }
      })
    }




