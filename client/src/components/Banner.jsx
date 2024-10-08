import React from "react";
import Nunti from './photo/nuntadoi.webp';
import Botezuri from './photo/botez.webp';
import Diverse from './photo/lapunte.webp'
import { useLocation } from "react-router-dom";

const Banner = () => {

  const location = useLocation();
  const photo = location.pathname.split('/')[2];

  let backgroundImage = '';
  let titleText = '';
  let classN = '';

  if (photo === 'nunti') {
    backgroundImage = Nunti;
    titleText = 'Fotografie de Nuntă';
    classN="banner-bg";
  }
  else if (photo === 'portrete') {
    backgroundImage = Botezuri;
    titleText = 'Portrete';
    classN="banner-bg--botezuri";
  }
  else if (photo === 'fotografii-de-familie') {
    backgroundImage = Diverse;
    titleText = 'Fotografii de Familie';
    classN="banner-bg-diverse";
  }
  else if (photo === 'sedinte-foto') {
    backgroundImage = Diverse;
    titleText = 'Ședințe Foto';
    classN="banner-bg-diverse";
  }
  else if (photo === 'save-the-date') {
    backgroundImage = Diverse;
    titleText = 'Save the Date';
    classN="banner-bg-diverse";
  }


  return (
    <div className={classN} style={{ backgroundImage: `url(${backgroundImage})` }} >
      <div className="mt-5">
        <h2 className="mt-2 title-font text-light">{titleText}</h2>
      </div>
    </div>
  )
}

export default Banner;