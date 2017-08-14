import React from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';

import Axes from './axes';

/**
 * NumberAxisHistogram is a histogram chart whose x axis an axis for a continuous range of numbers.
 *
 * The following properties are supported:
 *
 * histogramDataSets: array
 *     An array of histogram data sets. Each array item is an object of the form { data, className } with data being a
 *     data entry as generated by D3's histogram layout and className the class name to add to the bars for the set.
 *
 * domain: array of two numbers
 *     The domain, i.e. the minimum and maximum x axis value.
 *
 * range: array of two numbers
 *     The range, i.e. the minimum and maximum y axis numbers.
 *
 * xTitle: string
 *     The title for the x axis. This is optional.
 *
 * yTitle: string
 *     The title for the y axisa. This is optional.
 *
 * width: number
 *     The width of the chart (including margins).
 *
 * height: number
 *     The height of the chart (including numbers).
 *
 * margins: object
 *     The plot margins around the axes, as an object with a top, right, bottom and left property. Default margins are
 *     used if this property isn't included.
 */

const defaultMargins = {
    top: 10,
    right: 10,
    bottom: 50,
    left: 50
};

const NumberAxisHistogram = ({histogramDataSets, domain, range, xTitle='', yTitle='', width, height, margins=defaultMargins}) => {
    const xScale = scaleLinear()
            .domain(domain)
            .range([margins.left, width - margins.right]);
    const yScale = scaleLinear()
            .domain(range)
            .range([height - margins.bottom, margins.top]);


    return (
            <g className="histogram">
                <Axes width={width}
                      height={height}
                      margins={margins}
                      domain={domain}
                      range={range}
                      xAxisTitle={xTitle}
                      yAxisTitle={yTitle}/>
                {histogramDataSets.map((histogramDataSet) => {
                    return histogramDataSet.data.map((d, i) => (
                            <rect key={i}
                                  className={histogramDataSet.className}
                                  x={xScale(d.x0)}
                                  y={yScale(d.length)}
                                  width={xScale(d.x1) - xScale(d.x0)}
                                  height={height - margins.bottom - yScale(d.length)}/>
                    ));
                })}
            </g>
    );
};

NumberAxisHistogram.propTypes = {
    histogramDataSets: PropTypes.array.isRequired,
    domain: PropTypes.array.isRequired,
    range: PropTypes.array.isRequired,
    xTitle: PropTypes.string,
    yTitle: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margins: PropTypes.object
};

export default NumberAxisHistogram;
