import React, { useState, useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import { FreeMode, Navigation, Thumbs } from "swiper"
import Qrcode from "../../assets/images/QR.png"
// import Header from "components/VerticalLayout/Header";
// import Footer from "components/VerticalLayout/Footer";
// import Sidebar from "components/VerticalLayout/Sidebar";
import { useSelector, useDispatch } from "react-redux"

// loader import
import { Audio } from  'react-loader-spinner'

import { Button } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { get } from "helpers/api_helper"
import { getProductDetailFail, getProductDetailSuccess } from "store/actions"
import QRCode from "react-qr-code"
import { is } from "immutable"

const Viewdress = () => {

  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  // console.log("useLocation", state?.productID)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [productData, setProductData] = useState({})
  let qrLink = `https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=https://trendonrent.com/Product/${productData?.uniqueCode}`
  //meta title
  document.title = "Trends on Rent"

  console.log(productData)

  //  getting single product by ID
  const getProductById = async () => {
    try {
      // debugger
      if (id && id.length) {
        setIsLoading(true)
        const res = await get(`Product/View?id=${state?.productID}`)
        setIsLoading(false)
        const result = await res.data.result
        console.log("result", result)
        setProductData(result)
        dispatch(getProductDetailSuccess(result))
      } else {
        navigate("/Rentdress")
      }
    } catch (error) {
      dispatch(getProductDetailFail(error))
      throw error
    }
  }

  useEffect(() => {
    getProductById()
  }, [id])

  useEffect(() => {
    let element = document.getElementById("product_tab")
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
      {
        isLoading ? <Audio
        height = "80"
        width = "80"
        radius = "9"
        color = 'green'
        ariaLabel = 'three-dots-loading'     
        wrapperStyle
        wrapperClass
      /> : ""
      }
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Product Details"
            path={"/dashboard"}
            path1={"/Rentdress"}
            title1={"Product"}
          />
          <div className="row">
            <div className="col-xs-12">
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="row"></div>
                    <div className="row">
                      <div className="col-sm-5">
                        <div className="mb-3 row">
                          <label htmlFor="address" className="col-md-12">
                            Product Images
                          </label>
                          <div className="col-md-12">
                            <Swiper
                              style={{
                                "--swiper-navigation-color": "#0000009e",
                                "--swiper-pagination-color": "#0000009e",
                              }}
                              loop={true}
                              spaceBetween={10}
                              navigation={true}
                              thumbs={{ swiper: thumbsSwiper }}
                              modules={[FreeMode, Navigation, Thumbs]}
                              className="mySwiper2"
                            >
                              <SwiperSlide>
                                <img
                                  src={`${productData?.frontImage}`}
                                  className="img-fluid swiper-img mx-auto d-block"
                                />
                              </SwiperSlide>
                              <SwiperSlide>
                                <img
                                  src={`${productData?.backImage}`}
                                  className="img-fluid swiper-img mx-auto d-block"
                                />
                              </SwiperSlide>
                            </Swiper>
                            <Swiper
                              onSwiper={setThumbsSwiper}
                              spaceBetween={20}
                              slidesPerView={1}
                              freeMode={true}
                              watchSlidesProgress={true}
                              modules={[FreeMode, Navigation, Thumbs]}
                              className="mySwiper"
                            >
                              <SwiperSlide>
                                <img
                                  src={`${productData?.frontImage}`}
                                  className="avatar-md"
                                />
                              </SwiperSlide>
                              <SwiperSlide>
                                <img
                                  src={`${productData?.backImage}`}
                                  className="avatar-md"
                                />
                              </SwiperSlide>
                            </Swiper>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-7">
                        <div className="mb-3 row">
                          <div className="col-md-12">
                            <h3 className="product_heading" style={{ marginBottom: "0.1rem" }}>
                              {" "}
                              {productData?.name}
                            </h3>
                            <h5 className="my-1 category_name"> {productData?.categoryName}</h5>
                            {/* <span className="text-muted" >{productData?.uniqueCode}</span> */}
                            <div className="purchaseprice ">
                            
                              <h2 className="text-primary mt-3">
                                <span>₹</span>
                                {productData?.purchasePrice}
                                <span className="badge bg-danger font-size-10 ms-1">
                                  {productData?.discountAmount}% Off
                                </span>
                              </h2>
                              <div className="row">
                                <div className="mt-3 col-md-6">
                                  <h5 className="font-size-14">Price </h5>
                                  <ul className="list-unstyled ps-0 mb-0 mt-3">
                                    <li>
                                      <p className="text-muted mb-1 text-truncate">
                                        <i className="mdi mdi-circle-medium align-middle text-primary me-1"></i>{" "}
                                        Purchase Price :
                                        <i className="bx bx-rupee"></i>
                                        {productData?.purchasePrice}
                                      </p>
                                    </li>
                                    <li>
                                      <p className="text-muted mb-1 text-truncate">
                                        <i className="mdi mdi-circle-medium align-middle text-primary me-1"></i>{" "}
                                        Deposit Amount :{" "}
                                        <i className="bx bx-rupee"></i>1000{" "}
                                      </p>
                                    </li>
                                    <li>
                                      <p className="text-muted mb-1 text-truncate">
                                        <i className="mdi mdi-circle-medium align-middle text-primary me-1"></i>{" "}
                                        Discount : {productData.discountAmount}%
                                      </p>
                                    </li>
                                    <li>
                                      <p className="text-muted mb-1 text-truncate">
                                        <i className="mdi mdi-circle-medium align-middle text-primary me-1"></i>{" "}
                                        Recovery Amount : {productData.recoveryAmount}
                                      </p>
                                    </li>
                                  </ul>
                                </div>

                                <div className="mt-3 col-md-6">
                                  <h5 className="font-size-14">Rent Price </h5>
                                  <ul className="list-unstyled ps-0 mb-0 mt-3">
                                    <li>
                                      <p className="text-muted mb-1 text-truncate">
                                        <i className="mdi mdi-circle-medium align-middle text-primary me-1"></i>{" "}
                                        Rent Price for 3 Days :{" "}
                                        {productData?.rentPriceFor3Days}
                                      </p>
                                    </li>
                                    <li>
                                      <p className="text-muted mb-1 text-truncate">
                                        <i className="mdi mdi-circle-medium align-middle text-primary me-1"></i>{" "}
                                        Rent Price for 7 Days :{" "}
                                        {productData?.rentPriceFor7Days}
                                      </p>
                                    </li>
                                    <li>
                                      <p className="text-muted mb-1 text-truncate">
                                        <i className="mdi mdi-circle-medium align-middle text-primary me-1"></i>{" "}
                                        Rent Price for 10 Days :{" "}
                                        {productData?.rentPriceFor10Days}
                                      </p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="row">
                                <div className="mt-3 col-md-6">

                                  <div className="d-flex">
                                    <h5 className="font-size-14">
                                      Supplier Name{" "}
                                    </h5>
                                    <span className="px-1">:</span>
                                    <p className="text-muted">
                                      {productData.supplierName}
                                    </p>
                                  </div>
                                  
                                  <div className="d-flex">
                                    <h5 className="font-size-14">
                                      Preparation Days{" "}
                                    </h5>
                                    <span className="px-1">:</span>
                                    <p className="text-muted">
                                    sahasb
                                    </p>
                                  </div>

                                </div>
                                <div className="mt-3 col-md-6">
                                  <h5 className="font-size-14">Fabric </h5>
                                  <ul className="list-unstyled ps-0 mb-0 mt-3">
                                    <li>
                                      <p className="text-muted mb-1 text-truncate">
                                        <i className="mdi mdi-circle-medium align-middle text-primary me-1"></i>{" "}
                                        Top Fabric : {productData?.topFabric}
                                      </p>
                                    </li>
                                    <li>
                                      <p className="text-muted mb-1 text-truncate">
                                        <i className="mdi mdi-circle-medium align-middle text-primary me-1"></i>{" "}
                                        Bottom Fabric :{" "}
                                        {productData?.bottomFabric}
                                      </p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3 row d-none">
                          <div className="col-md-6">
                            <div className="mb-3 row">
                              <label htmlFor="gender" className="col-md-6">
                                Unique Code
                              </label>
                              <div className="col-md-6">
                                <p className="text-muted"></p>
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="mb-3 row">
                              <label htmlFor="gender" className="col-md-6">
                                Category
                              </label>
                              <div className="col-md-6">
                                <p className="text-muted">
                                  {productData.categoryName}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="mb-3 row">
                              <label
                                htmlFor="alternativemobileno"
                                className="col-md-6"
                              >
                                Top Fabric
                              </label>
                              <div className="col-md-6">
                                <p className="text-muted">
                                  {productData?.topFabric}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="mb-3 row">
                              <label
                                htmlFor="alternativemobileno"
                                className="col-md-6"
                              >
                                Bottom Fabric
                              </label>
                              <div className="col-md-6">
                                <p className="text-muted">
                                  {productData?.bottomFabric}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="mb-3 row">
                              <label htmlFor="address" className="col-md-6">
                                Supplier Name
                              </label>
                              <div className="col-md-6">
                                <p className="text-muted">
                                  {productData.supplierName}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="mb-3 row">
                              <label htmlFor="adharcard" className="col-md-6">
                                Purchase Price
                              </label>
                              <div className="col-md-6">
                                <p className="text-muted">
                                  {productData?.purchasePrice}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="mb-3 row">
                              <label htmlFor="address" className="col-md-6">
                                Discount
                              </label>
                              <div className="col-md-6">
                                <h6 className="text-success text-uppercase">
                                  {productData.discountAmount}
                                </h6>
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="mb-3 row">
                              <label htmlFor="address" className="col-md-6">
                                Rent price 3 days
                              </label>
                              <div className="col-md-6">
                                <p className="text-muted">
                                  {productData?.rentPriceFor3Days}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="mb-3 row">
                              <label htmlFor="address" className="col-md-6">
                                Rent price 7 days
                              </label>
                              <div className="col-md-6">
                                <p className="text-muted">
                                  {productData?.rentPriceFor7Days}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="mb-3 row">
                              <label htmlFor="address" className="col-md-6">
                                Rent price 10 days
                              </label>
                              <div className="col-md-6">
                                <p className="text-muted">
                                  {productData?.rentPriceFor10Days}
                                </p>
                              </div>
                            </div>
                            {/* <div className="mb-3 row">
                              <label htmlFor="address" className="col-md-6">
                                Supplier Name
                              </label>
                              <div className="col-md-6">
                                <p className="text-muted">
                                  {productData.supplierName}
                                </p>
                              </div>
                            </div>
                            <div className="mb-3 row">
                              <label htmlFor="address" className="col-md-6">
                                Discount
                              </label>
                              <div className="col-md-6">
                                <h6 className="text-success text-uppercase">
                                  {productData.discountAmount}
                                </h6>
                              </div>
                            </div> */}
                          </div>
                        </div>

                        <div className="mb-3 row">
                          <h5 htmlFor="address" className="col-md-12">
                            Description
                          </h5>
                          <div className="col-md-12">
                            <p className="text-muted">
                              {productData?.description ? (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: productData?.description,
                                  }}
                                />
                              ) : (
                                ""
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="mb-3">
                          <h5 className="col-sm-2">QR Code</h5>
                          <div className="col-sm-10">

                            <div
                              style={{
                                height: "auto",
                                margin: "0 ",
                                maxWidth: 100,
                                width: "100%",
                              }}
                            >

                              {productData?.uniqueCode ? (
                                <div className="d-flex Qr-card">
                                  <span className="text-muted">
                                    {productData?.uniqueCode}
                                  </span>
                                  <img src={`${qrLink}`} alt="QR CODE" />
                                  <a
                                    href={`${qrLink}`}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-primary m-auto"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      Download Image
                                    </button>
                                  </a>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <Link
                        type="submit"
                        to="/Rentdress"
                        color="secondary"
                        className="btn btn-secondary"
                      >
                        Back
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Viewdress
