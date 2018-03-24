import React, { Component } from 'react'
import * as d3 from "d3";
import Tooltip from './Tooltip'
import LineChart from './LineChart'
import axios from 'axios'

export default class Chart extends Component {

  encode(string) {
  var number = "";
  var length = string.length;
  for (var i = 0; i < length; i++)
    number += string.charCodeAt(i).toString(10);
  return parseInt(number[3]);
}

    constructor(props) {
    super(props);
    var obj=JSON.stringify(this.props.data);
      this.state={data: obj};
    }

    static get defaultProps() {
      return {
      colors: d3.schemeCategory10
      }
      this.componentDidMount = this.componentDidMount.bind(this);
    }

   
    delete(evt){
      var json=JSON.parse(this.state.data);
      console.log(this.state.data);
      console.log(evt)
      delete json[evt.target.id];
      this.setState({ data: JSON.stringify(json)});
      window.localStorage.setItem("codes", JSON.stringify(Object.keys(json)));

    }

    insert(){
      console.log(this)
      var json=JSON.parse(this.state.data);
      var th=this;
      axios.get("/apijson?codes[]="+document.getElementById('textfield').value)
      
      .then(function(result) {    
        var key=Object.keys(result.data)[0];
        console.log(result)
        json[key]=result.data[key];
        th.setState({ data: JSON.stringify(json)});  
        window.localStorage.setItem("codes", JSON.stringify(Object.keys(json)));
      })

    }

    render() {
      const {colors} = this.props;
      console.log(this.state);
      var data=JSON.parse(this.state.data);

      var labels = Object.keys(data).map((d,id) => {
        console.log(d)
        return (<div className="label" style={{color: colors[this.encode(d)]}}>{d}<button id={d} onClick={(event) =>this.delete(event)} className="close">×</button></div>);
      });

      console.log(data);
      return (
      <div style={{height: "0px"}}>
      <Tooltip />
      <LineChart data={data} width={this.props.width}
      height={this.props.height}/>
      <div className="labels">
      {labels}

      </div>

      <div className="add">
      <input id="textfield" className="form" type="text" placeholder="Add a new thing here." />
      <button className="btn" onClick={() => this.insert()}>Add New</button>
      </div>

      </div>

      );
    }

  }