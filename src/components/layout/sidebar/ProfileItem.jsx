import { useState } from "react";

import SettingsModal from "./SettingsModal";
import Avatar from "./ProfileAvatar";

const ProfileItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer hover:opacity-75 transition"
      >
        <Avatar />
      </div>
    </>
  );
};

export default ProfileItem;
