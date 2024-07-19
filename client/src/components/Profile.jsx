import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {

  const [userInfo,setUser ] = useState(null)
  const { user } = useAuth();

  

  return (
    <div className="text-white">
      Profile
    <h1>{user? user.email : "no data "}</h1>
    </div>
  );
};

export default Profile;
