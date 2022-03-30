import React, { useState, useEffect } from 'react';
import { retrievePostsByCategory } from '../service/WPService';
import PostItem from '../Sections/PhotoSlider/PhotoSliderItem'
import styled from "styled-components";
import {Wrapper, Loading, Spinner} from '../components/Styled'

const PostSection = styled.div`
    padding: 0em 1em 5em 1em;
    padding-top: calc(var(--navbar-height) + 2em);
    @media (max-width: 45em) {
        padding: 0em 1em 1em 1em;
        display:flex;
        flex-direction:row;
        align-items:center;    
    }
`

export default function Posts() {

    const [category] = useState('photography')
    const [posts, setPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect( () => {
        console.log(category)

        retrievePostsByCategory(category)
        .then(res => {
            setPosts(res)
            setIsLoaded(true)
        })
        .catch(err => console.log(err));


    },[category])

    if(isLoaded){
        return (
            <Wrapper>
                <PostSection>
                    { posts.map(post => (
                        <PostItem key={post.id} post={post}/>
                    ))}
                </PostSection>
            </Wrapper>
        )
    } else {
    return(               
        <Loading><Spinner/></Loading>
    )
    }
}