/*
  Component: Login
  Sử dụng ở trang chủ để người dùng đăng nhập
*/

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { login } from "../../api";

const Login = () => {

  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ResQ - Đăng Nhập";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ 
        loginName: username, 
        password: password 
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userId', data.userId);

      switch (data.role) {
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'MANAGER':
          navigate('/manager');
          break;
        case 'STAFF':
          navigate('/staff');
          break;
        default:
          alert('Không có quyền hợp lệ!');
          break;
      }
  
  } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.");
    }
  };

  return (
    <div className="mx-auto" style={{width: '600px', height: '555px'}}>
      <h2 className="font-lexend font-medium font-size-30 text-center p-12">Đăng Nhập</h2>
      <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="block text-gray-900 font-lexend text-base font-normal">Tên đăng nhập</label>
          <input type="text" name="username" id="username" className="general-size border border-color-field rounded-full px-5" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="block text-gray-900 font-lexend text-base font-normal">Mật khẩu</label>
          <input type="password" name="password" id="password" className="general-size border border-color-field rounded-full px-5" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button type="submit" 
               className="general-size bg-blue-013171 text-white font-lexend text-xl font-semibold border rounded-full mt-6 hover:bg-blue-700" >
               Đăng Nhập
               </button>

      </form>
    </div>
  );
};

export default Login;