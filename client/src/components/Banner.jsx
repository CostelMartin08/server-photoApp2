import React from "react";

import Nunti from './photo/special-nunta.webp';
import Portrete from './photo/special-portrete.webp';
import Familie from './photo/special-familie.webp';
import Sedinta from './photo/special-sedinta.webp';
import SavetheDate from './photo/special-save-the-date.webp';

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
    backgroundImage = Portrete;
    titleText = 'Portrete';
    classN="banner-bg--botezuri";
  }
  else if (photo === 'fotografii-de-familie') {
    backgroundImage = Familie;
    titleText = 'Fotografii de Familie';
    classN="banner-bg-diverse";
  }
  else if (photo === 'sedinte-foto') {
    backgroundImage = Sedinta;
    titleText = 'Ședințe Foto';
    classN="banner-bg-diverse";
  }
  else if (photo === 'save-the-date') {
    backgroundImage = SavetheDate;
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