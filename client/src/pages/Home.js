// *** Include Modules: npm (react, mdbreact), /utils
import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from "axios"
import astrology from "./astrology"
console.log(astrology)

//to add bold in JSX
const B = (props) => <div style={{ fontWeight: 'bold' }}>{props.children}</div>

// import { Redirect } from "react-router-dom";
var sunResponse = ""
var moonResponse = ""
var ascendantResponse = ""

class Home extends React.Component {
  state = {
    username: "",
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    city: "",
    state: "",
    sun: "",
    moon: "",
    allSun: "",
    allMoon: "",
    allAscendant: "",
    ascendant: "",
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
    if (!this.state.username) {
      alert("You cannot leave the username field blank!")
      return
    }
    if (!this.state.day) {
      alert("You cannot leave the day field blank!")
      return
    }
    if (!this.state.month) {
      alert("You cannot leave the month field blank!")
      return
    }
    if (!this.state.year) {
      alert("You cannot leave the year field blank!")
      return
    }
    if (!this.state.city) {
      alert("You cannot leave the city field blank!")
      return
    }
    var userData = {
      username: this.state.username.trim(),
      day: parseInt(this.state.day),
      month: parseInt(this.state.month),
      year: parseInt(this.state.year),
      hour: parseInt(this.state.hour),
      minute: parseInt(this.state.minute),
      city: this.state.city.trim(),
      state: this.state.state.trim()
    }
    console.log(userData)
    axios.post("/api/astrology", userData)
      .then((res) => {
        console.log(res)
        sunResponse = res.data[0].sign
        moonResponse = res.data[1].sign
        ascendantResponse = res.data[10].sign
        this.setState({ sun: astrology[sunResponse].Sun, moon: astrology[moonResponse].Moon, ascendant: astrology[ascendantResponse].Ascendant, allSun: astrology[sunResponse].All, allMoon: astrology[moonResponse].All, allAscendant: astrology[ascendantResponse].All })
        // we need signs for res.data 0-10: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Uranus, Neptune, Pluto, Ascendant
        // alert("Your sun is " + res.data[0].normDegree + " degrees")
        // alert("Your moon is " + res.data[1].normDegree + " degrees")
        // alert("Your ascendant is " + res.data[10].normDegree + " degrees")
        console.log(res.data)
        this.setState({
          submitted: true
        });
        // this.setRedirect();
        // this.renderRedirect();
      })
  };

  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   })
  // }

  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to="/api/astrology" />
  //   }
  // }

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
                    <div>Username</div>
                    <input size="30" name="username" className="form-control" placeholder="Your Username" value={this.state.username} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <div>Month of Birth (number)</div>
                    <input size="30" name="month" className="form-control" placeholder="Month of Birth" value={this.state.month} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <div>Day of Birth</div>
                    <input size="30" name="day" className="form-control" placeholder="Day of Birth" value={this.state.day} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <div>Year of Birth (xxxx) </div>
                    <input size="30" name="year" className="form-control" placeholder="Year of Birth" value={this.state.year} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <div>Hour of Birth (1-24)</div>
                    <input size="30" name="hour" className="form-control" placeholder="Hour of Birth" value={this.state.hour} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <div>Minute of Birth (0-59)</div>
                    <input size="30" name="minute" className="form-control" placeholder="Minute of Birth" value={this.state.minute} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <div>City of Birth</div>
                    <input size="30" name="city" className="form-control" placeholder="City of Birth" value={this.state.city} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <div>State or Territory of Birth</div>
                    <input size="30" name="state" className="form-control" placeholder="State/Territory of Birth" value={this.state.state} onChange={this.handleInputChange} />
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
          {this.state.sun ? <div><B>Here is your nutritional advice based on your astrological chart. Your sun is {sunResponse}, your moon is {moonResponse}, your ascendant is {ascendantResponse}.</B></div> : null}
          <br></br>
          {this.state.ascendant ? <div><div><B>{ascendantResponse} Ascendant Qualities:</B></div> {this.state.ascendant}</div> : null}
          {this.state.sun ? <div><B>{sunResponse} Sun Health Problems: </B>{this.state.sun}</div> : null}
          {this.state.moon ? <div><B>{moonResponse} Moon Recommendations: </B>{this.state.moon}</div> : null}
          {this.state.allSun ? <div><B>{sunResponse} Sun Recommended Foods: </B>{this.state.allSun}</div> : null}
          {this.state.allMoon ? <div><B>{moonResponse} Moon Recommended Foods: </B>{this.state.allMoon}</div> : null}
          {this.state.allAscendant ? <div><B>{ascendantResponse} Ascendant Recommended Foods: </B>{this.state.allAscendant}</div> : null}
        </MDBContainer>
      </div>
    );
  }
}
export default Home;
