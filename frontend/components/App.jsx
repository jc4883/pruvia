import React from 'react';
import { Provider } from 'react-redux';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Splash from './splash/splash';
import LogInFormContainer from './session_form/login_form_container';
import SignUpFormContainer from './session_form/signup_form_container';
import CareSelectForm from './care_select/care_select_form';
import ScheduleContainer from './schedule/schedule_container';
import IndexContainer from './index/index_container';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/" component={Splash}/>
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      {/* both logged in and loggout out users can access*/}
      <Route path="/care_select" component={CareSelectForm} />
      <Route path="/schedule" component={ScheduleContainer} />
      <ProtectedRoute exact path="" component={IndexContainer}/>

    </Switch>
    
    
  </div>
);

export default App;




