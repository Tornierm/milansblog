import React, { useState, useEffect } from 'react';
import { retrievePostsByCategory } from '../../service/WPService';
import {Loading, Spinner, H1} from '../../components/Styled';
import Slider from '../../components/Slider';
import PostSliderItem from './PhotoSliderItem';
import styled from 'styled-components';

const Container = styled.div`
    margin:3em 0 0 0;
`

const createPhotoSliderItems = (posts) => {
    let postSliderItems = posts.map((post) =>
        <PostSliderItem key={post.id} post={post}/>
    )
    return postSliderItems;
} 

export default function PhotoSlider (props) {

  const [sliderItems, setSliderItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect( () => {
     
    retrievePostsByCategory(props.category)
    .then(res => {
        setSliderItems(createPhotoSliderItems(res))
        setIsLoaded(true)
    })
    .catch(err => console.log(err));
  },[props.category])

  if(isLoaded){
    return (
        <Container>
            <H1>Photography</H1>
            <Slider items={sliderItems}/>
        </Container>
    )
  } else {
    return(               
        <Loading><Spinner/></Loading>
    )
  }
};