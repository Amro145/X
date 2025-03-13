import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/AuthStore";
function Singup() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
  });
  const cleanData = {
    userName: formData.userName[0],
    email: formData.email[0],
    password: formData.password[0],
  };
  const { singup, isSingingUp } = useAuthStore();

  const validateForm = () => {
    if (!cleanData.userName || !cleanData.userName.trim()) {
      // console.log("User Name is  Required!");
    } else if (!cleanData.email || !cleanData.email.trim()) {
      // console.log("Email  is  Required!");
    } else if (!cleanData.password) {
      // console.log("password  is  required!");
    } else if (cleanData.password.length < 6) {
      // console.log("password  is Too Short");
    } else {
      return true;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      singup(cleanData);
    }
  };
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };
  return (
    <div className="flex flex-col justify-center items-center md:grid md:grid-cols-12 md:gap-4  w-full h-screen overflow-hidden  ">
      {isSingingUp ? (
        <div className="flex justify-center h-full  items-center absolute top-40 left-1/2">
          <span className={`loading loading-spinner  w-10`} />
        </div>
      ) : (
        <>
          <div className="col-span-7 contents justify-center items-center md:flex md:h-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-twitter-x h-3/12 md:h-1/3 mb-10 md:mb-0 "
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </div>
          <div className=" col-span-12 flex flex-col justify-center md:col-span-5 ">
            <div className="title font-bold text-4xl mb-3 md:mb-10">
              Join today.
            </div>
            <form className="grid gap-6 overflow-hidden w-full md:w-auto  ">
              <label className="input input-bordered rounded flex items-center gap-2">
                <MdOutlineMail />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input"
                  value={FormData.email}
                  onChange={handleOnChange}
                />
              </label>
              <label className="input input-bordered rounded flex items-center gap-2">
                <FaUser />
                <input
                  type="text"
                  placeholder="User Name"
                  className="input"
                  value={FormData.userName}
                  name="userName"
                  onChange={handleOnChange}
                />
              </label>
              <label className="input input-bordered rounded flex items-center gap-2">
                <MdPassword />
                <input
                  type="password"
                  placeholder=" Password"
                  className="input"
                  value={FormData.password}
                  name="password"
                  onChange={handleOnChange}
                />
              </label>
            </form>
            <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
              <button
                className="btn rounded-full btn-primary text-white btn-outline w-full"
                onClick={handleSubmit}
              >
                Submit
              </button>

              <p className="text-white text-lg">Already have an account?</p>
              <Link to="/login">
                <button className="btn rounded-full btn-info text-white  w-full">
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Singup;
