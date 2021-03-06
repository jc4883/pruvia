import React from 'react';
import { Link } from 'react-router-dom';


class Splash extends React.Component {

  render() {
    return (
      <div>
        This is the splash page. :)
        <br/>
        <Link to={'/login'}> Sign in </Link>
        <br/>
        <Link to={'/signup'}> Sign up </Link>
        <br/>
        <Link to={'/care_select'}>Schedule a Meeting</Link>
        <br/>
        <Link to={'/doc_availability_form'}>Select Availability (for doctors)</Link>
      </div>
    )
  }
}


export default Splash;

