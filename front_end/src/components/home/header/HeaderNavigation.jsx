/*
  Component: HeaderNavigation
  Sử dụng navigation dành cho phần header
*/

import React from "react";
import { Link } from "react-router-dom"; 

const HeaderNavigation = () => {
  return (
    <nav>
      <ul className="flex items-center justify-between">
        <li className="text-xl" style={{ width: '650px' }}>
          <div className="flex items-center justify-between font-lexend font-medium text-blue-013171">
            <Link to="/" className="hover:underline">Trang chủ</Link>
            <Link to="/path" className="hover:underline">Dịch vụ</Link>
            <Link to="/path" className="hover:underline">Về chúng tôi</Link>
            <Link to="/path" className="hover:underline">FAQ's</Link>
            <Link to="/path" className="hover:underline">Đối tác</Link>
          </div>
        </li>
        <li className="" style={{ width: '375px' }}>
          <div className="flex items-center justify-between font-lexend font-medium">
            <div className="flex items-center flex-row gap-3 bg-blue-013171 p-3 rounded-full" style={{ height: '40px' }}>
              <div><img src="/images/icon-web/Ringer Volume.png" alt="phone" width={20} height={22} /></div>
              <p className="text-sm text-white">(+84) 656 5565 7777</p>
            </div>
            <div className="flex items-center flex-row gap-3">
              <div><img src="/images/icon-web/Person.png" alt="avatar" width={27} height={28} /></div>
              <Link to="/login" className="text-xl text-blue-013171">Đăng nhập</Link>
            </div>
          </div>
        </li>                        
      </ul>      
    </nav>
  );
};

export default HeaderNavigation;