import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"
import axios from "axios"

//redux
import { useSelector, useDispatch } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

// actions
import {
  apiError,
  loginSuccess,
  loginUser,
  socialLogin,
} from "../../store/actions"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/logo.svg"
import { post } from "helpers/api_helper"

//Import config

const Login = props => {
  const navigate = useNavigate()
  //meta title
  document.title = "Trend on Rent"

  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      userName: "admin" || "",
      password: "admin" || "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Please Enter Your User Name").max(50),
      password: Yup.string().required("Please Enter Your Password").max(10),
    }),
    onSubmit: async data => {
      // dispatch(loginUser(values, props.router.navigate));
      try {
        const res = await post("/Admin/login", data)
        const result = await res.data
        localStorage.setItem("authUser", result.admin.username)
        localStorage.setItem("accessToken", result.admin.tokenId)
        // dispatch(loginUser(values, props.router.navigate));
        dispatch(loginSuccess(res))
        navigate("/dashboard")
      } catch (error) {
        dispatch(apiError(error))
        throw error
      }
    },
  })

  const { error } = useSelector(state => state.Login)

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.router.navigate, type))
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.router.navigate, type))
    }
  }

  //handleGoogleLoginResponse
  const googleResponse = response => {
    signIn(response, "google")
  }

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  const facebookResponse = response => {
    signIn(response, "facebook")
  }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card overflow-hidden">
                <div className="bg-primary bg-soft">
                  <div className="row">
                    <div className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Trend on Rent.</p>
                      </div>
                    </div>
                    <div className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div>
                    <Link to="/" className="logo-light-element">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      {/* {error ? <Alert color="danger">{error}</Alert> : null} */}
                      {error ? (
                        <p className="alert alert-danger ">
                          {" "}
                          {error?.response.data?.message}{" "}
                        </p>
                      ) : (
                        ""
                      )}

                      <div className="mb-3">
                        <label className="form-label">User Name</label>
                        <input
                          name="userName"
                          className="form-control"
                          placeholder="Enter user name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.userName || ""}
                          onInvalid={
                            validation.touched.userName &&
                            validation.errors.userName
                              ? true
                              : false
                          }
                        />
                        {/* {validation.touched.userName && validation.errors.userName ? (
                          <FormFeedback type="invalid">{validation.errors.userName}</FormFeedback>
                        ) : null} */}
                        {validation.errors.userName &&
                          validation.touched.userName && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {validation.errors.userName}{" "}
                            </span>
                          )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          className="form-control"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          onInvalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {/* {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null} */}
                        {validation.errors.password &&
                          validation.touched.password && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {validation.errors.password}{" "}
                            </span>
                          )}
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
