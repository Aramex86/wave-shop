import React, { useEffect } from 'react';
import axios from 'axios'

function App() {


  useEffect(() => {
   
    axios.get('http://localhost:3002/api/product/brands').then(res=>{
      console.log(res);
    })
    axios.get('http://localhost:3002/api/product/woods').then(res=>{
      console.log(res);
    })

  }, []);
  return (
    <div className="App">
     <h1>WAVES</h1>
    </div>
  );
}

export default App;
