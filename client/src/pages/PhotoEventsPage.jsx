import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useTheme } from "../scripts/useTheme";
import Header from '../containers/Header';
import Banner from "../components/Banner";
import SortButton from "../containers/SortButton";
import Footer from '../components/Footer';
import DeleteAlbum from "../containers/DeleteAlbum";

import { Helmet } from 'react-helmet-async';

const PhotoEvents = ({ loadingData, sendData, status }) => {

  const theme = useTheme();
  const { category } = useParams();
  const [data, setdata] = useState([]);
  const [sort, setSort] = useState([]);
  const [visibility, setVisibility] = useState();
  const [param, setParam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    switch (category) {
      case 'nunti':
      case 'portrete':
      case 'fotografii-de-familie':
      case 'sedinte-foto':
      case 'save-the-date':

        loadingData(category);
        break;

      default:
        navigate("/notFound");
        break;
    }
  }, [category, visibility, navigate]);


  useEffect(() => {
    if (Array.isArray(sendData)) {
      setdata(sendData);
    }

  }, [sendData])


  const oneDelete = (param) => {

    setVisibility(true);
    setParam(param);

  }


  const updateSortState = (sortedAlbums) => {
    setSort(sortedAlbums);
  };

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
        <title>{`${capitalizeFirstLetter(category)} - Ursu Ioan Fotograf `}</title >
        <meta name="keywords"
        content="fotograf, nunta, servicii, eveniment, save the date, portrete, foto, fotografii, diverse, ursu, ioan, ursu, ioan"></meta>
        <meta name="description" content='Transform pasiunea pentru fotografie în amintiri de neuitat. Specializat în portrete expresive și momente unice de nuntă, capturez emoții autentice și frumusețea fiecărui moment.' />
      </Helmet>
      <section className={theme.mod.bgB}>

        <Header
          theme={theme}
          fileMod={theme.mod.bgHeader}
        />

        {visibility ?

          <DeleteAlbum
            loadingData={loadingData}
            setVisibility={setVisibility}
            param={param}
          />
          :
          <>
            <Banner />
            <main className='container px-5 my-5'>

              <SortButton
                theme={theme}
                updateSort={updateSortState}
                data={data}
              />

              <div className="row g-4">
                {sort.map((album, index) => (
                  <div
                    key={album._id}
                    className="col-sm-12 col-md-6 col-lg-4 position-relative">
                    <Link
                      to={`${album.title}`}
                      className="card shadow">

                      {Math.floor((Date.now() - album.data) / (7 * 24 * 60 * 60 * 1000)) < 3 ?

                        <svg className="svg-set" width="10mm" height="10mm" xmlns="http://www.w3.org/2000/svg">

                          <circle cx="5mm" cy="5mm" r="5mm" fill={theme.mod.sVg} />

                          <text x="50%" y="50%" fontSize="3mm" fill="#ffffff" dominantBaseline="middle" textAnchor="middle">
                            Nou
                          </text>

                        </svg>

                        : null
                      }

                      <img
                        className="full-width-image"
                        src={`https://ursu-ioan-fotograf.ro/images/${category}/${album.title}/${album.content}`}
                        alt={`galerie-foto${index}`}
                      />
                      <span
                        className="text-card card-font ms-3 mb-3 h5"
                        aria-label={album.title}>
                        {album.title}
                      </span>
                    </Link>
                    {status ?
                      <button
                        onClick={() => oneDelete(album._id)}
                        className="button position-absolute me-3 bottom-0 end-0">
                        <i className="fa-solid fa-trash fa-xl">
                        </i>
                      </button>
                      : null}
                  </div>))}
              </div>
            </main>

          </>}

        <Footer
          theme={theme}
        />

      </section>
    </>

  );
}

export default PhotoEvents;
