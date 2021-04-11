import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';



function App() {
  
   //state del formulario
   const [busqueda, guardarBusqueda] = useState({
    ciudad:'',
    pais:''
   });
   
   const [consultar, guardarConsultar] = useState(false);
   const [resultado, guardarResultado] = useState({});
   const [error, guardarError] = useState(false);

   const { ciudad, pais } = busqueda;

   useEffect(() => {
     const consultarAPI = async () => {
      if(consultar) {
        const appId = '7e222194aef2cade1b84b2f34f6ee88a';
        const url =  `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
 
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
 
        guardarResultado(resultado);
        guardarConsultar(false);

        // detectar si los resultados son correctos}
        if(resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
     
      }
      
     }
     consultarAPI();
     // eslint-disable-next-line
   }, [consultar]);

  let componente;
   if(error) {
     componente = <Error mensaje="No hay resultados" />

   } else {
     componente = <Clima 
     resultado={resultado}/>
   }

  
  return (
     <Fragment>
        <Header 
          titulo='Clima React App'
        />

        <div className="contenedor-form">
          <div className="container">
            <div className="row">
              <div className="col m6 s12">
                <Formulario 
                  busqueda={busqueda}
                  guardarBusqueda={guardarBusqueda}
                  guardarConsultar={guardarConsultar}

                />
              </div>
              <div className="col m6 s12">
                {componente}
              </div>
            </div>
          </div>
        </div>
     </Fragment>
  );
}

export default App;
