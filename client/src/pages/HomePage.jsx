import React, { useState, useEffect } from "react";
import { useTheme } from "../scripts/useTheme";
import Header from "../containers/Header";
import Carusel from "../components/Carusel";
import CaruselMobile from "../components/CaruselMobile";
import Details from "../components/Details";
import MixPhoto from "../containers/MixPhoto";
import Footer from "../components/Footer";
import './pages.css';


const HomePage = (props) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const theme = useTheme();


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>

      <Helmet>
        <title>Fotograf profesionist - Ursu Ioan</title>
        <meta name="description" content='Pasiunea mea pentru fotografie transformă momente simple în amintiri de neuitat. Capturez emoții autentice și momente unice pentru a le reda valoarea și frumusețea prin imagini.' />
      </Helmet>

      <section>
        <Header
          inverse="text-light bg-white"
          fileMod=''
          theme={theme}
          set='set'
          disconnection={props.disconnection}
          status={props.status}
        />

        {windowWidth > 600 ?
          <Carusel
            theme={theme}
          /> :
          <CaruselMobile
            theme={theme}
          />
        }
        <Details
          theme={theme}
        />
        <MixPhoto
          theme={theme}
          loadingData={props.loadingData}
          sendData={props.sendData}
        />
        <Footer
          theme={theme}
        />

      </section >
    </>
  )
}


export default HomePage;