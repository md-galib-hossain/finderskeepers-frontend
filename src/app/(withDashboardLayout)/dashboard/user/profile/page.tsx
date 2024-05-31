"use client";

import React, { useState } from 'react';
import SubNavbar from "./components/SubNavbar";
import UserFoundItems from './components/my-founditems/page';
import UserLostItems from './components/my-lostitems/page';
import UserClaims from './components/claims/page';

// import UserClaims from "../my-claims/page";

const UserProfile = () => {
  const [view, setView] = useState('lostItems');

  const renderView = () => {
    switch (view) {
      case 'foundItems':
        return <UserFoundItems />;
      case 'claims':
        return <UserClaims />;
      case 'lostItems':
      default:
        return <UserLostItems />;
    }
  };

  return (
    <>
      <SubNavbar activeButton={view} setView={setView} />
      {renderView()}
    </>
  );
};

export default UserProfile;
