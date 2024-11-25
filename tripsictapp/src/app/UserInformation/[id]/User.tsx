import React, { useState, ChangeEvent, FormEvent } from "react";

interface UserInformationProps {
  userInfo: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
  };
  onUpdateUser: (updatedUserInfo: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
  }) => void;
}

const UserInformation: React.FC<UserInformationProps> = ({
  userInfo,
  onUpdateUser,
}) => {
  const [editableUserInfo, setEditableUserInfo] = useState(userInfo);

  const handleChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setEditableUserInfo({ ...editableUserInfo, [key]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdateUser(editableUserInfo);
  };

  return (
    <div>
      <h2>Edit User Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            First Name:
            <input
              type="text"
              value={editableUserInfo.firstName}
              onChange={handleChange("firstName")}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              value={editableUserInfo.lastName}
              onChange={handleChange("lastName")}
            />
          </label>
        </div>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={editableUserInfo.username}
              onChange={handleChange("username")}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={editableUserInfo.email}
              onChange={handleChange("email")}
            />
          </label>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserInformation;
