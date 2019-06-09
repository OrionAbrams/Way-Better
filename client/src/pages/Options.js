import React, {Component} from "react";
import axios from "axios"
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Redirect, Link } from "react-router-dom";
import './Options.css';

class Options extends Component {
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
                    </form>
                 </div>
            </div>
                <p>**destination points here from home page**</p>
                <h1>
                    Your options today are:
                </h1>
                <ul type="none">
                    <li>
                        Bus option
                    </li>
                    <li>
                        Train option
                    </li>
                    <li>
                        walk/ bike option
                    </li>
                    <li>
                        uber option
                    </li>
                </ul>
           
            </div>
    );
    }
}

export default Options;