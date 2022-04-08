import React from 'react'
import "./Pricing.css";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Pricing = () => {
    return (
        <div className="App">
          <div className="table centered">
            <div className="row">
              <div className="column">
                <ul className="price">
                  <li className="header">
                    <br />
                    <br />
                    Optical visualization
                  </li>
                  <li>Open ended survey</li>
                  <li>Ranged survey</li>
                  <li>Multi Choice survey</li>
                  <li>No ads</li>
                  <li>Unlimited survey storage</li>
                </ul>
              </div>
    
              <div className="column">
                <ul className="price">
                  <li className="header">
                    Community
                    <br />
                    <div className="button_cont" align="center">
                      <a className="btn" target="_blank" rel="nofollow noopener">
                        $0
                      </a>
                    </div>
                  </li>
                  <li>
                    <FaCheck color="green" />
                  </li>
                  <li>
                    <FaCheck color="green" />
                  </li>
                  <li>
                    <FaCheck color="green" />
                  </li>
                  <li>
                    <ImCross color="red" />
                  </li>
                  <li>
                    <ImCross color="red" />
                  </li>
                  <li>
                    <ImCross color="red" />
                  </li>
                </ul>
              </div>
    
              <div className="column">
                <ul className="price">
                  <li className="header">
                    Professional
                    <br />
                    <div className="button_cont" align="center">
                      <a className="btn" target="_blank" rel="nofollow noopener">
                        $ 4.99
                      </a>
                    </div>
                  </li>
                  <li>
                    <FaCheck color="green" />
                  </li>
                  <li>
                    <FaCheck color="green" />
                  </li>
                  <li>
                    <FaCheck color="green" />
                  </li>
                  <li>
                    <FaCheck color="green" />
                  </li>
                  <li>
                    <ImCross color="red" />
                  </li>
                  <li>
                    <ImCross color="red" />
                  </li>
                </ul>
              </div>
    
              <div className="column">
                <ul className="price">
                  <li className="header">
                    Premium
                    <br />
                    <div className="button_cont" align="center">
                      <a className="btn" target="_blank" rel="nofollow noopener">
                        $19.99
                      </a>
                    </div>
                  </li>
                  <li>
                    <FaCheck color="green" />
                  </li>
                  <li>
                    <FaCheck color="green" />
                  </li>
                  <li>
                    <FaCheck color="green" />
                  </li>
                  <li>
                    <FaCheck color="green" />
                  </li>
                  <li>
                    <FaCheck color="green" />
                  </li>
                  <li>
                    <FaCheck color="green" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default Pricing