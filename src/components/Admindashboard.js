import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import profilesData from '../data/profiles.json';

const Admindashboard = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setProfiles(profilesData);
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {profiles.length > 0 ? (
        profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))
      ) : (
        <p>No profiles available.</p>
      )}
    </div>
  );
};

export default Admindashboard;
