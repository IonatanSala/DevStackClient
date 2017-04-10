import React from 'react';
import Header from './dashboard_header/Header';
import Sidemenu from './dashboard_sidemenu/Sidemenu';

const Dashboard = (props) => (
  <section className="dashboard">
    <Header location={props.location} />
    <section className="dashboard-content">
      <Sidemenu user={props.user} location={props.location} />
      <main className="dashboard-main">
        {props.children}
      </main>
    </section>
  </section>
)

export default Dashboard;
