import React from 'react';
import JobsList from './JobsList';

const MyAppliedPositions = (props) => {
  return (
    <JobsList opportunities={props.myAppliedPositions} myAppliedPositions/>
  )
}

export default MyAppliedPositions;
