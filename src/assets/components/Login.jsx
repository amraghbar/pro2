import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Login() {
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value.trim().toLowerCase();
    const password = document.querySelector("#password").value;
    const checkbox = document.querySelector("#rMe").checked;

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = regex.test(email);

    if (!isEmailValid) {
      Swal.fire({
        icon: "error",
        title: "Email is invalid!",
        timer: 2000,
      });
      return;
    }

    if (password && password.length > 4 && isEmailValid) {
      const token = 12345;
      if (checkbox) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      navigate("/Dash"); // Redirect to Home page
    } else {
      Swal.fire({
        icon: "error",
        title: "Data is invalid!",
      });
    }
  };

  const check = () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      navigate("/Dash"); // Redirect to Home page
    } else {
      localStorage.clear();
      sessionStorage.clear();
    }
  };

  React.useEffect(() => {
    check();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center  p-2">
      <div
        className="leftdiv col-12 col-md-6 d-flex flex-wrap flex-column justify-content-center"
        style={{ height: "90vh" }}
      >
        <div className="logo col-12 d-flex flex-wrap align-items-center">
          <img src="src/assets/components/css/img/logo.png" alt="Logo" />
          <h4>SmartPos</h4>
        </div>
        <div className="col-12">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: true }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide>
              <img src="src/assets/components/css/img/1.svg" alt="Slide 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="src/assets/components/css/img/2.svg" alt="Slide 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="src/assets/components/css/img/3.svg" alt="Slide 3" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="col-12">
          <h3 className="text-wrap">
            Manage Sales, Inventory <br /> and other transactions
          </h3>
        </div>
      </div>
      <div className="rightdiv col-12 col-md-6">
        <div className="word">
          <h2>Welcome Back!</h2>
          <p>Please sign in to complete</p>
        </div>
        <form name="loginform" onSubmit={handleSubmit}>
          <div className="auth d-flex flex-wrap justify-content-center flex-column gap-2">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="p-3"
            />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="rem p-2">
            <input type="checkbox" id="rMe" />
            <label htmlFor="rMe">Remember me</label>
          </div>
          <button type="submit" className="sig">
            Sign in
          </button>
          <p
            className="d-flex justify-content-center p-2"
            style={{ color: "darkgray" }}
          >
            or
          </p>
          <div
            className="social d-flex flex-wrap justify-content-center gap-4"
            id="anthso"
          >
            <div className="go btn">
              <img src="src/assets/components/css/img/gog.jpg" alt="Google" />{" "}
              Sign up with Google
            </div>
            <div className="fb btn">
              <img src="src/assets/components/css/img/fa.png" alt="Facebook" />{" "}
              Sign up with Facebook
            </div>
          </div>
          <a href="#" className="d-flex justify-content-center m-3">
            Forget password?
          </a>
          <p className="d-flex justify-content-center m-3">
            Don't have an account? Go to <a href="#">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
