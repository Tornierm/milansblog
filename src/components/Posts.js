import React, { useState, useEffect } from 'react';
import { retrievePosts } from '../service/WPService';
import PostItem from './PostItem'
import styled from "styled-components";
import {Wrapper, Loading} from './Styled'

const PostSection = styled.div`
    padding-top:5em;
    @media (max-width: 45em) {
        display:flex;
        flex-direction:column;
        align-items:center;    
    }
`

export default function Posts(props) {

    const [posts, setPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect( () => {
        

        retrievePosts()
        .then(res => {
            setPosts(res)
            setIsLoaded(true)
        })
        .catch(err => console.log(err));

    },[])

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
        <Loading>Loading...</Loading>
    )
    }
}