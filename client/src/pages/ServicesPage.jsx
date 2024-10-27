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
                            <p className={`text-font-contact ${theme.mod.contrastText}`}>
                                Ofer servicii complete de fotografie pentru evenimente importante
                                din viața ta, surprinzând momentele cele mai valoroase într-un stil
                                unic și profesional. Fie că este vorba de o nuntă, un botez sau alte
                                ocazii speciale, sunt aici pentru a crea amintiri memorabile.</p>
                        </div>

                        <div className='row g-3 md:g-0'>
                            <div className='col-12 col-lg-6 text-center card-mod'>
                                <section className='card-services'>
                                    <p className='title-mod'>PACHET PRINCIPAL</p>
                                    <span>€ 800</span>
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
                            <p className={`text-font-contact ${theme.mod.contrastText}`}>
                                Personalizează pachetul în funcție de nevoile tale cu opțiunile suplimentare de mai jos.
                                Alege să adaugi momente speciale precum fotografii la Starea Civilă,
                                o ședință „Save the Date” sau un album premium.
                            </p>
                            <h5 className='md-lp'>Opțiuni</h5>

                            <ul className={`text-font-contact  ul-set ${theme.mod.contrastText}`}>
                                <li>Servicii video + 600€</li>
                                <li>Fotografii la Starea Civilă + 150€</li>
                                <li>Fotografii Ceremonie Botez + 150€</li>
                                <li>Ședință foto "Save the Date" + 250€</li>
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