import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from "styled-components";
import {Wrapper} from '../components/Styled';

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import 'swiper/components/navigation';
import 'swiper/components/pagination';


// import Swiper core and required modules
import SwiperCore, {
  Navigation, Pagination
} from 'swiper';

SwiperCore.use([Navigation, Pagination]);

const SwiperWrapper = styled(Wrapper)`
  display:flex;
  flex-direction:column;
  padding:0;

  .swiper-container{
    .swiper-button-prev{
      color:var(--s-3);
      outline:none;
    }
    .swiper-button-next{
      color:var(--s-3);
      outline:none;

    }
    .swiper-pagination-bullet{
      background-color:var(--s-3);
    }
    .swiper-pagination-bullet-active{
      background-color:var(--s-3);
    } 
  }
  .swiper-slide{
    margin:1em 0;
    padding:1em 0;
    display:flex;
    justify-content:center;
  }
  @media (max-width: 640px) {
    max-width: 640px;
    width:100%;
  }
  @media (max-width: 768px) {
    max-width: 768px;
  }
`

const SwiperContainer = styled.div`
  
`

export default function Slider (props) {

    return (
      <SwiperWrapper>
        <SwiperContainer>
          <Swiper
            grabCursor={true}  
            modules={[Navigation, Pagination]}
            navigation
            pagination={{
              "clickable": true,
              "dynamicBullets": true
            }}
            slidesPerView={1}
            breakpoints={{
              "480": {
                "slidesPerView": 1,
                "spaceBetween": 0
              },
              "800": {
                "slidesPerView": 2,
                "spaceBetween": 0
              },
              "1000": {
                "slidesPerView": 3,
                "spaceBetween": 0
              }
            }}
          >
            { props.items.map(item => (
              <SwiperSlide key={'s'+item.key}>
                    {item}
              </SwiperSlide>
            ))}
          </Swiper>
      </SwiperContainer>
    </SwiperWrapper>
    )
};