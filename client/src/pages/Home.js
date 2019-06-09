// *** Include Modules: npm (react, mdbreact), /utils
import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from "axios"
import astrology from "./astrology"
console.log(astrology)

//to add bold in JSX
const B = (props) => <div style={{ fontWeight: 'bold' }}>{props.children}</div>

// import { Redirect } from "react-router-dom";

class Home extends React.Component {
  state = {
    startPoint: "",
    endPoint: "",
    submitted: false,
    redirect: false
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    var userData = {
      startpoint: this.state.startPoint.trim(),
      endpoint: this.state.endPoint.trim()
    }
    console.log(userData)
    axios.post("/api/astrology", userData)
      .then((res) => {
        console.log(res)
        console.log(res.data)
        this.setState({
          submitted: true
        });
      })
  };

  render() {
    return (
      <div >
        <MDBContainer>
          <MDBRow>
            <MDBCol md="4"></MDBCol>
            {this.state.submitted ? null : (
              <MDBCol md="4">
                <form className="form">
                  <div className="form-group">
                    <div>Start location</div>
                    <input size="30" name="startPoint" className="form-control" placeholder="starting location" value={this.state.startPoint} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <div>End location</div>
                    <input size="30" name="endPoint" className="form-control" placeholder="ending location" value={this.state.endPoint} onChange={this.handleInputChange} />
                  </div>
                  <button onClick={this.handleFormSubmit} type="submit" className="btn btn-lg btn-danger float-right">
                    Submit
                </button>
                  {/* { this.renderRedirect() } */}
                </form>
              </MDBCol>
            )}
            <MDBCol md="4"></MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
export default Home;
