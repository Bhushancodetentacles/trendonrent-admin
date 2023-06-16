import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "assets/scss/datatables.scss"
import "../../assets/css/style.css"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap"

//import Charts
import StackedColumnChart from "./StackedColumnChart"

//import action
import { getChartsData as onGetChartsData } from "../../store/actions"

// Pages Components
import WelcomeComp from "./WelcomeComp"
import MonthlyEarning from "./MonthlyEarning"
import SocialSource from "./SocialSource"
import ActivityComp from "./ActivityComp"
import TopCities from "./TopCities"
import LatestTranaction from "./LatestTranaction"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

//redux
import { useSelector, useDispatch } from "react-redux"
import { get } from "helpers/api_helper"

const Dashboard = props => {
  const [modal, setmodal] = useState(false)
  const [subscribemodal, setSubscribemodal] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [EndDate, setEndDate] = useState("")
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState({})
  const { chartsData } = useSelector(state => ({
    chartsData: state.Dashboard.chartsData,
  }))

  const [selectedCategory, setSelectedCategory] = useState(0)
  const selectCategory = e => {
    setSelectedCategory(e.target.value)
  }

  useEffect(() => {
    setTimeout(() => {
      setSubscribemodal(true)
    }, 2000)
  }, [])

  const [periodData, setPeriodData] = useState([])
  const [periodType, setPeriodType] = useState("yearly")

  useEffect(() => {
    setPeriodData(chartsData)
  }, [chartsData])

  const onChangeChartPeriod = pType => {
    setPeriodType(pType)
    dispatch(onGetChartsData(pType))
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(onGetChartsData("yearly"))
  }, [dispatch])

  //meta title
  document.title = "Trend on Rent"
  const getDashboardData = async () => {
    try {
      setLoader(true)

      console.log(startDate)
      // const partsStart = startDate.split("-");
      // // console.log(parts)
      // const convertedDateStart = partsStart[2] + "/" + partsStart[1] + "/" + partsStart[0];
      // const partsEnd = EndDate.split("-");
      // const convertedDateEnd = partsEnd[2] + "/" + partsEnd[1] + "/" + partsEnd[0];
      // console.log(convertedDateEnd)
      console.log(EndDate)
      console.log(selectedCategory)
      // const res = await get(`Common/getDashboardCount?FromDate=${startDate}&Todate=${EndDate}&Category=${selectedCategory}`)
      const res = await get(
        `Common/getDashboardCount?FromDate=${startDate}&Todate=${EndDate}&Category=${selectedCategory}`
      )
      console.log(res.data)
      const result = await res.data.result
      // console.log("dashbosx", result)
      setLoader(false)
      setData(result)
    } catch (error) {
      setLoader(false)
      throw error
    }
  }

  // to add category list start
  const [categoryList, setCategoryList] = useState([])
  const getCategorySelectList = async () => {
    try {
      const res = await get(`Product/CategorySelectList`)
      const result = await res.data.list
      setCategoryList(result)
    } catch (error) {
      throw error
    }
  }
  // to add category list end

  useEffect(() => {
    getDashboardData()
    getCategorySelectList()
  }, [])

  useEffect(() => {
    let element = document.getElementById("dashboard_tab")
    if (element) {
      element.classList.add("mm-active")
    }
    return () => {
      if (element) {
        element.classList.remove("mm-active")
      }
    }
  }, [])



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <Col xl="12">
              <Row>
                <div className="card">
                  <div className="card-body">
                    <div className="mb-2 row">
                      <div className=" col-xl-3 col-md-3 col-sm-4">
                        <label>From Date</label>
                        {/* <DatePicker
                          selected={startDate}
                          onChange={date => setStartDate(date)}
                          className="form-control"
                          dateFormat="dd-MM-yyyy"
                          placeholderText="From Date"
                        /> */}
                        <input
                          className="form-control"
                          type="date"
                          pattern="\d{4}-\d{2}-\d{2}"
                          name="startDate"
                          id="example-month-input month"
                          onChange={e => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="col-xl-3 col-md-3 col-sm-4">
                        <label>To Date</label>
                        {/* <DatePicker
                          selected={EndDate}
                          onChange={date => setEndDate(date)}
                          className="form-control"
                          dateFormat="dd-mm-yyyy"
                          placeholderText="To Date"
                        /> */}
                        <input
                          className="form-control"
                          type="date"
                          pattern="\d{4}-\d{2}-\d{2}"
                          name="EndDate"
                          id="example-month-input month"
                          onChange={e => setEndDate(e.target.value)}
                        />
                      </div>
                  <div className="col-xl-3 col-md-3 col-sm-4">
                        <label>Category</label>
                        <select
                          className="form-control select2"
                          onChange={selectCategory}
                        >
                          <option value="0">Select</option>
                          {categoryList?.map(cat => {
                            return (
                              <option
                                key={cat.categoryId}
                                value={cat.categoryId}
                              >
                                {cat.name}
                              </option>
                            )
                          })}
                          {/* <option value="Active">wedding</option>
                          <option value="New">Maternity</option>
                          <option value="Close">Birthday</option> */}
                        </select>
                      </div> 

                      <div className="col-xl-3 col-md-3 col-sm-3">
                        <div className="mt-lg-4 mb-xxl-0 mt-sm-4 mt-xs-4 btn-filter1">
                          <button
                            type="button"
                            className="btn btn-filter w-100"
                            onClick={getDashboardData}
                          >
                            <i className="mdi mdi-filter-outline align-middle"></i>{" "}
                            Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Reports Render */}
                {/* {reports.map((report, key) => ( */}

                <div className="card">
                  <div className="card-body">
                  
                      {loader ? (
                        <div className="loader">
                          <p>Loading...</p>{" "}
                        </div>
                      ) : data ? (
                        <>
                          <div className="row">
                          <Col md="3" sm="6">
                            <div className="bg-card1 cardbox  rounded-lg shadow-xl">
                              <CardBody className="d-flex" style={{justifyContent:"space-betweem"}}>
                               
                               
                                  <div className=" align-items-center text-left">
                                    <h3 className="mb-w text-3xl text-white">
                                      {data.totalDress}
                                    </h3>
                                    <span className="text-white heading-card">
                                   Dress
                                </span>
                                  </div>
                                  <div className="avatar-sm align-self-center float-right mini-stat-icon">
                                    <span className="avatar-title text-right">
                                      <i className="bx bx-copy-alt  font-large-2"></i>
                                    </span>
                                  </div>
                              
                              </CardBody>
                            </div>
                          </Col>
                          <Col md="3" sm="6">
                            <div className="bg-card2 cardbox rounded-lg shadow-xl">
                              <CardBody className="d-flex" style={{justifyContent:"space-betweem"}}>
                               
                             
                                  <div className=" align-items-center text-left">
                                   <h3 className="mb-2 text-3xl text-white">
                                      {data.totalCategory}
                                    </h3> 
                                   
                                  
                                  <span className="text-white heading-card ">
                                  Dress on Rent
                                </span>
                                </div>
                                <div className="avatar-sm align-self-center float-right mini-stat-icon">
                                    <span className="avatar-title text-right">
                                    <i className= "bx bx-basket font-large-2"></i>
                                    </span>
                                  </div>
                              </CardBody>
                            </div>
                          </Col>

                          {/* <Col md="3" sm="6">
                            <div className="bg-info cardbox rounded-lg shadow-xl">
                              <CardBody className="d-flex" style={{justifyContent:"space-betweem"}}>
                               
                               
                                  <div className="align-items-center text-left">
                                    <h3 className="mb-2 text-3xl text-white">
                                      {data?.totalCategory}
                                    </h3>
                                    <span className=" text-white heading-card ">
                                  Total Category
                                </span>
                                  </div>
                                  <div className="avatar-sm align-self-center float-right mini-stat-icon">
                                    <span className="avatar-title text-right">
                                      <i className="bx bx-detail  font-large-2"></i>
                                    </span>
                                  
                                </div>
                              </CardBody>
                            </div>
                          </Col> */}
                     

                          <Col md="3" sm="6">
                            <div className=" from-pink-200  cardbox rounded-lg shadow-xl">
                              <CardBody className="d-flex" style={{justifyContent:"space-betweem"}}>
                              
                                
                                <div className="align-items-center text-left">
                                    <h3 className="mb-2 text-3xl text-white">
                                      {data.totalCustomer}
                                    </h3>
                                    <span className="text-white heading-card ">
                                  Customer
                                </span>
                                  </div>
                                  <div className="avatar-sm align-self-center float-right mini-stat-icon">
                                    <span className="avatar-title text-right">
                                      <i className="mdi mdi-account-group  font-large-2"></i>
                                    </span>
                                  </div>
                                
                              </CardBody>
                            </div>
                          </Col>

                          <Col md="3" sm="6">
                            <div className="bg-card3 cardbox rounded-lg shadow-xl">
                              <CardBody className="d-flex" style={{justifyContent:"space-betweem"}}>
                               
                              
                              <div className="align-items-center text-left">
                                    <h3 className="mb-2 text-3xl text-white">
                                      {data?.totalLoyaltyPointCredited}
                                    </h3>
                                    <span className="text-white heading-card ">
                                  Loyalty points{" "}
                                </span>
                                  </div>
                                  <div className="avatar-sm align-self-center float-right mini-stat-icon">
                                    <span className="avatar-title text-right">
                                      <i className=" mdi mdi-package-down font-large-2"></i>
                                    </span>
                                  </div>
                            
                              </CardBody>
                            </div>
                          </Col>
                          </div>
                          <div className="row row_card">
                          <Col md="3" sm="6">
                            <div className=" bg-card4 cardbox rounded-lg shadow-xl">
                              <CardBody className="d-flex" style={{justifyContent:"space-betweem"}}>
                             
                                <div className="align-items-center text-left">
                                    <h3 className="mb-2 text-3xl text-white">
                                      {data?.totalLoyaltyPointWithCustomer}
                                    </h3>
                                    <span className=" text-white heading-card  ">
                                  Loyalty points with customers
                                </span>
                                  </div>
                                  <div className="avatar-sm align-self-center float-right mini-stat-icon">
                                    <span className="avatar-title text-right">
                                      <i className="mdi mdi-package-variant  font-large-2"></i>
                                    </span>
                                  </div>
                                
                              </CardBody>
                            </div>
                          </Col>
                          <Col md="3" sm="6">
                            <div className="bg-card5 cardbox rounded-lg shadow-xl ">
                              <CardBody className="d-flex" style={{justifyContent:"space-betweem"}}>
                             
                              <div className="align-items-center text-left">
                                    <h3 className="mb-2 text-3xl text-white">
                                      {data?.totalLoyaltyPointRedeemed}
                                    </h3>
                                    <span className="text-white heading-card  ">
                                  Loyalty points redeemed
                                </span>
                               
                                  </div>
                                  <div className="avatar-sm align-self-center float-right mini-stat-icon">
                                    <span className="avatar-title text-right">
                                      <i className="mdi mdi-package-up  font-large-2"></i>
                                    </span>
                                  </div>
                                
                              </CardBody>
                            </div>
                          </Col>

                          <Col md="3" sm="6">
                            <div className="bg-card6 cardbox rounded-lg shadow-xl">
                              <CardBody className="d-flex" style={{justifyContent:"space-betweem"}}>
                              
                                <div className="align-items-center text-left">
                                  <h3 className="mb-2 text-3xl text-white">
                                    {data?.revenue}
                                  </h3>
                                  <span className="text-white heading-card  ">
                                    Revenue
                                  </span>
                                </div>
                                <div className="avatar-sm align-self-center float-right mini-stat-icon">
                                  <span className="avatar-title text-right">
                                    <i className=" bx bx-rupee font-large-2"></i>
                                  </span>
                                </div>
                              </CardBody>
                            </div>
                          </Col>
                          </div>
                        </>
                      ) : (
                        <div> No data found </div>
                      )}
                    </div>
                  </div>
               
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
