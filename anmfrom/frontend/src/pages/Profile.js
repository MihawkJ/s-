// pages/Profile.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) return; // user undefined ise işlemi durdur
        const res = await axios.get(
          `http://localhost:5000/api/users/${user.id}`
        );
        setProfileData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [user]); // user değişkenini dependency array'e ekleyin

  if (!user) return <div>Giriş yapmalısınız!</div>; // user yoksa hata mesajı göster

  return (
    <div className="profile-page">
      <h1>Profilim</h1>
      {profileData ? (
        <div>
          <img src={profileData.profileImage} alt="Profil Resmi" />
          <h2>{profileData.username}</h2>
          <p>{profileData.email}</p>
        </div>
      ) : (
        <p>Profil yükleniyor...</p>
      )}
    </div>
  );
};

export default Profile;
