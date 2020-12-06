import React from 'react';
import SignIn from './SignIn'
import SignUp from './SignUp'

const Toppage: React.FC = () => {
  return (
      <div>
        <SignUp />
        <SignIn />
      </div>
  );
}

export default Toppage;
