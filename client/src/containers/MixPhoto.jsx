import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlBase } from "../scripts/url";
import { routesBase } from "../scripts/routes";


const MixPhoto = (props) => {


    const imageBaseUrl = "https://ursu-ioan-fotograf.ro/images/";
    const classNm = 'position-absolute text-light end-0 bottom-0 card-font me-4 mb-3 h5';
    const theme = props.theme.mod;
    const [data, setdata] = useState([]);
    const [final, setfinal] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${urlBase}/allContent`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setdata(data);
                setfinal(true);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        return () => {
            setdata([]);
            setfinal(false);
        };
    }, []);




    return (
        <section className={`mod-gradi ${theme.bgB}`}>
            <div className="container d-flex flex-column align-items-left pt-3">
                <h2 className={`title-font h3 ${theme.contrastText}`} >
                    Ce îți ofer eu ca fotograf
                    <hr className={`${theme.bg} pt-1`} />
                </h2>
            </div>

            {final ?
                <div className="mx-auto container row g-5">
                    <div className="col-12  ">
                        <div className="row justify-content-center justify-content-lg-left align-items-center">
                            <div className="col-lg-6 ">
                                <Link
                                    className="cardMix  shadow"

                                    to={`${routesBase.portofoliuFotoNunti}/${data[0].title ? data[0].title : routesBase.portofoliuFotoNunti}`}>
                                    <img
                                        className="full-width-imageMix"
                                        src={`${imageBaseUrl}nunti/${data[0].title}/${data[0].content}`}
                                        alt={`${data[0].title}`} />
                                    <span
                                        className={classNm}
                                        aria-label={data[0].title}>
                                        {data[0].title}
                                    </span>
                                </Link>
                            </div>
                            <div className="col-lg-6 g-3 text-center">
                                <h2 className="text-md-left card-font ">Fotografie de Nuntă</h2>
                                <p className="text-font-mix text-md-left">

                                    O nuntă marchează un moment unic și profund în viața unui cuplu,
                                    o zi plină de emoții și momente de neuitat. Pentru a surprinde
                                    autenticitatea fiecărui zâmbet și fiecărui gest, este necesar
                                    ca fotograful să înțeleagă importanța fiecărui detaliu și să
                                    lucreze cu pasiune. Îmi dedic toată atenția și energia pentru ca
                                    fiecare cadru să reflecte frumusețea și naturalețea zilei voastre
                                    speciale, creând imagini care vor spune, peste ani, povestea voastră
                                    exact așa cum a fost trăită.

                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12  g-5">
                        <div className="row align-items-center flex-md-row-reverse ">

                            <div className="col-lg-6  position-relative">
                                <Link
                                    className="cardMix shadow "

                                    to={`${routesBase.portofoliuFotoPortrete}/${data[1].title ? data[1].title : routesBase.portofoliuFotoPortrete}`}>
                                    <img
                                        className="full-width-imageMix"
                                        src={`${imageBaseUrl}portrete/${data[1].title}/${data[1].content}`}
                                        alt={`${data[1].title}`} />
                                    <span
                                        className={classNm}
                                        aria-label={data[1].title}>
                                        {data[1].title}
                                    </span>
                                </Link>
                            </div>

                            <div className="col-lg-6 g-3 text-center">
                                <h2 className="text-md-left card-font ">Fotografie tip Portret</h2>
                                <p className="text-md-left text-font-mix">
                                    Fotografia de portret este o artă care capturează nu doar trăsăturile fizice,
                                    ci și esența și personalitatea subiectului. Scopul meu este să creez imagini
                                    care să transmită autenticitate, emoție și profunzime, surprinzând fiecare
                                    expresie și detaliu care fac persoana unică. Fiecare ședință foto este o
                                    colaborare, o experiență confortabilă și naturală, în care mă asigur că
                                    atmosfera permite fiecărui portret să devină o reflecție sinceră și
                                    expresivă a persoanei din fața camerei.
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="col-12 g-5  ">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-6">
                                <Link
                                    className="cardMix shadow"

                                    to={`${routesBase.sedinteFoto}/${data[2].title ? data[2].title : routesBase.sedinteFoto}`}>
                                    <img
                                        className="full-width-imageMix"
                                        src={`${imageBaseUrl}fotografii-de-familie/${data[2].title}/${data[2].content}`}
                                        alt={`${data[2].title}`} />
                                    <span
                                        className={classNm}
                                        aria-label={data[2].title}>
                                        {data[2].title}
                                    </span>
                                </Link>
                            </div>
                            <div className="col-lg-6 g-3 text-center">
                                <h2 className="text-md-left card-font ">Fotografie de Familie</h2>
                                <p className="text-md-left text-font-mix">
                                    Fotografia de familie înglobează esența legăturilor voastre,
                                    capturând momentele pline de bucurie și dragoste. Fiecare imagine
                                    spune o poveste despre râs și conexiune, transformând clipele
                                    trecătoare în amintiri de neuitat.
                                </p>
                            </div>
                        </div>
                    </div>

                </div> : null}

            <div className="container d-flex justify-content-end text-center mt-3 ">
                <Link
                    to={routesBase.portofoliuFotoNunti}
                    className='cta me-3 me-md-0 mb-3 text-decoration-none'>
                    <span className={`${theme.contrastText} pe-0 hover-underline-animation text-font fs-6`}> Vezi mai multe </span>

                </Link>
            </div>
        </section>
    );
};

export default MixPhoto;
