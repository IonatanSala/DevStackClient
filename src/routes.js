import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './App';
import SignIn from './authentication/signin/SignIn';
import SignUpContainer from './authentication/signup/SignUpContainer';
import SignOut from './authentication/signout/SignOut';
import RequireAuth from './authentication/RequireAuth';
import AuthorizationHOC from './components/HOC/RequireAuthorization';
import LandingPageContainer from './components/landing-page/LandingPageContainer'
import DashboardContainer from './components/dashboard/DashboardContainer';
import ProfileContainer from './components/dashboard/home/ProfileContainer';
import EditProfileContainer from './components/dashboard/home/EditProfileContainer';
import Stories from './components/dashboard/stories/Stories';
import CreateStory from './components/dashboard/stories/create_story/CreateStory';
import StoriesListContainer from './components/dashboard/stories/stories_list/StoriesListContainer';
import StoryContainer from './components/dashboard/stories/stories_list/StoryContainer';
import EditStoryContainer from './components/dashboard/stories/edit_story/EditStoryContainer';
import OpportunityContainer from './components/dashboard/opportunities/opportunity/OpportunityContainer';
import OpportunitiesContainer from './components/dashboard/opportunities/OpportunitiesContainer';
import OpportunityWizardFormContainer from './components/dashboard/opportunities/create_opportunity/OpportunityWizardFormContainer';
import OpportunitiesListContainer from './components/dashboard/opportunities/opportunities_list/OpportunitiesListContainer';
import EditOpportunityContainer from './components/dashboard/opportunities/edit_opportunity/EditOpportunityContainer';
import MyAppliedPositionsContainer from './components/jobs/MyAppliedPositionsContainer';
import JobsContainer from './components/jobs/JobsContainer';
import JobsListContainer from './components/jobs/JobsListContainer';
import NotFound from './components/404/NotFound';


const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={LandingPageContainer} />
    <Route path="signin" component={SignIn} />
    <Route path="signup" component={SignUpContainer} />
    <Route path="signout" component={SignOut} />
    <Route path="dashboard" component={RequireAuth(DashboardContainer)} >
      <IndexRoute component={ProfileContainer} />
      <Route path="profile/edit" component={EditProfileContainer} />
      <Route path="my-applied-positions" component={MyAppliedPositionsContainer} />
      <Route path="stories" component={AuthorizationHOC({ isEmployer: false })(Stories)} >
        <IndexRoute component={StoriesListContainer} />
        <Route path="new" component={CreateStory} />
        <Route path=":id" component={StoryContainer} />
        <Route path=":id/edit" component={EditStoryContainer} />
      </Route>
      <Route path="opportunities" component={AuthorizationHOC({ isEmployer: true })(OpportunitiesContainer)} >
        <IndexRoute component={OpportunitiesListContainer} />
        <Route path="new" component={OpportunityWizardFormContainer} />
        <Route path=":id" component={OpportunityContainer} />
        <Route path=":id/edit" component={EditOpportunityContainer} />
      </Route>
    </Route>
    <Route path="jobs" component={JobsContainer} >
      <IndexRoute component={JobsListContainer} />
      <Route path=":id" component={OpportunityContainer} />
    </Route>
    <Route path="404notfound" component={NotFound} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
