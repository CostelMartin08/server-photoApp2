import React, { useState, useEffect } from "react";

import Header from '../containers/Header';
import Footer from '../components/Footer';
import UploadPhotos from "../containers/UploadPhotos"
import SuccessMessage from "../components/SuccessMessage";
import { useNavigate } from "react-router-dom";
import { urlBase } from "../scripts/url";
import { useTheme } from "../scripts/useTheme";

const ControlPanel = (props) => {

    const token = localStorage.getItem('token');

    const [textArea, uploadtextArea] = useState('');
    const [text, uploadtext] = useState(null);
    const [file, uploadfile] = useState([]);
    const [select, uploadSelect] = useState(null);
    const [response, setResponse] = useState(false);
    const [error, setError] = useState(undefined);
    const [favorite, setFavorite] = useState(false);
    const navigate = useNavigate();

    const theme = useTheme();

    const uploadContent = async (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append("select", select);
        formData.append("text", text);
        formData.append("textArea", textArea);
        formData.append("favorite", favorite);

        switch (select) {
            case "nunti":
                for (let i = 0; i < file.length; i++) {
                    formData.append(`nunti`, file[i]);
                }
                break;
            case "portrete":
                for (let i = 0; i < file.length; i++) {
                    formData.append(`portrete`, file[i]);
                }
                break;
            case "fotografii-de-familie":
                for (let i = 0; i < file.length; i++) {
                    formData.append(`fotografii-de-familie`, file[i]);
                }
                break;
            case "sedinte-foto":
                for (let i = 0; i < file.length; i++) {
                    formData.append(`sedinte-foto`, file[i]);
                }
                break;
            case "save-the-date":
                for (let i = 0; i < file.length; i++) {
                    formData.append(`save-the-date`, file[i]);
                }
                break;
            default:
                console.error("Nu exista!");
        }

        try {
            const response = await fetch(`${urlBase}/galerie`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
            if (response.ok) {
                setResponse(true);
            } else {
                const errorData = await response.json();
                console.error("Eroare:", response.status, errorData.error);
                setError(errorData.error);
            }
        } catch (error) {
            props.disconnection();
            navigate('/login');

            console.error(error.message);

        };
    };

    useEffect(() => {

        if (response) {
            uploadtext(null);
            uploadfile(null);
            uploadtextArea(null);
            uploadSelect(undefined);
            setFavorite(false);
        }

    }, [response])


    return (

        <section className={theme.mod.bgB}>

            <Header
                theme={theme}
                fileMod={theme.mod.bgHeader}
                disconnection={props.disconnection}
                status={props.status}
            />

            <main>
                <div className=" pt-5">

                    {!response ?
                        <div className="row w-100 m-0 mb-5 align-items-center justify-content-center">
                            <div className="col-12 col-md-5">

                                <form
                                    method="post"
                                    action="/galerie"
                                    encType="multipart/form-data"
                                    onSubmit={uploadContent}>

                                    < UploadPhotos
                                        theme={theme}
                                        uploadfile={uploadfile}
                                        uploadContent={uploadContent}
                                        uploadtext={uploadtext}
                                        uploadtextArea={uploadtextArea}
                                        uploadSelect={uploadSelect}
                                        setFavorite={setFavorite}
                                        error={error} />
                                </form>
                            </div>

                        </div>
                        :
                        <SuccessMessage
                            setResponse={setResponse}
                        />}

                </div>
            </main>
            <Footer
                theme={theme}
            />
        </section>
    );
}
export default ControlPanel;
