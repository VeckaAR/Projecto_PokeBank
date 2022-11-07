//var usuario=[];
var transaccion=[];
var valores = window.location.search;
const urlParams = new URLSearchParams(valores);

var pin =  urlParams.get('pin');

if(localStorage.getItem("pagos")!=null){
    
   transaccion =  JSON.parse(localStorage.getItem("pagos"));
} if(localStorage.getItem("depositos") !=null){
    transaccion = JSON.parse(localStorage.getItem("depositos"));
}if(localStorage.getItem("retiros") !=null){
    transaccion = JSON.parse(localStorage.getItem("retiros"));
}

//usuario.push(["Karla Bonilla", 1234, 200,22446688]);
//usuario.push(["Daniel Bonilla", 1244, 100,88991177]);
//usuario.push(["Ronald Bonilla", 1214, 500,11001100]);

/* metodo para datos*/  

    
        
    for( var user in usuario){
        
     if (pin == usuario[user][1]){
    document.getElementById("nombreCliente").innerHTML= "Nombre Cliente: "+usuario[user][0];
    document.getElementById("numeroDeCuenta").innerHTML= "Numero de Cuenta: "+usuario[user][3]
        
        break;
     }  
    }

/* metodo para saldo*/
for( var user in usuario){
        
    if (pin == usuario[user][1]){
   document.getElementById("SaldoActu").innerHTML= "$"+usuario[user][2];
          
       break;
    }  
   }




/* metodo para retirar*/
var retiros = function(){
    var retiro = document.getElementById("valorRetiro").value;    
    if(retiro != "0" && retiro != "" ){   
    for( var user in usuario){
     if (pin == usuario[user][1]){
       if (usuario[user][2]>0 && retiro<=usuario[user][2]){
            usuario[user][2] = usuario[user][2] - parseInt(retiro);
            //usuario,tipotransaccio, valor transaccion, saldo actual
            transaccion.push([usuario[user][0],"Retiro", "$"+retiro, "$"+usuario[user][2],"Su retiro es de: "+"$"+retiro]);  
            alert("Transacción realizada con exito");
            genera_tabla();
            localStorage.setItem("retiros",JSON.stringify(transaccion));
        }else{
            alert("Fondos insuficientes");
        }  
        break;
     }  
    }
}else{
    alert("Por Favor ponga un monto para la transaccion")
}
}
var retirar = function(){
    retiros();
}

/* metodo para depositar*/
var depositos = function(){
    
    var deposito = document.getElementById("valorDeposito").value;  
    if(deposito === "0" || deposito ==="" ){ 
        alert("Por Favor ponga un monto para la transaccion")
       
    }else{
        for( var user in usuario){
            if (pin == usuario[user][1]){
                if(usuario[user][2]>0 && deposito<=usuario[user][2]){
                    usuario[user][2] = usuario[user][2] + parseInt(deposito);
                    //usuario,tipotransaccio, valor transaccion, saldo actual
                    transaccion.push([usuario[user][0],"Deposito", "$"+ deposito, "$"+usuario[user][2],"Su deposito es de $"+deposito]);  
                    alert("Transacción realizada con exito");
                    genera_tabla();
                    localStorage.setItem("depositos",JSON.stringify(transaccion));
                }else{
                    alert("Fondos insuficientes");
                }  
                break;
            }  
        }
        
    }
    
}
var depositar = function(){
    depositos();
}

/* Pago de servicios */

var pagos = document.getElementById("servicios");
pagos.addEventListener("change", function() {
    console.log(pagos.value)
});



var pagos = function(){
    
    var pago = document.getElementById("valorPago").value; 
    if(pago === "0" || pago ==="" ){ 
        alert("Por Favor ponga un monto para la transaccion")  
         }else{   
            for( var user in usuario){
                if (pin == usuario[user][1]){
                   if(usuario[user][2]>0 && pago<=usuario[user][2]){
                       usuario[user][2] = usuario[user][2] - parseInt(pago);
                       //usuario,tipotransaccio, valor transaccion, saldo actual
                       transaccion.push([usuario[user][0],"Retiro", " $"+pago, "$"+usuario[user][2],"Pago de factura "+servicios.value+" $"+pago]);  
                       
                       alert("Transacción realizada con exito");
                       genera_tabla();
                       localStorage.setItem("pagos",JSON.stringify(transaccion));
                       
                       
                       }else{
                       alert("Fondos insuficientes");
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









