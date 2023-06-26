import React from "react"
import { useNavigate } from "react-router-dom"
import error from "../../assets/error.png";
import { isBrowser } from "../../utils/utils";
const NotFound = () => {
  const navigate = useNavigate()
  const logout = () => {
    if(isBrowser()){
      
      localStorage.removeItem("accessToken")
      localStorage.removeItem("authUser")
    }
    navigate("/login")
  }
  return (
    <>
      <div className="account-pages pt-2">
        {/* <div className="bg-white h-full d-flex justify-content-center  my-5 pt-5"> */}
        <div className=" container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center mb-5">
                <h1 className="display-2 fw-medium">Whoops!</h1>
                <h4 className="text-capitalize">This page is Unavailable.</h4>
                <div className="mt-5 text-center">
                  <a className="btn btn-primary waves-effect waves-light " onClick={() => navigate("/dashboard")}>Back to Dashboard</a>
                  <div
                    className="py-6 text-primary underline decoration-primary cursor-pointer"
                    onClick={logout}
                  >
                    or log out
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-content-center row">
            <div className="col-md-8 col-xl-6"><div>
              <img src={error} alt="" className="img-fluid" />
            </div>
            </div>
            </div>


          {/* <div className="px-8 py-8">
            <div className="h3">Whoops!</div>
            <div className="h3">This page is Unavailable.</div>
            <div className="text-gray-900 pt-8">
              You don't have access to this Workspace or it doesn't exist
              anymore.
            </div>
            <div
              className="pt-12 btn btn-primary btn-lg"
              onClick={() => navigate("/dashboard")}
            >
              Go Back Home
            </div>
            <div
              className="py-6 text-primary underline decoration-primary cursor-pointer"
              onClick={logout}
            >
              or log out
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}
export default NotFound
