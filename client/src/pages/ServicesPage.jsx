import React from 'react';
import Header from '../containers/Header';
import Footer from '../components/Footer';
import { useTheme } from "../scripts/useTheme";

const Services = () => {


    const theme = useTheme();

    return (
        <>

            <div className={theme.mod.bgB}>


                <Header
                    theme={theme}
                    fileMod={theme.mod.bgHeader}
                />


                <Footer
                    theme={theme}
                />


            </div>


        </>
    )
}

export default Services;