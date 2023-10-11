import React from "react";
import "./ProfileSide.css";
import Followers from "./Follwers";
import ProfileCard from "./ProfileCard";
const ProfileSide = () => {
    return (
        <div className="profileSide">
            <ProfileCard />
            <Followers />
        </div>
    );
};

export default ProfileSide;
