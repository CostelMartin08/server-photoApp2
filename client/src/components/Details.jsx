import React from 'react';
import './details.css'


const Details = (props) => {

    const theme = props.theme.mod;

    return (
        <section className={theme.bgHeader}>
            <div className='container py-3'>
                <div className="row">
                    <div className='col-12 col-md-6 d-flex align-items-center justify-content-left p-0 ' >
                        <div className='m-3'>
                            <h2 className='mt-2 title-font text-light'>Despre mine</h2>
                            <hr className={`${theme.bg} pt-1 mx-1`}></hr>
                            <p className='text-font text-light'>
                                Una dintre cele mai mari pasiuni ale mele este fototgrafia. Această pasiune “s-a născut” oarecum din dorința de a reda simplului valoarea și frumusețea lui, de a-l readuce la viață prin fotografie; de a captura momentele unice, cu încărcătură emoțională pentru clienții mei.
                                Cred ca amintirile se păstrează vii și cel mai frumos in fotografii; de aceea, am ales acest drum și mi-am dezvoltat această pasiune.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                        <picture id="picture">
                            <img className='photo my-4' src='/uploads/me.webp' alt="foto Ursu Ioan" />
                        </picture>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Details;