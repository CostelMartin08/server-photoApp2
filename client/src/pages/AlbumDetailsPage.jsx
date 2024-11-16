import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loaders from '../components/Loaders';
import Header from '../containers/Header';
import AddNewPhoto from '../containers/AddNewPhoto';
import Footer from '../components/Footer';
import { urlBase } from '../scripts/url';
import './albumDetails.css';
import { useTheme } from '../scripts/useTheme';
import PhotoSet from '../containers/ManagingPhotos';
import ScrollPhotos from '../containers/ScrollPhotos';

import { Helmet } from 'react-helmet-async';

const AlbumDetails = () => {

    const { title } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const param = location.pathname.split('/');
    const theme = useTheme();
    const paramS = param[2];
    const [loading, setLoading] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [dataBrut, setDataBrut] = useState({});
    const [value, setValue] = useState(false);
    const data = dataBrut.title === title;



    useEffect(() => {

        if (!data) {
            const timer = setTimeout(() => {
                navigate("/notFound");
            }, 5000);

            return () =>

                clearTimeout(timer);
        }
    }, [dataBrut, data, navigate]);

    const getData = async (even, title) => {

        try {
            const response = await fetch(`${urlBase}/galerie/${even}/${title}`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setDataBrut(data);
                setValue(false);
            } else {
                const errorData = await response.json();
                console.error("Eroare:", response.status, errorData.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        getData(paramS, title);


    }, [paramS, title, value]);


    function capitalizeFirstLetter(paramS) {
        if (typeof paramS !== 'string' || paramS.length === 0) {
            return paramS;
        }
    
        paramS = paramS.replace(/-/g, ' ');
    
        return paramS
            .split(' ')  
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
            .join(' ');
    }
    
    return (
        <>
            <Helmet>
                <title>{`${capitalizeFirstLetter(paramS)} - ${title}`}</title>
                <meta name="description" content='Transform pasiunea pentru fotografie în amintiri de neuitat. Specializat în portrete expresive și momente unice de nuntă, capturez emoții autentice și frumusețea fiecărui moment.' />
            </Helmet>
            <section
                className={theme.mod.bgB}>

                <Header
                    theme={theme}
                    fileMod={theme.mod.bgHeader}
                />

                <main
                    className={`${theme.mod.bgB}`}>

                    {data && dataBrut ? (

                        <>

                            {openModal && (

                                <ScrollPhotos
                                    dataBrut={dataBrut}
                                    setSlideNumber={setSlideNumber}
                                    slideNumber={slideNumber}
                                    setOpenModal={setOpenModal}
                                    param={param}
                                />

                            )}

                            <div>


                                <PhotoSet

                                    loading={loading}
                                    setLoading={setLoading}
                                    dataBrut={dataBrut}
                                    param={param}
                                    setSlideNumber={setSlideNumber}
                                    setOpenModal={setOpenModal}
                                    refresh={setValue}


                                />

                                <AddNewPhoto
                                    theme={theme}
                                    data={dataBrut}
                                    refresh={setValue}
                                />

                            </div>

                        </>

                    ) :
                        <Loaders />
                    }
                </main>

                <Footer
                    theme={theme}
                />

            </section >
        </>
    );
}

export default AlbumDetails;
