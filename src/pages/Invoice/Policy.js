import React, { useEffect } from "react";


import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Image
import logo from "../../assets/images/logo.png";
import sidepart from "../../assets/images/Invoice/desin.png";
import sidepart1 from "../../assets/images/Invoice/foot.png"

//redux


const Policy = () => {

  //meta title
  document.title = "Trend on Rent";

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice" />
          
            <div className="row">
              <div className="col-12">
                <div className="card card-in" >
                  <div className="card-body">
                    <div className="invoice-title ">
                    {/* <h4 className="float-end font-size-16">
                        Order # {invoiceDetail.orderId}
                      </h4> */}
                      {/* <div className="mb-4">
                        <img src={logo} alt="logo-dark" className="logo-dark-element" height="85" />
                       
                      </div> */}
                      <div className="mb-4">
                        <img src={sidepart} alt="logo-dark"  height="150"  style={{position:"absolute",top:"0",right:"0"}}/>
                       
                      </div>
                    </div>
                    
                    <div className="policy" >
                        <h3 className="heading_in1">Policy</h3>
                        <ul>
                            <li>Event Date Change Policy: Change your event date at no extra charge if available. Choose another dress of equal or higher cost if the original dress is unavailable. No refunds for lower-cost dresses.</li>
                        <li>Date Change Intimation Policy: Notify us at least 3 days prior to pickup to change the date without charge. Within 3 days, a 50% rental charge applies, and full rent is charged for new dates.
</li>
<li> Dress Damage Policy: Handle dresses with care. We assess damage for free repairs. Customer pays repair costs if applicable. Unrepairable damage incurs a purchase fee, generally 5 times or more the rental amount.</li>
<li>Dress Loss Policy: Customers pay for lost dresses, generally 5 times or more the rental amount.
</li>
<li>Dress Condition and Stains Policy: Dresses are dry cleaned but may have minor visible stains. Inspect carefully before renting and discuss visible stains with staff before payment.</li>
<li>Return and Late Return Policy: Return dresses on time. Late returns may have consequences. Delays or damage may affect providing the dress to the next customer. We offer alternative solutions or full refunds if unsatisfied.</li>
                        </ul>
                    </div>
                  
                    <div className="mb-4">
                        <img src={sidepart1} alt="logo-dark"  height="150"  style={{position:"absolute",bottom:"0",left:"0",zIndex:"0"}}/>
                       
                      </div>
                  </div>
                </div>
              </div>
            </div>
     
        </div>
      </div>
    </>
  );
};


export default Policy;
