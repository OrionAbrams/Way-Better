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
    event.preventDefault();
    var userData = {
      location: this.state.location.trim(),
      destination: this.state.destination.trim()
    }
    console.log(userData)
    axios.post("/api/astrology", userData)
      .then((res) => {
        console.log(res)
      })
  };

  render() {
    return (
      <div>
        <div class="navigationBar">
          <div class="userImage">

          </div>
        </div>
        <div class="map">
        </div>
        <div class="formSection aqua-gradient">
          <div class="formFrame">
            <form>  
              <div className="form-group flex-row">
                <div>Location</div>
                <input size="30" name="location" className="form-control" placeholder="Current Location" value={this.state.location} onChange={this.handleInputChange} />
              </div>
              <div className="form-group flex-row">
                <div>Destination</div>
                <input size="30" name="destination" className="form-control" placeholder="Where to?" value={this.state.destination} onChange={this.handleInputChange} />
              </div>
          
              
                <button onClick={this.handleFormSubmit} type="submit" className="btn btn-lg btn-light float-right">
                    Let's go!
                </button> 
                <Link to="/Options">
                  ->
                </Link>
          </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Destination_Form;