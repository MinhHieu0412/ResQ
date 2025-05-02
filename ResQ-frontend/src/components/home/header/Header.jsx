/*
  Component: Header
  Sử dụng chung header cho các trang bên ngoài như: Trang chủ, Dịch vụ, ...
*/

import React from "react";
import HeaderNavigation from "./HeaderNavigation";

const Header = () => {
  return (
    <header className="flex items-center flex-row gap-20">
      <div className="ml-10">
        <img src="/images/6.6.png" alt="logo" width={100} height={100} />
      </div>

      <div className="" style={{ width: '1100px' }}>
        <HeaderNavigation />
      </div>
    </header>
  );
};

export default Header;