import React from 'react';
import Header from '../containers/Header';
import Footer from '../components/Footer';
import { useTheme } from "../scripts/useTheme";

import Photo from "../components/photo/fotonunta.webp";

import './albumDetails.css';

const Services = () => {


    const theme = useTheme();

    return (
        <>

            <div className={theme.mod.bgB}>


                <Header
                    theme={theme}
                    fileMod={theme.mod.bgHeader}
                />

                <section className="container">

                    <div className='my-5'>

                        <h3 className={`title-font `}>
                            Servicii
                            <hr className={`${theme.mod.bg} pt-1 mx-1`} />

                        </h3>
                        <div className="mb-4 text-left fs-5">
                            <p className={`text-font-contact ${theme.mod.contrastText}`}>Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Vestibulum eu scelerisque purus. Fusce nisi nisl,
                                finibus sit amet lectus quis, consectetur porttitor mauris. Donec gravida.</p>
                        </div>

                        <div className='row g-3 md:g-0'>
                            <div className='col-12 col-lg-6 text-center card-mod'>
                                <section className='card-services'>
                                    <p className='title-mod'>PACHET PRINCIPAL</p>
                                    <span>€ 1500</span>
                                    <p>Fotograf principal și fotograf secundar</p>
                                    <p>Maxim 12 ore de acoperire a evenimentului</p>
                                    <p>Pregătirea mirilor</p>
                                    <p>Ceremonie religioasă/umanistă</p>
                                    <p>Ședința foto cu mirii și invitații</p>
                                    <p>Petrecere (până în ultimul moement sau ora 0:00)</p>
                                    <p>Aproximativ 800 de fotografii editate în stil propriu</p>
                                    <p>Livrare fotografii online în maxim 7 zile</p>

                                </section>
                            </div>
                            <div className='col-12 col-lg-6 relative'>
                                <img className='photo-services' alt="poza-servicii" src={Photo} />
                                <a className='services-button' href="tel:+447448525250">CONTACTEAZĂ-MĂ PENTRU O OFERTĂ</a>
                            </div>

                        </div>
                        <div className="mt-4 text-left fs-5">
                            <p className={`text-font-contact ${theme.mod.contrastText}`}>Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Vestibulum eu scelerisque purus. Fusce nisi nisl,
                                finibus sit amet lectus quis, consectetur porttitor mauris. Donec gravida.</p>
                            <h5 className='md-lp'>Opțiuni</h5>

                            <ul className={`text-font-contact  ul-set ${theme.mod.contrastText}`}>
                                <li>Fotografii la Starea Civilă + 150€</li>
                                <li>Fotografii Ceremonie Botez + 150€</li>
                                <li>Ședință foto "Save the Date" 300€</li>
                                <li>Album foto premium 20x25 cm, 15 file + 300€</li>
                            </ul>
                        </div>



                    </div>
                </section>

                <section className='services-band'>

                </section>


                <Footer
                    theme={theme}
                />


            </div>


        </>
    )
}

export default Services;