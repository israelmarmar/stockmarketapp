import React, { Component } from 'react'

export default class Line extends Component {

  propTypes: {
    path:         React.PropTypes.string.isRequired,
    stroke:       React.PropTypes.string,
    strokeWidth:  React.PropTypes.number
  }

  static get defaultProps() {
    return {
      stroke:       'blue',
      fill:         'none',
      strokeWidth:  3
    }
  }

  render() {
    let {path, stroke, fill, strokeWidth } = this.props;
    return (

    <path
    d={path}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    />

    );
  }

}