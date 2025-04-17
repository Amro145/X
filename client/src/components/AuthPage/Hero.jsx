import { Link } from "react-router-dom";
import React from "react";
function Hero() {
  return (
    <div className="grid grid-cols-12 gap-4  w-full h-screen overflow-hidden ">
      <div className="col-span-7 flex justify-center items-center h-screen ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-twitter-x h-1/3 "
          viewBox="0 0 16 16"
        >
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
        </svg>
      </div>
      <div className="f col-span-5 flex flex-col justify-center">
        <div className="title text-6xl font-bold mb-10">
          <h1>Happening now</h1>
        </div>
        <div className="title text-5xl font-bold mb-5 ">
          <h1>Join today.</h1>
        </div>
        <div className="buttons flex flex-col justify-between overflow-auto px-10 mb-5">
          <button className="btn  bg-white text-black border-[#e5e5e5] rounded-2xl mb-5">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
          <button className="btn bg-black text-white border-black rounded-2xl">
            <svg
              aria-label="Apple logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1195 1195"
            >
              <path
                fill="white"
                d="M1006.933 812.8c-32 153.6-115.2 211.2-147.2 249.6-32 25.6-121.6 25.6-153.6 6.4-38.4-25.6-134.4-25.6-166.4 0-44.8 32-115.2 19.2-128 12.8-256-179.2-352-716.8 12.8-774.4 64-12.8 134.4 32 134.4 32 51.2 25.6 70.4 12.8 115.2-6.4 96-44.8 243.2-44.8 313.6 76.8-147.2 96-153.6 294.4 19.2 403.2zM802.133 64c12.8 70.4-64 224-204.8 230.4-12.8-38.4 32-217.6 204.8-230.4z"
              ></path>
            </svg>
            Login with Apple
          </button>
        </div>
        <div className="or mb-5 px-5 text-center">
          <div className="divider">or</div>
        </div>
        <div className="sing up flex justify-center mb-5">
          <Link to="/signup">
            <button className="btn bg-black text-white border-black">
              Create account
            </button>
          </Link>
        </div>
        <div className="login flex flex-col px-10">
          <span>Already Have Account ?</span>
          <Link to="/login">
            
            <button className="btn btn-outline">Logn in</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
