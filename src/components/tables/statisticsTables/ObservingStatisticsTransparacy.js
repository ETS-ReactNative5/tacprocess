import React from 'react'
import propTypes from 'prop-types'
import {ALL_PARTNER} from '../../../types'

function add(a, b) {
  return a + b
}

function setTransparency(proposals, partner) {
  const transparency = {
    clear: {
      timeRequests: 0,
      noOfProposals: 0
    },
    thin: {
      timeRequests: 0,
      noOfProposals: 0
    },
    thick: {
      timeRequests: 0,
      noOfProposals: 0
    },
    any: {
      timeRequests: 0,
      noOfProposals: 0
    }
  }
  proposals.forEach(p => {
    const reqTime = partner === ALL_PARTNER ? (Object.values(p.requestedTime.requests)||[]).reduce(add, 0) : p.requestedTime.requests[ partner ] || 0
    if (p.transparency === 'Clear'){
      transparency.clear.noOfProposals += 1
      transparency.clear.timeRequests += reqTime
    }
    if (p.transparency === 'Any'){

      transparency.any.noOfProposals += 1
      transparency.any.timeRequests += reqTime
    }
    if (p.transparency === 'Thick cloud'){
      transparency.thick.noOfProposals += 1
      transparency.thick.timeRequests += reqTime
    }
    if (p.transparency === 'Thin cloud'){
      transparency.thin.noOfProposals += 1
      transparency.thin.timeRequests += reqTime
    }
  })
  return transparency
}

const ObservingStatisticsTransparency = ({proposals, partner}) => {
  const transparency = setTransparency(proposals, partner)
  const totalReqTime = transparency.clear.timeRequests + transparency.thin.timeRequests +
    transparency.thick.timeRequests + transparency.any.timeRequests
  return (
    <div className='stat-item'>
      <table className='stat-table'>
        <thead>
          <tr>
            <th>Conditions</th>
            <th>Time requested (hrs)</th>
            <th>Number of Proposals</th>
            <th>Completion (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clear</td>
            <td>{ (transparency.clear.timeRequests / 3600).toFixed(2) }</td>
            <td>{ transparency.clear.noOfProposals }</td>
            <td>{ ((transparency.clear.timeRequests / totalReqTime) * 100).toFixed(1) }</td>
          </tr>
          <tr>
            <td>Thin cloud</td>
            <td>{ (transparency.thin.timeRequests / 3600).toFixed(2) }</td>
            <td>{ transparency.thin.noOfProposals }</td>
            <td>{ ((transparency.thin.timeRequests / totalReqTime) * 100).toFixed(1) }</td>
          </tr>
          <tr>
            <td>Thick cloud</td>
            <td>{ (transparency.thick.timeRequests / 3600).toFixed(2)}</td>
            <td>{ transparency.thick.noOfProposals }</td>
            <td>{ ((transparency.thick.timeRequests / totalReqTime) * 100).toFixed(1)}</td>
          </tr>
          <tr>
            <td>Any</td>
            <td>{ (transparency.any.timeRequests / 3600).toFixed(2) }</td>
            <td>{ transparency.any.noOfProposals }</td>
            <td>{ ((transparency.any.timeRequests / totalReqTime) * 100).toFixed(1) }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ObservingStatisticsTransparency.propTypes = {
  proposals: propTypes.array.isRequired,
  partner: propTypes.string.isRequired
}

export default ObservingStatisticsTransparency
