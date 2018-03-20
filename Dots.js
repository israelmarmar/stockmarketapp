import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import * as d3 from "d3";


export default class Dots extends Component {
  render(){
    var _self=this;
    var data=this.props.data.splice(1);
//remove last & first pointvar data=this.props.data.splice(1);
data.pop();
var circles=data.map(function(d,i){
  return (<circle r="7" cx={_self.props.x(d.x)} cy= {_self.props.y(d.y)} fill="transparent"
    onMouseOver={_self.props.showToolTip} onMouseOut={_self.props.hideToolTip}
    key={i}  data-key={d3.timeFormat("%b %e %Y")(d.x)} data-value={d.y}/>);
  });return(
  <g>
  {circles}
  </g>
  );
}


}
