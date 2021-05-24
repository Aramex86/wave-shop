import React from "react";
import Footer from "../Home/Header_Fotter/Footer/Footer";
import Header from "../Home/Header_Fotter/Header/Header";

const Layout = (props: any) => {
  return (
    <>
      <Header />
      <div className="page_container">{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
