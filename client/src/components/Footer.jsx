import React from "react";
import logo from "./photo/logo-ursu.png";
import { Link } from 'react-router-dom';
import './details.css'
import { routesBase } from "../scripts/routes";

import Logo2 from "./photo/logoUrsuFooter.webp";

const Footer = (props) => {

    const theme = props.theme.mod;

    const style = {
        creator: {
            backgroundColor: 'rgb(28 31 29)',
        }
    }

    return (
        <footer className={`pt-3 ${theme.bgHeader}`}>
            <div className="container">
                <div className="row">
                    <Link to={routesBase.home} className="text-decoration-none col-12 col-md-4  d-flex align-items-center justify-content-center flex-column flex-md-row justify-content-md-start ps-2">
                        <img
                            className="img-fluid"
                            src={Logo2}
                            alt="logo"
                            width={"280px"}>
                        </img>

                        {/*    <span
                            className="text-font text-light ms-md-1"
                        >Fotograf Ursu Ioan
                        </span>
*/}
                    </Link>
                    <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
                        <ul className="text-center p-0 py-3 py-md-0 m-0">
                            <li>
                                <small
                                    className="text-white"
                                ><a className="text-white" href="tel:+44 7448 525250">+44 7448 525250</a>
                                </small>
                            </li>
                            <li>
                                <small
                                    className="text-white">
                                    <a className="text-white" href="mailto:ursuioan33@yahoo.com">ursuioan33@yahoo.com</a>
                                </small>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end align-items-center">
                        <ul className="p-0 m-0">
                            <li>
                                <a
                                    aria-label="instagram"
                                    href="https://www.instagram.com/ursuioan_fotograf.ro/"
                                    type="button"
                                    target="_blank"
                                    className="btn text-light zxcv">
                                    <i
                                        className="fa-brands fa-instagram fa-xl">
                                    </i>
                                </a>

                                <a
                                    className="text-white btn text-light zxcv"
                                    aria-label="Chat on WhatsApp"
                                    href="https://wa.me/447448525250"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i class="fa-brands fa-whatsapp fa-xl"></i>
                                </a>


                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/*  <div className={`${theme.creator} mt-3 py-3`}>
                <div className="container d-flex justify-content-center justify-content-md-start">
                    <p className="m-0 ">Realizat de <a className="text-success" href='https://www.instagram.com/costelmartinescu/'>Costel Martinescu</a></p>
                </div>
            </div>*/}
        </footer>
    );
}

export default Footer;