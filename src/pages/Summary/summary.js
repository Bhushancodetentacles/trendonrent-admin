import React, { useState } from "react";
import "../../assets/css/style.css";
import { Link } from "react-router-dom";

import Loyalty from "pages/Loyality/Loyalty";
import Redeemed from "pages/Loyality/Redeemed";
import Notredeemed from "pages/Loyality/Notredeemed";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    Col,
    Collapse,
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    UncontrolledCollapse
} from "reactstrap";

import classnames from "classnames";


const Summary = () => {


    //meta title
    document.title = "Trend on Rent";
    const [activeTab, setactiveTab] = useState("1");
    const [activeTab1, setactiveTab1] = useState("5");
    const [activeTab2, setactiveTab2] = useState("1");
    const [activeTab3, setactiveTab3] = useState("1");
    const [verticalActiveTab, setverticalActiveTab] = useState("1");
    const [verticalActiveTabWithIcon, setverticalActiveTabWithIcon] =
        useState("1");
    const [customActiveTab, setcustomActiveTab] = useState("1");
    const [customIconActiveTab, setcustomIconActiveTab] = useState("1");
    const [col1, setcol1] = useState(true);
    const [col2, setcol2] = useState(false);
    const [col3, setcol3] = useState(false);

    const [col5, setcol5] = useState(true);
    const [col6, setcol6] = useState(true);
    const [col7, setcol7] = useState(true);

    const [col8, setcol8] = useState(true);
    const [col9, setcol9] = useState(true);
    const [col10, setcol10] = useState(false);
    const [col11, setcol11] = useState(false);

    const t_col1 = () => {
        setcol1(!col1);
        setcol2(false);
        setcol3(false);
    };

    const t_col2 = () => {
        setcol2(!col2);
        setcol1(false);
        setcol3(false);
    };

    const t_col3 = () => {
        setcol3(!col3);
        setcol1(false);
        setcol2(false);
    };

    const t_col5 = () => {
        setcol5(!col5);
    };

    const t_col6 = () => {
        setcol6(!col6);
    };

    const t_col7 = () => {
        setcol7(!col7);
    };

    const t_col8 = () => {
        setcol6(!col6);
        setcol7(!col7);
    };

    const t_col9 = () => {
        setcol9(!col9);
        setcol10(false);
        setcol11(false);
    };

    const t_col10 = () => {
        setcol10(!col10);
        setcol9(false);
        setcol11(false);
    };

    const t_col11 = () => {
        setcol11(!col11);
        setcol10(false);
        setcol9(false);
    };

    const toggle = tab => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
    };

    const toggle1 = tab => {
        if (activeTab1 !== tab) {
            setactiveTab1(tab);
        }
    };

    const toggle2 = tab => {
        if (activeTab2 !== tab) {
            setactiveTab2(tab);
        }
    };

    const toggle3 = tab => {
        if (activeTab3 !== tab) {
            setactiveTab3(tab);
        }
    };

    const toggleVertical = tab => {
        if (verticalActiveTab !== tab) {
            setverticalActiveTab(tab);
        }
    };

    const toggleVerticalIcon = tab => {
        if (verticalActiveTabWithIcon !== tab) {
            setverticalActiveTabWithIcon(tab);
        }
    };

    const toggleCustom = tab => {
        if (customActiveTab !== tab) {
            setcustomActiveTab(tab);
        }
    };

    const toggleIconCustom = tab => {
        if (customIconActiveTab !== tab) {
            setcustomIconActiveTab(tab);
        }
    };


    return (
        <>
            <div className="page-content">
                <div className="container-fluid">
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs
                        title="Dashboard"
                        breadcrumbItem="Loyalty"
                        path={"/dashboard"}

                    />

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row mb-2" style={{ justifyContent: "flex-end" }}>
                                        <div className="col-md-2 mb-3" style={{ textAlign: "right" }}>
                                            <Link className="mt-lg-4 mt-0 mt-sm-4 mt-xs-4 btn-add btn" to="/Loyality">
                                                <i className="mdi mdi-plus me-1"></i>Add Loyalty</Link></div>
                                    </div>
                                
                                    <Nav pills className="navtab-bg nav-justified">
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab1 === "5",
                                                })}
                                                onClick={() => {
                                                    toggle1("5");
                                                }}
                                            >
                                                Total Loyalty
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab1 === "6",
                                                })}
                                                onClick={() => {
                                                    toggle1("6");
                                                }}
                                            >
                                                Total Loyalty Redeemed
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab1 === "7",
                                                })}
                                                onClick={() => {
                                                    toggle1("7");
                                                }}
                                            >Total Loyalty Not Redeemed
                                            </NavLink>
                                        </NavItem>

                                    </Nav>
                                </div>
                            </div>
                     
                                    <TabContent activeTab={activeTab1} className="p-3 text-muted">
                                        <TabPane tabId="5">
                                            <Row>
                                                <Col sm="12">
                                                    <Loyalty></Loyalty>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="6">
                                            <Row>
                                                <Col sm="12">
                                                    <Redeemed></Redeemed>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="7">
                                            <Row>
                                                <Col sm="12">
                                                    <Notredeemed></Notredeemed>
                                                </Col>
                                            </Row>
                                        </TabPane>


                                    </TabContent>
                            

                        </div>
                    </div>
                </div>
            </div >


        </>

    )
}

export default Summary
