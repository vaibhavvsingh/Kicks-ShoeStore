import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import backendUrl from "../static/constants";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [registerInfo, setRegisterInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    //API CALL TO LOGIN
    try {
      const response = await fetch(backendUrl + "user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
        mode: "cors",
        credentials: "include",
      });
      const data = await response.json();
      toast.success(data.message, { position: toast.POSITION.BOTTOM_CENTER });
      if (response.status === 200) {
        dispatch(login({ username: loginInfo.username, userid: data.userid }));
        localStorage.setItem(
          "user",
          JSON.stringify({
            isLoggedIn: true,
            username: loginInfo.username,
            userid: data.userid,
          })
        );
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
  async function handleRegister(e) {
    e.preventDefault();
    //API CALL TO REGISTER
    const response = await fetch(backendUrl + "user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerInfo),
      mode: "cors",
    });
    const data = await response.json();
    toast(data?.message);
  }
  return (
    <div className="md:w-[60%] m-auto p-10 text-sm">
      <ToastContainer />
      <h1 className="font-bold mb-4">SIGN IN / JOIN</h1>
      <form
        className="flex flex-col mb-14"
        action=""
        onSubmit={(e) => handleLogin(e)}
      >
        <h1 className="mb-2">SIGN IN</h1>
        <input
          type="text"
          placeholder="USERNAME"
          className="p-1 my-1 w-full"
          value={loginInfo.username}
          onChange={(e) =>
            setLoginInfo((state) => {
              return { ...state, username: e.target.value };
            })
          }
        />
        <input
          type="password"
          placeholder="PASSWORD"
          className="p-1 my-1 w-full"
          value={loginInfo.password}
          onChange={(e) =>
            setLoginInfo((state) => {
              return { ...state, password: e.target.value };
            })
          }
        />
        <Link className="my-5" to={"/forgot-password"}>
          FORGOT PASSWORD?
        </Link>
        <input
          type="submit"
          value="SUBMIT"
          className="text-white bg-black p-1 cursor-pointer"
        />
      </form>
      <form
        className="flex flex-col"
        action=""
        onSubmit={(e) => handleRegister(e)}
      >
        <h1 className="mb-2">JOIN</h1>
        <div className="flex flex-col md:flex-row">
          <input
            type="text"
            placeholder="FIRST NAME"
            className="p-1 my-1 flex-1 mr-2"
            value={registerInfo.firstName}
            onChange={(e) =>
              setRegisterInfo((state) => {
                return { ...state, firstName: e.target.value };
              })
            }
          />
          <input
            type="text"
            placeholder="LAST NAME"
            className="p-1 my-1 flex-1"
            value={registerInfo.lastName}
            onChange={(e) =>
              setRegisterInfo((state) => {
                return { ...state, lastName: e.target.value };
              })
            }
          />
        </div>
        <input
          type="text"
          placeholder="EMAIL"
          className="p-1 my-1 w-full"
          value={registerInfo.email}
          onChange={(e) =>
            setRegisterInfo((state) => {
              return { ...state, email: e.target.value };
            })
          }
        />
        <input
          type="text"
          placeholder="USERNAME"
          className="p-1 my-1 w-full"
          value={registerInfo.username}
          onChange={(e) =>
            setRegisterInfo((state) => {
              return { ...state, username: e.target.value };
            })
          }
        />
        <input
          type="password"
          placeholder="PASSWORD"
          className="p-1 my-1 w-full"
          value={registerInfo.password}
          onChange={(e) =>
            setRegisterInfo((state) => {
              return { ...state, password: e.target.value };
            })
          }
        />
        <input
          type="submit"
          value="REGISTER"
          className="text-white bg-black p-1 mt-2 cursor-pointer"
        />
      </form>
    </div>
  );
}

export default Login;
