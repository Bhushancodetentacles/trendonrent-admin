import React from "react"
import { Container, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={12}>{new Date().getFullYear()} © <span className="text-primary">Trend on Rent</span> | Developed by <Link to="https://codetentaclestechnologies.com/" target="_blank" className="text-success">CodetentaclesTechnologies</Link>


</Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
