import React from "react";
import { connect } from "react-redux"
import Navigation from "../Navigation";
import StatTable from "../tables/StatTable";

class StatisticsPage extends React.Component {

  render() {
    /* this will require me to difine a shape on PropTypes  */
    // eslint-disable-next-line
    const { statistics, selectors } = this.props
    if(statistics.fetching){
      return(
        <div>
        <Navigation />
          <h2>Loading...</h2>
        </div>
      )
    }
    if(!statistics.fetched){
      return(
        <div>
          <Navigation />
          <div className="error">
            <h1>Fail to get Data from API.</h1>
            <h1>API might be down</h1>
          </div>
        </div>
      )
    }
    return(
      <div>
        <Navigation />
        <StatTable
          proposals = { statistics.data.proposals }
          targets = { statistics.data.targets }
          semester = { selectors.selectedSemester }
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      );
    }
  }



export default connect(
  store => ({statistics: store.statistics, selectors:store.selectors}),null
)(StatisticsPage) ;
