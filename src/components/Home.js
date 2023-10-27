import React from 'react';

import Notes from './Notes';
const Home = (props) => {
  const {showalert} = props;
  return (
    <div >
      
      <Notes showalert = {showalert} />
    </div>
  )
}
export default Home