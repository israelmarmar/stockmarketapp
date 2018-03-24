import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Chart from './Chart'
import * as func from './funcs'




var tooltip={ display:false,data:{key:'',value:''}};
var codes;

if(localStorage.getItem("codes")!==null){
  console.log(window.localStorage.getItem("codes"));
  codes=JSON.parse(window.localStorage.getItem("codes"));
}
else
  codes=["MSFT","AMZN","GOOG","AAPL"];


var dt = {};

const parameterizeArray = (key, arr) => {
  arr = arr.map(encodeURIComponent)
  return '?'+key+'[]=' + arr.join('&'+key+'[]=')
}

var cds=parameterizeArray('codes', codes)
console.log(cds)

  axios.get("/apijson"+cds)

  .then(function(result) {    

    ReactDOM.render(<Chart data={result.data} width={1100} height={400} />, document.getElementById('container')); 

  })


