import React, { useState, useEffect } from 'react';
import { retrievePostsByCategory, retrieveCategoryIdByName } from '../service/WPService';
import PostItem from './PostItem'
import styled from "styled-components";
import {Wrapper, Loading} from './Styled'

const PostSection = styled.div`
    padding-top:3em;
    padding-bottom:2em;
    @media (max-width: 45em) {
        display:flex;
        flex-direction:column;
        align-items:center;    
    }
`

export default function Posts(props) {

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