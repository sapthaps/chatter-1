import React from "react";
import Avatar from "react-avatar";

const UserAvatar = ({ userData, size }) => {
  return (
    <Avatar
      src={userData?.avatar}
      name={userData?.username}
      size={size}
      textSizeRatio={2}
      round={true}
      className="cursor-pointer hover:opacity-90"
    />
  );
};

export default UserAvatar;
