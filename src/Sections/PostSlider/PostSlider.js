import React, { useState, useEffect } from 'react';
import { retrievePostsByCategory } from '../../service/WPService';
import {Loading, Spinner, H1} from '../../components/Styled';
import Slider from '../../components/Slider';
import PostSliderItem from './PostSliderItem'
import styled from 'styled-components';


const Container = styled.div`
    margin:3em 0;
`

const createPostSliderItems = (posts) => {
    let postSliderItems = posts.map((post) =>
        <PostSliderItem key={post.id} post={post}/>
    )
    return postSliderItems;
} 

export default function PostSlider (props) {

  const [sliderItems, setSliderItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect( () => {
     
    retrievePostsByCategory(props.category)
    .then(res => {
        setSliderItems(createPostSliderItems(res))
        setIsLoaded(true)
    })
    .catch(err => console.log(err));
  },[props.category])

  if(isLoaded){
    return (
      <Container>
          <H1>Blog</H1>
          <Slider items={sliderItems}/>
      </Container>
    )
  } else {
    return(               
        <Loading><Spinner/></Loading>
    )
  }
};