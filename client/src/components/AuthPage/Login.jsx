import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store (3)/api/authApi";
import Swal from "sweetalert2";

function Login() {
  const { loading, loginError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!cleanData.email || !cleanData.email.trim()) {
      Swal.fire({
        text: "Email is Required!",
        timer: 1500,
      });
    } else if (!cleanData.password) {
      Swal.fire({
        text: " Password is Required!",
        timer: 1500,
      });
    } else {
      return true;
    }
  };
  const cleanData = {
    email: formData.email,
    password: formData.password,
  };
  const handleonChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (data) => {
    if (validateForm() === true) {
      dispatch(login(data));
      console.log(loginError);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center md:grid md:grid-cols-12 md:gap-4  w-full h-screen overflow-hidden  ">
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
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
          <div className=" col-span-12 flex flex-col justify-center items-center md:col-span-5 ">
            <div className="title font-extrabold text-4xl mb-3 md:mb-10">
              Let's go.
            </div>
            {(loginError && formData.email !== "") ||
              (formData.password !== "" && (
                <div className="text-red-400 mb-2">{loginError}</div>
              ))}

            <form className="grid gap-6  w-full md:w-auto  ">
              <label className="input input-bordered rounded flex items-center gap-2">
                <MdOutlineMail />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input"
                  value={formData.email}
                  onChange={handleonChange}
                />
              </label>

              <label className="input input-bordered rounded flex items-center gap-2">
                <MdPassword />
                <input
                  type="password"
                  placeholder=" Password"
                  className="input"
                  value={formData.password}
                  name="password"
                  onChange={handleonChange}
                />
              </label>
            </form>
            <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
              <button
                className="btn rounded-full btn-primary text-white btn-outline w-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(cleanData);
                }}
              >
                Login
              </button>

              <p className="text-white text-lg">Don't have an account??</p>
              <Link to="/signup">
                <button className="btn rounded-full btn-info text-white  w-full">
                  Create account
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
