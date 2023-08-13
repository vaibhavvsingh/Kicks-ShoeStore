import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Account() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn) {
      toast("Please Log In.", { position: toast.POSITION.BOTTOM_CENTER });
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="text-2xl m-5">
      <ToastContainer />
      Hey, {user.username}!
    </div>
  );
}

export default Account;
