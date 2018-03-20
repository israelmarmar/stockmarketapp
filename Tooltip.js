import React, { Component } from 'react'

export default class Tooltip extends Component {
  propTypes: {
    tooltip:React.PropTypes.object
  }

  render(){

    var visibility="hidden";
    var transform="";
    var x=0;
    var y=0;
    var width=150,height=70;
    var transformText='translate('+width/2+','+(height/2-5)+')';
    var transformArrow="";


    var stl= {display: "none"};

    return (

      <div className="tooltip" style={ stl}>
      <g>
      <rect className="shadow" rx="5" ry="5" fill="#6391da" opacity=".9"></rect>
      <polygon className="shadow" is points="10,0  30,0  20,10" transform={transformArrow}
      fill="#6391da" opacity=".9"></polygon>
      <text is  transform={transformText}>
      <tspan is x="0" id='keyfield' textAnchor="middle" fontSize="15px" fill="#ffffff"></tspan><br />
      <tspan is x="0" id='valuefield' textAnchor="middle" dy="25" fontSize="20px" fill="#a9f3ff"></tspan>
      </text>
      </g>
      </div>
      );
  }
}