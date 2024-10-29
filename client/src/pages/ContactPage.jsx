import React, { useEffect, useState } from "react";
import Header from "../containers/Header";
import Footer from "../components/Footer";
import FormMessage from "../components/FormMessage";
import { urlBase } from "../scripts/url";
import { useTheme } from "../scripts/useTheme";
import './albumDetails.css';

import LargePhoto from './backPhoto.webp';
import SmallPhoto from './photoSecond.webp';

import LargePhotoW from './backPhotoWhite.webp';
import SmallPhotoW from './photoSecondWhite.webp';

const ContactPage = () => {

    const [formData, setFormData] = useState({
        nume: ' ',
        email: '',
        telefon: '',
        subiect: ' ',
        data: ' ',
        mesaj: ' ',
    });
    const [clean, setClean] = useState(false);
    const [view, setView] = useState(false);
    const theme = useTheme();



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const submitEvent = (e) => {
        e.preventDefault();

        fetch(`${urlBase}/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
              //  console.log(data);
                setClean(true);
                setView(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }


    useEffect(() => {

        const initialFormData = {
            nume: '',
            email: '',
            telefon: '',
            subiect: '',
            data: '',
            mesaj: '',
        };

        setFormData(initialFormData);

        return () => {
            setClean(false);
        }
    }, [clean])


    return (
        <div className={theme.mod.bgB}>
            <Header
                theme={theme}
                fileMod={theme.mod.bgHeader}
            />

            <section className={`container`}>
                {!view ?
                    <div className="my-5">
                        <div className="">
                            <div className="d-flex flex-column align-items-left p-0">
                                <h3 className={`title-font `}>
                                    Informații Contact
                                    <hr className={`${theme.mod.bg} pt-1 mx-1`} />
                                </h3>
                            </div>
                            <div className="ms-2 text-left fs-5">
                                <p className={`text-font-contact ${theme.mod.contrastText}`}>

                                    Sunt bucuros să răspund tuturor întrebărilor tale! Indiferent dacă dorești să afli mai multe detalii
                                    despre pachetele noastre, să soliciți o ofertă personalizată sau să programezi o întâlnire, sunt aici
                                    pentru a te ajuta.
                                    Pentru a lua legătura cu mine, completează formularul de mai jos sau contactează-mă direct folosind
                                    informațiile de contact.

                                </p>
                            </div>
                        </div>

                        <div className="container row flex justify-between m-0">

                            <div className="col-lg-3 p-0 pt-4 lg:pt-0 relative text-center">


                                <picture className="dark-mode">
                                    <source media="(min-width: 992px)" srcSet={LargePhoto} />
                                    <source media="(max-width: 991px)" srcSet={SmallPhoto} />
                                    <img className="photo-photo" src={SmallPhoto} alt="img" />
                                </picture>
                                <picture className="white-mod">
                                    <source media="(min-width: 992px)" srcSet={LargePhotoW} />
                                    <source media="(max-width: 991px)" srcSet={SmallPhotoW} />
                                    <img className="photo-photo" src={SmallPhoto} alt="img" />
                                </picture>

                            </div>
                            <div className="col-1">

                            </div>

                            <div className="col-lg-8 d-flex flex-column gap-4 pt-4 md:pt-0 px-10" >

                                <div className="form-container my-auto ms-0 mx-2 md:mx-0 md:ms-5">
                                    <form
                                        onSubmit={submitEvent}
                                        className="form card-font mt-0">
                                        <div className="input-group mb-1">
                                            <label className={theme.mod.contrastText}
                                                htmlFor="nume">Numele Tău</label>
                                            <input
                                                className={`py-3 ${theme.mod.bgB}`}
                                                onChange={handleChange}
                                                name="nume"
                                                value={formData.nume}
                                                type="text"
                                                id="nume"
                                                required
                                            />
                                        </div>
                                        <div className="input-mode">
                                            <div className="input-group mb-1">
                                                <label className={theme.mod.contrastText}
                                                    htmlFor="email">Email</label>
                                                <input
                                                    className={`py-3 ${theme.mod.bgB}`}
                                                    onChange={handleChange}
                                                    name="email"
                                                    value={formData.email}
                                                    type="email"
                                                    id="email"
                                                    required />
                                            </div>
                                            <div className="input-group mb-1">
                                                <label className={theme.mod.contrastText}
                                                    htmlFor="tel">Telefon</label>
                                                <input
                                                    className={`py-3 ${theme.mod.bgB}`}
                                                    onChange={handleChange}
                                                    name="telefon"
                                                    value={formData.telefon}
                                                    type="tel"
                                                    id="tel"
                                                    required />
                                            </div>
                                        </div>
                                        <div className="input-group mb-1">
                                            <label className={theme.mod.contrastText}
                                                htmlFor="textarea">Mesaj</label>
                                            <textarea
                                                rows="5"
                                                className={theme.mod.bgB}
                                                onChange={handleChange}
                                                name="mesaj"
                                                value={formData.mesaj}
                                                type="text"
                                                id="textarea"
                                                maxLength={250} />
                                        </div>
                                        <button
                                            type="submit"
                                            className="sign mt-4">Trimite</button>
                                    </form>
                                </div>


                            </div>
                        </div>
                    </div> : <FormMessage />}
            </section>

            <Footer
                theme={theme}
            />
        </div>
    );
}

export default ContactPage;