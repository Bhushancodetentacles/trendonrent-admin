import React from 'react'

function Policy() {
  return (
    <>
      <section>
        <div className='container'>
          <div className="row mx-auto justify-content-center"  >
            <div className="col-md-8">
            <div className="policy_page">
                <h3 className="heading_in2">Policy</h3>
                <ul className='policy_ul'>
                  <li>
                    Event Date Change Policy: Change your event date at no
                    extra charge if available. Choose another dress of
                    equal or higher cost if the original dress is
                    unavailable. No refunds for lower-cost dresses.
                  </li>
                  <li>
                  Date Change Intimation Policy: Notify us at least 3
                    days prior to pickup to change the date without
                    charge. Within 3 days, a 50% rental charge applies,
                    and full rent is charged for new dates.
                  </li>
                  <li>
                    {" "}
                    Dress Damage Policy: Handle dresses with care. We
                    assess damage for free repairs. Customer pays repair
                    costs if applicable. Unrepairable damage incurs a
                    purchase fee, generally 5 times or more the rental
                    amount.
                  </li>
                  <li>
                    Dress Loss Policy: Customers pay for lost dresses,
                    generally 5 times or more the rental amount.
                  </li>
                  <li>
                    Dress Condition and Stains Policy: Dresses are dry
                    cleaned but may have minor visible stains. Inspect
                    carefully before renting and discuss visible stains
                    with staff before payment.
                  </li>
                  <li>
                    Return and Late Return Policy: Return dresses on time.
                    Late returns may have consequences. Delays or damage
                    may affect providing the dress to the next customer.
                    We offer alternative solutions or full refunds if
                    unsatisfied.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Policy
