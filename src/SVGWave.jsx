import React, { Component } from 'react';
import Slider from 'rc-slider';
import './SVGWave.css'
import 'rc-slider/assets/index.css';
import MetadataRenderer from './MetadataRenderer';

const minStroke = 2;
const maxStroke = 10;

const minPeriodWidth = 50;
const maxPeriodWidth = 150;

const minAmplitude = 50;
const maxAmplitude = 150;

class SVGWave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strokeWidth: minStroke,
      periodWidth: minPeriodWidth,
      amplitude: minAmplitude,
    };
  }

  handleAmplitudeChange(val) {
    this.setState({ amplitude: val });
  }

  handleWidthChange(val) {
    this.setState({ periodWidth: val });
  }

  handleStrokeChange(val) {
    this.setState({ strokeWidth: val });
  }
  render() {
    const padding = 2;

    const amplitude = this.state.amplitude;
    const height = amplitude * 2 + (padding * 2);
    const periodWidth = this.state.periodWidth;
    const strokeWidth = this.state.strokeWidth;
    const width = (periodWidth * 2) + (padding * 2) + (strokeWidth * 2);
    const startX = 0 + padding + strokeWidth;
    const startY = height / 2;

    // 1st control pt
    const dx1 = startX;
    const dy1 = startY + amplitude;

    // Destination
    const dx = startX + periodWidth;
    const dy = startY;

    // 2nd control pt
    const dx2 = dx;
    const dy2 = dy1;

    const metadata = this.state;

    const dProp =
      `M
      ${startX} ${startY}
      C
      ${dx1} ${dy1}
      ${dx2} ${dy2}
      ${dx} ${dy}
      S
      ${dx + periodWidth} ${startY + (startY - dy1)}
      ${dx + periodWidth} ${startY}`;
    return (
      // Need to return:
      <div className="container">
        <div className="slider-pane">
          stroke
          <Slider
            min={minStroke}
            max={maxStroke}
            onChange={this.handleStrokeChange.bind(this)}
          />
          <br></br>
          height
          <Slider
            min={minAmplitude}
            max={maxAmplitude}
            onChange={this.handleAmplitudeChange.bind(this)}
          />
          <br></br>
          width
          <Slider
            min={minPeriodWidth}
            max={maxPeriodWidth}
            onChange={this.handleWidthChange.bind(this)}
          />
        </div>
        <div className="data-pane">
          <MetadataRenderer
            metadata={metadata}
          />
        </div>
        <div className="content-pane">
          <svg height={height} width={width}>
            <rect
              height={height}
              width={width}
              stoke-width="2"
              stroke="#afafaf"
              fillOpacity={0.0}
            />
            <path
              class="wave"
              d={dProp}
              stroke="black"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default SVGWave;
