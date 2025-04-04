/*
  Component: Login
  Sử dụng ở trang chủ để người dùng đăng nhập
*/

import React, { useEffect } from "react";
import "./login.css";

const Login = () => {
  useEffect(() => {
    document.title = "ResQ - Đăng Nhập";
  }, []);

  return (
    <div className="mx-auto" style={{width: '600px', height: '555px'}}>
      <h2 className="font-lexend font-medium font-size-30 text-center p-12">Đăng Nhập</h2>
      <form action="post" className="flex justify-center items-center flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="block text-gray-900 font-lexend text-base font-normal">Tên đăng nhập</label>
          <input type="text" name="username" id="username" className="general-size border border-color-field rounded-full px-5" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="block text-gray-900 font-lexend text-base font-normal">Mật khẩu</label>
          <input type="password" name="password" id="password" className="general-size border border-color-field rounded-full px-5" />
        </div>
        <input type="submit" value="Đăng Nhập"
               className="general-size bg-blue-013171
                          text-white font-lexend text-xl font-semibold
                          border rounded-full mt-6
                          hover:bg-blue-700" />
      </form>
    </div>
  );
};

export default Login;