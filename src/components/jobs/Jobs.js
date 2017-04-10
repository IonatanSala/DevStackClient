import React from 'react';

const Jobs = (props) => {
  return (
    <section className="jobs-container">
      {props.children}
    </section>
  );
}

export default Jobs;
