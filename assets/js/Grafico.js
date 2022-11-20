
/*Graficos*/
  // Obtener una referencia al elemento canvas del DOM
  const $grafica = document.querySelector("#grafica");
  // Las etiquetas son las que van en el eje X. 
  const etiquetas = ["Pago", "Depositos", "Retiros",]
  // Podemos tener varios conjuntos de datos. Comencemos con uno
  const datosTransacciones = {
      label: "Graficos de Transacciones",
      data: [localStorage.getItem("TotalPagos"), localStorage.getItem("TotalDepositos"), localStorage.getItem("TotalRetiros"),], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
       // Color de fondo
      borderColor: 'rgba(54, 162, 235, 1)',
      // Color del borde
      borderWidth: 1,// Ancho del borde
  };
  new Chart($grafica, {
      type: 'bar',// Tipo de gráfica
      data: {
          labels: etiquetas,
          datasets: [
            datosTransacciones,
              // Aquí más datos...
          ]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }],
          },
      }
  });