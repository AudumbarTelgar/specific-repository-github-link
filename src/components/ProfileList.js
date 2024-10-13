import React, { useState } from 'react';
import MapView from './MapView';
import './profilelist.css';

function ProfileList({ profiles, setProfiles }) {
  const [openMaps, setOpenMaps] = useState({});
  const [isEditing, setIsEditing] = useState(null); // Track which profile is being edited
  const [newProfile, setNewProfile] = useState({ name: '', description: '', address: '', lat: '', lng: '' });

  const toggleMap = (id) => {
    setOpenMaps((prevOpenMaps) => ({
      ...prevOpenMaps,
      [id]: !prevOpenMaps[id]
    }));
  };

  // Delete a profile
  const handleDelete = (id) => {
    const updatedProfiles = profiles.filter(profile => profile.id !== id);
    setProfiles(updatedProfiles);
  };

  // Update a profile (save edits)
  const handleSaveEdit = (id) => {
    const updatedProfiles = profiles.map((profile) => {
      if (profile.id === id) {
        return isEditing;
      }
      return profile;
    });
    setProfiles(updatedProfiles);
    setIsEditing(null); // Reset edit mode
  };

  // Handle form changes for adding a new profile
  const handleNewProfileChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  // Add a new profile
  const handleAddProfile = () => {
    const newId = profiles.length + 1; // Example way to generate a new ID
    setProfiles([...profiles, { ...newProfile, id: newId }]);
    setNewProfile({ name: '', description: '', address: '', lat: '', lng: '' }); // Clear the form
  };

  return (
    <div className="profile-list">
      <h2>Admin Panel - Manage Profiles</h2>

      {/* Form for adding a new profile */}
      <div className="add-profile-form">
        <h3>Add New Profile</h3>
        <input type="text" name="name" placeholder="Name" value={newProfile.name} onChange={handleNewProfileChange} />
        <input type="text" name="description" placeholder="Description" value={newProfile.description} onChange={handleNewProfileChange} />
        <input type="text" name="address" placeholder="Address" value={newProfile.address} onChange={handleNewProfileChange} />
        <input type="text" name="lat" placeholder="Latitude" value={newProfile.lat} onChange={handleNewProfileChange} />
        <input type="text" name="lng" placeholder="Longitude" value={newProfile.lng} onChange={handleNewProfileChange} />
        <button onClick={handleAddProfile}>Add Profile</button>
      </div>

      {profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        profiles.map((profile) => (
          <div key={profile.id} className="profile-card">
            {isEditing && isEditing.id === profile.id ? (
              // Edit mode: display form for editing profile
              <div className="edit-profile-form">
                <input
                  type="text"
                  name="name"
                  value={isEditing.name}
                  onChange={(e) => setIsEditing({ ...isEditing, name: e.target.value })}
                />
                <input
                  type="text"
                  name="description"
                  value={isEditing.description}
                  onChange={(e) => setIsEditing({ ...isEditing, description: e.target.value })}
                />
                <input
                  type="text"
                  name="address"
                  value={isEditing.address}
                  onChange={(e) => setIsEditing({ ...isEditing, address: e.target.value })}
                />
                <input
                  type="text"
                  name="lat"
                  value={isEditing.lat}
                  onChange={(e) => setIsEditing({ ...isEditing, lat: e.target.value })}
                />
                <input
                  type="text"
                  name="lng"
                  value={isEditing.lng}
                  onChange={(e) => setIsEditing({ ...isEditing, lng: e.target.value })}
                />
                <button onClick={() => handleSaveEdit(profile.id)}>Save</button>
                <button onClick={() => setIsEditing(null)}>Cancel</button>
              </div>
            ) : (
              // Normal mode: display profile data
              <>
                <h3>{profile.name}</h3>
                <p>{profile.description}</p>
                <p>{profile.address}</p>

                {/* Show Map Button */}
                <button onClick={() => toggleMap(profile.id)}>
                  {openMaps[profile.id] ? 'Hide Map' : 'Show Map'}
                </button>
                {openMaps[profile.id] && (
                  <div className="profile-map">
                    <MapView lat={profile.lat} lng={profile.lng} />
                  </div>
                )}

                {/* Edit and Delete Buttons */}
                <button onClick={() => setIsEditing(profile)}>Edit</button>
                <button onClick={() => handleDelete(profile.id)}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ProfileList;