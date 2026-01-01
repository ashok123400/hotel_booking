import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const UserLayout = ({ children }) => {
  return (
    <div className="user-layout">
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;