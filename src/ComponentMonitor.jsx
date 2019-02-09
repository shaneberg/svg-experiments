import React, { Component } from 'react';
import MetadataSliders from './MetadataSliders';
import './ComponentMonitor.css'

class ComponentMonitor extends Component {

  render() {

    let sliderProps = {};
    let checkboxProps = {};

    Object.keys(this.props.subject.props).map((fieldName) => {
      const val = this.props.subject.props[fieldName];
      const type = (typeof val);
      switch (type) {
        case "number":
          sliderProps[fieldName] = val;
          break;
        case "boolean":
          checkboxProps[fieldName] = val;
          break;
        default:
          // Ignore unknown types
          break;
      }
      return null;
    });


    return (
      <div className="container">
        <div className="slider-pane">
          <MetadataSliders
            title="props"
            onChange={this.props.onChange}
            metadata={sliderProps}
            mins={this.props.mins}
            maxes={this.props.maxes}
          />
        </div>
      </div>
    );
  }
}

export default ComponentMonitor;
