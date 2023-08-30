/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import {
  // Nav,
  NavItem,
  // NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import "./Sidebar.css";

function Sidebar({ color, image, routes }) {
  const [dropdownStates, setDropdownStates] = useState(
    routes.map(() => false) // Initialize an array of false values
  );

  const toggleDropdown = (index) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index] = !newDropdownStates[index];
    setDropdownStates(newDropdownStates);
  };

  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a href="#" className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <img src={require("assets/img/favicon.png")} alt="..." />
            </div>
          </a>
          <a className="simple-text" href="#">
            Grip Admin
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (
              !prop.redirect &&
              prop.name !== "User Profile" &&
              prop.name !== "Single Post" &&
              prop.name !== "Users" &&
              prop.name !== "Creators" &&
              prop.name !== "Suspended Users" &&
              prop.name !== "Tag List" &&
              prop.name !== "Create Tag" &&
              prop.name !== "Upgrade to PRO"
            ) {
              if (prop.children) {
                const dropdownIndex = key;
                const isOpen = dropdownStates[dropdownIndex];
                // Render the dropdown menu for routes with children
                return (
                  <Dropdown
                    key={key}
                    isOpen={isOpen}
                    // toggle={toggleDropdown}
                    toggle={() => toggleDropdown(dropdownIndex)}
                    nav
                    className="custom-dropdown"
                  >
                    <DropdownToggle caret nav>
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </DropdownToggle>
                    <DropdownMenu>
                      {prop.children.map((child, index) => (
                        <NavLink
                          to={child.layout + child.path}
                          className="nav-link"
                          activeClassName="active"
                          key={index}
                        >
                          <DropdownItem>{child.name}</DropdownItem>
                        </NavLink>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                );
              } else {
                // Render regular menu items
                return (
                  <NavItem
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </NavItem>
                );
              }
            }
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;

{
  /* <Nav>
          {routes.map((prop, key) => {
            if (
              !prop.redirect &&
              prop.name !== "User Profile" &&
              prop.name !== "Single Post" &&
              prop.name !== "Upgrade to PRO"
            )
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav> */
}
