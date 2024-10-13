import React, { useState } from 'react';
import MapView from './MapView';

const ProfileCard = ({ profile }) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h2>{profile.name}</h2>
      <p>{profile.address}</p>
      <p>{profile.description}</p>
      <button onClick={() => setShowMap(!showMap)}>
        {showMap ? 'Hide Map' : 'Show Map'}
      </button>
      {showMap && <MapView address={profile.address} />}
    </div>
  );
};

export default ProfileCard;
