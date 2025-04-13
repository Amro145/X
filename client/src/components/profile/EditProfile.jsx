import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPassword, editProfile } from "../../../store (3)/api/userApi";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const { userData, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userName: userData.userName,
    email: userData.email,
    bio: userData.bio,
    link: userData.link,
    password: "",
    oldPassword: "",
  });

  const PasswordData = {
    password: formData.password, // Fixed: Removed [0]
    oldPassword: formData.oldPassword, // Fixed: Removed [0]
  };

  const cleanData = {
    userName: formData.userName.toString(),
    email: formData.email.toString(),
    bio: formData.bio.toString(),
    link: formData.link.toString(),
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = (data) => {
    dispatch(editProfile(data));
    console.log(data);
  };

  const handleUpdatePassword = (data) => {
    dispatch(editPassword(data));
  };

  return (
    <div className="pl-10 mt-10">
      <button
        className="btn btn-outline px-10 btn-sm w-auto rounded-2xl"
        onClick={() =>
          document.getElementById("edit_profile_modal").showModal()
        }
      >
        Edit profile
      </button>
      <button
        className="btn btn-outline px-10 btn-sm w-auto rounded-2xl"
        onClick={() =>
          document.getElementById("edit_profile_password").showModal()
        }
      >
        Edit Password
      </button>
      <dialog id="edit_profile_modal" className="modal">
        <div className="main bg-black p-10 border border-gray-700 rounded-2xl ">
          <div className="py-5">
            <h1 className="font-bold">Update Profile</h1>
          </div>
          <div className="form flex ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProfile(cleanData);
              }}
            >
              <div className="one flex gap-5 my-2 ">
                <input
                  type="text"
                  placeholder="Email"
                  className="flex-1 input border border-gray-700 rounded p-2 input-md"
                  value={formData.email}
                  name="email"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Link"
                  className="flex-1 input border border-gray-700 rounded p-2 input-md"
                  value={formData?.link}
                  name="link"
                  onChange={handleInputChange}
                />
              </div>
              <div className="tow flex gap-5 my-2">
                <input
                  type="text"
                  placeholder="user Name"
                  className="flex-1 input border border-gray-700 rounded p-2 input-md"
                  value={formData.userName}
                  name="userName"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Bio"
                  className="flex-1 input border border-gray-700 rounded p-2 input-md"
                  value={formData?.bio}
                  name="bio"
                  onChange={handleInputChange}
                />
              </div>
              <button
                className="btn btn-primary rounded-full btn-sm text-white"
                onClick={() => {
                  error ? (
                    <div className="text-red-500">{error}</div>
                  ) : (
                    navigate("/")
                  );
                }}
              >
                Update
              </button>
              {error && <div className="text-red-500">{error}</div>}
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop ">
          <button className="outline-none">close</button>
        </form>
      </dialog>
      <dialog id="edit_profile_password" className="modal z-10">
        <div className="main bg-black p-10 border border-gray-700 rounded-2xl ">
          <div className="py-5">
            <h1 className="font-bold">Update password</h1>
          </div>
          <div className="form flex ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdatePassword(PasswordData);
              }}
            >
              <div className="tow flex gap-5 my-2">
                <input
                  type="password"
                  placeholder="Old Password"
                  className="flex-1 input border border-gray-700 rounded p-2 input-md"
                  value={formData?.oldPassword}
                  name="oldPassword"
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="flex-1 input border border-gray-700 rounded p-2 input-md"
                  value={formData.password}
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary rounded-full btn-sm text-white">
                Update Password
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="outline-none  w-full ">close</button>
        </form>
      </dialog>
    </div>
  );
}

export default EditProfile;
