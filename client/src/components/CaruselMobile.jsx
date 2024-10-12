import React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/effect-fade';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

import { Zoom, Autoplay, EffectFade, Pagination } from 'swiper/modules';

const CaruselMobile = (props) => {

    return (

        <Swiper
            style={{
                '--swiper-pagination-color': '#fff',
            }}
            spaceBetween={0}
            effect={'fade'}
            zoom={true}
            modules={[Zoom, EffectFade, Pagination, Autoplay]}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            slidesPerView={1}
            className={props.theme.mod.bgHeader} >

            <SwiperSlide>
                <picture className="swiper-zoom-container">
                    <img className="carusel-img img-fluid" src="/uploads/alt1.webp" alt="foto-nunta-natura" />
                </picture>

            </SwiperSlide>
            <SwiperSlide>

                <picture className="swiper-zoom-container">
                    <img className="carusel-img img-fluid" src="/uploads/alt2.webp" alt="foto-biserica" />
                </picture>
            </SwiperSlide>
            <SwiperSlide>

                <picture className="swiper-zoom-container">
                    <img className="carusel-img img-fluid" src="/uploads/alt3.webp" alt="foto-biserica" />
                </picture>
            </SwiperSlide>
            <SwiperSlide>

                <picture className="swiper-zoom-container">
                    <img className="carusel-img img-fluid" src="/uploads/alt4.webp" alt="foto-mireasa" />
                </picture>

            </SwiperSlide>
           
        </Swiper>

    );
}
export default CaruselMobile;