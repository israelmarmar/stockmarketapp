import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Chart from './Chart'
import * as func from './funcs'




var tooltip={ display:false,data:{key:'',value:''}};


  var codes;
  if(localStorage.getItem("codes")!==null)
    codes=JSON.parse(window.localStorage.getItem("codes"));
  else
    codes=["MSFT","AMZN","GOOG","AAPL"];


  var dt = {};

  codes.forEach(function(code,i){
    axios.get("/apijson?code="+code)
    
    .then(function(result) {    
      
      var key=Object.keys(result.data)[0];
      dt[key]=result.data[key];
      
    })

  })


  var interval = setInterval(function(){
    if(Object.keys(dt).length==codes.length){
      ReactDOM.render(<Chart data={dt} width={1100} height={400} />, document.getElementById('container')); 

      clearInterval(interval);
    }
    
  }, 100);


