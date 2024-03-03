import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ResetingPassword = () => {
  let navigate = useNavigate();
  let userEmail = "";
  let newPass = "";
  async function getNewPassword() {
    try {
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: userEmail,
          newPassword: newPass,
        }
      );
      toast.success("Password reset successfully", {
        duration: 2000,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="w-75 m-auto py-5">
        <input
          type="email"
          id="useremail"
          className="form-control mb-4"
          placeholder="email"
          onChange={function (e) {
            userEmail = e.target.value;
          }}
        />
        <input
          type="password"
          id="rePassword"
          className="form-control mb-5"
          placeholder="new password"
          onChange={function (e) {
            newPass = e.target.value;
          }}
        />
        <button onClick={getNewPassword} className="btn btn-outline-success">
          Reset password
        </button>
      </div>
    </>
  );
};

export default  ResetingPassword;