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
                            <p className='ms-3 text-font text-light'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Curabitur porta risus quis felis ullamcorper posuere.
                                Maecenas sit amet tempus est. Phasellus non accumsan turpis,
                                ac sagittis nisi. Nullam lacus nisl, dapibus vel sodales ac,
                                imperdiet quis risus. Integer nec est orci. Maecenas bibendum
                                pretium arcu et congue. Sed non tortor leo.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                        <picture id="picture">
                            <img className='photo my-4' src="/uploads/me.webp" alt="foto Ursu Ioan" />
                        </picture>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Details;