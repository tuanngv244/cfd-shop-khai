import React from "react";
import MyInfo from "./MyInfo";
import Orders from "./Orders";
import Adresses from "./Adresses";
import Wishlist from "./Wishlist";
import Breadcrumb from "../../components/Breadcrumb";
import { Link, NavLink, Outlet } from "react-router-dom";
import PATHS from "../../constants/paths";
import cn from "../../utils/cn";

const DashboardPage = () => {
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{
          backgroundImage: 'url("/src/assets/images/page-header-bg.jpg")',
        }}
      >
        <div className="container">
          <h1 className="page-title">My Account</h1>
        </div>
      </div>

      <Breadcrumb className="breadcrumb-nav border-0 mb-0">
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>My Account</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <aside className="col-md-4 col-lg-3">
                <ul
                  className="nav nav-dashboard flex-column mb-3 mb-md-0"
                  role="tablist"
                >
                  <li className="nav-item">
                    <NavLink
                      end
                      className="nav-link"
                      to={PATHS.DASHBOARD.INDEX}
                    >
                      Account Details
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={PATHS.DASHBOARD.ORDERS}>
                      Orders
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={PATHS.DASHBOARD.ADRESSES}>
                      Adresses
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={PATHS.DASHBOARD.WISHLIST}>
                      Wishlist
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={PATHS.DASHBOARD.CHANGEPASSWORD}
                    >
                      Change Password
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Sign Out
                    </a>
                  </li>
                </ul>
              </aside>
              <div className="col-md-8 col-lg-9">
                <div className="tab-content">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
