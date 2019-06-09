import React from "react";
import axios from "axios"
import "./Destination_Form.css";
// import "./components/style.css";

import { Redirect, Link } from "react-router-dom";


class Destination_Form extends React.Component {
  state = {
    location: "",
    destination: "",
    fictionalLocation: "1 Dr Carlton B Goodlett Pl, San Francisco, CA 94102",
    fictionalDestination: "1 The Embarcadero, San Francisco, CA 94105",
  };

  handleInputChange = event => {
    console.log("hello from input change")
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // event.preventDefault();
    // if (!this.state.username) {
    //   alert("You cannot leave the username field blank!")
    //   return
    // }
    // if (!this.state.day) {
    //   alert("You cannot leave the day field blank!")
    //   return
    // }
    // if (!this.state.month) {
    //   alert("You cannot leave the month field blank!")
    //   return
    // }
    // if (!this.state.year) {
    //   alert("You cannot leave the year field blank!")
    //   return
    // }
    // if (!this.state.city) {
    //   alert("You cannot leave the city field blank!")
    //   return
    // }
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
        // sunResponse = res.data[0].sign
        // moonResponse = res.data[1].sign
        // ascendantResponse = res.data[10].sign
        // this.setState({ sun: astrology[sunResponse].Sun, moon: astrology[moonResponse].Moon, ascendant: astrology[ascendantResponse].Ascendant, allSun: astrology[sunResponse].All, allMoon: astrology[moonResponse].All, allAscendant: astrology[ascendantResponse].All })
        // console.log(res.data)
        // this.setState({
        //   submitted: true
        // });
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
        <div class="navigationBar">
          Navigation Bar
        </div>
        <div class="map">
          Navigation Map
        </div>
        <div class="formSection">
          <div class="formFrame">
            <form>  
              <div className="form-group">
                <div>Location</div>
                <input size="30" name="location" className="form-control" placeholder="Current Location" value={this.state.location} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <div>Destination</div>
                <input size="30" name="destination" className="form-control" placeholder="Where to?" value={this.state.destination} onChange={this.handleInputChange} />
              </div>
              <Link to="/Options" >
              <button class="btn btn-success" onClick={this.handleFormSubmit} type="submit" className="btn btn-lg btn-danger float-right">
                Let's go!
              </button> 
              </Link>
          </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Destination_Form;