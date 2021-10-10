import React, { useState, useEffect } from 'react';
import { retrievePostsByCategory, retrieveCategoryIdByName } from '../../service/WPService';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from "styled-components";
import {Wrapper, Loading} from '../Styled';
import PostSliderItem from './PostSliderItem'

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
  margin-top:4em;
  min-height:calc(100vh-4em);

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

const Title = styled.h1`    
    color:var(--p-1);
    text-align:center;
    @media (max-width: 45em) {
    }
`

export default function PostSlider (props) {

  const [category] = useState(props.category)
  const [posts, setPosts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect( () => {
      console.log(category)

      retrieveCategoryIdByName(category)
      .then( res => {
          if(typeof res[0] === 'undefined'){

          } else {
              retrievePostsByCategory(res[0].id)
              .then(res => {
                  setPosts(res)
                  setIsLoaded(true)
              })
              .catch(err => console.log(err));
          }
      })
      

  },[category])

  if(isLoaded){
    return (
      <SwiperWrapper>
      <Title>Recent Posts</Title>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{
          "clickable": true,
          "dynamicBullets": true
        }}
        slidesPerView={1}
        breakpoints={{
          "640": {
            "slidesPerView": 1,
            "spaceBetween": 0
          },
          "768": {
            "slidesPerView": 2,
            "spaceBetween": 0
          }
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        { posts.map(post => (
          <SwiperSlide>
            <PostSliderItem key={post.id} post={post}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperWrapper>
    )
  } else {
  return(               
      <Loading>Loading...</Loading>
  )
  }
};