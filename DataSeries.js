import React, { Component } from 'react'
import * as d3 from "d3";
import Line from './Line'
import Dots from './Dots'
import Grid from './Grid'
import Axis from './Axis'
import $ from 'jquery'

export default class DataSeries extends Component {

tellPos(p){
  this.curx=p.pageX;
  this.cury=p.pageY;
  }


constructor(props) {
  super(props);
   addEventListener('mousemove', this.tellPos, false);
  this.state={tooltip:{ display:false,data:{key:'',value:''}}};
  //console.log(this)
}

  static get defaultProps()  {
    return {
      data:               {},
      interpolationType:  'cardinal',
      colors:             d3.schemeCategory10
      
    }
  }


isString(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}

encode(string) {
  var number = "";
  var length = string.length;
  for (var i = 0; i < length; i++)
    number += string.charCodeAt(i).toString(10);
  return parseInt(number[3]);
}

  showToolTip(e){
    //e.target.setAttribute('fill', '#FFFFFF');

    /*
    state={tooltip:{
      display:true,
      data: {
        key:e.target.getAttribute('data-key'),
        value:e.target.getAttribute('data-value')
      },
      pos:{
        x:e.target.getAttribute('cx'),
        y:e.target.getAttribute('cy')
      }

    }};
    */

    $(".tooltip").css({display:"block",
        top:cury+"px",
        left:curx+"px"
      });

    $(".tooltip").find( "#keyfield" ).text(e.target.getAttribute('data-key'));
    $(".tooltip").find( "#valuefield" ).text(e.target.getAttribute('data-value'));
  }

  hideToolTip(e){

    //e.target.setAttribute('fill', '#7dc7f4');

    $(".tooltip").css({display:"none"});
      
  }

  render() {

    let { data, colors, xScale, yScale, interpolationType } = this.props;

    let line = d3.line()
    .x((d) => { return xScale(d.x); })
    .y((d) => { return yScale(d.y); });
    console.log(this.props)

    let lines = Object.keys(data).map((series, id) => {
      console.log(series)
      return (
      <Line
      path={line(data[series])}
      seriesName={series.name}
      stroke={colors[this.encode(series)]}
      key={id}
      />
      );
    });

    let dots = Object.keys(data).map((series, id) => {

      return (
      <Dots data={data[series]} x={xScale} y={yScale} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip}/>
      );
    });



    return (
    <g transform={this.props.transform}>
    <Grid h={this.props.h} grid={this.props.grid} gridType="y"/>
    <Axis h={this.props.h} axis={this.props.yAxis} axisType="y" />
    {lines}
    {dots}
    
    </g>

    );
  }

}