import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import withRouter from "../../components/Common/withRouter";
import "../../assets/css/style.css";
//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import logoLightPng from "../../assets/images/logo.png";
import logoLightSvg from "../../assets/images/logo.svg";
import logoDark from "../../assets/images/logo.png";

const Sidebar = props => {

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box" style={{paddingTop:"10px"}}>
          <Link to="/" className="logo logo-dark">
             <span className="logo-sm">
              <img src={logo} alt="" height="12" />
            </span>
            <span className="logo-lg">
              <img src={logo} alt="" height="80" />
            </span> 
           
          </Link>

          <Link to="/" className="logo logo-light">
           <span className="logo-sm">
              <img src={logo} alt="" height="12" />
            </span>
            <span className="logo-lg">
              <img src={logo} alt="" height="80" />
            </span> 
             {/* <h3 className="text-white">Trend On Rent</h3> */}
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
