import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import './Options.css';

class Options extends Component {

    

    render() {
        return (
            
            <div>
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