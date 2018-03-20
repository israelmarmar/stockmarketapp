import React, { Component } from 'react'
import DataSeries from './DataSeries'
import * as d3 from "d3";

export default class LineChart extends Component {

 
  static get defaultProps() {
    return {
      colors:             d3.schemeCategory10,
      width:  600,
      height: 300,
    }
  }

  isString(x){
  return Object.prototype.toString.call(x) === "[object String]"
  }

  render() {
    var {width, height, data} = this.props;

    var margin = {top: 5, right: 50, bottom: 20, left: 50},
    w = this.props.width - (margin.left + margin.right),
    h = this.props.height - (margin.top + margin.bottom);


    var key=Object.keys(data)[0];

    var parseDate = d3.timeParse("%Y-%m-%d");
    //var parseDate = d3.timeFormat("%d-%m-%Y").parse;

    if(this.isString(data[key][0].x))
      Object.keys(data).forEach(function (d) {
        data[d].forEach(function (dt) {
          dt.x = parseDate(dt.x);
        });
      });

      let xScale = d3.scaleTime()
      .domain(d3.extent(data[key], function (d) {
        return d.x;
      }))
      .rangeRound([0, w]);



      var max=0;
      Object.keys(data).forEach(function (d) {

        var dtmax=d3.max(data[d],function(i){
          return i.y;
        });

        if(dtmax>=max){
          key=d;
          max=dtmax;
        }

      });


      let yScale = d3.scaleLinear()
      .domain([0,d3.max(data[key],function(d){
        return d.y;
      })])
      .range([h, 0]);

      var yAxis = d3.axisLeft(yScale)
      .ticks(6);

      var yGrid = d3.axisLeft(yScale)
      .ticks(6)
      .tickSize(-w, 0, 0)
      .tickFormat("");

      return (

      <svg width={width} height={height}>

      <DataSeries
      xScale={xScale}
      yScale={yScale}
      data={data}
      width={width}
      height={height}
      h={h}
      w={w}
      yAxis={yAxis}
      grid={yGrid}
      transform={'translate(' + margin.left + ',' + margin.top + ')'}
      />
      </svg>
      );
    }

  };
