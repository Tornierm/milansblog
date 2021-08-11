import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import { retrieveFeaturedMedia, retrieveAuthor } from '../service/WPService';


const Info = styled.div`
    width: 25em;
    height: 25em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border:2px solid var(--p-5);
    transform: translate(0em, 2.5em);
    background-color:var(--p-9);
    padding:1em 2em 1em 2em;
    @media (max-width: 45em) {
        width: 95vw;
        max-width:30em;
        transform: translate(0em, 0em);
        background: url(${props => props.img}) no-repeat center center scroll; 
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
`
const ImageContainer = styled.div`
    margin-left:auto;
    margin-right:0;
    transform: translate(2.5em, -5em);
    @media (max-width: 45em) {
        display:none;
    }
`
const Image = styled.img`
    width:20em;
    height:25em;
    object-fit: cover;
    display:block;
    @media (max-width: 45em) {
        display:none;
    }
`
const Item = styled.div`
    background: linear-gradient(90deg, var(--p-3) 10em, transparent 10em);
    max-width: 800px;
    display: flex;
    margin: 7em 0em 0em 0em;
    margin-right:auto;
    @media (max-width: 45em) {
       flex-direction:column; 
       margin:2.5em 0 0 0;
    }
    :nth-child(even){
        background: linear-gradient(to left, var(--p-3) 10em, transparent 10em);
        margin: 0em 0em 20em 0em;
        margin-left:auto;
        margin-right:0;
        @media (max-width: 45em) {
            margin:0;
            margin:2.5em 0 0 0;
         }
    }
    :nth-child(even) ${ImageContainer}{
        transform: translate(-2.5em, 5em);
        order:2;
        margin-left:0;
        margin-right:auto;
    }
    :nth-child(even) ${Info}{
        transform: translate(0em, 12.5em);
        @media (max-width: 45em) {
            transform: translate(0em, 0em);
         }
    }
    
`
const Titel = styled.h1`
    color:var(--p-1);
    text-align: center;
    margin: 0em;
    padding: 0em;
    @media (max-width: 45em) {
        padding:.2em 1em;
        margin:0;
        color:var(--p-1);
        background-color:var(--p-9);
        border-radius:.1em;
     }
`
const Excerpt = styled.div`
    overflow: hidden;
    text-align:justify;
    margin: 0em;
    padding: 0em;
    @media (max-width: 45em) {
        display:none;
    }
    p{
        color:var(--p-1);
    }
`

const ReadMore = styled(Link)`
    background-color: var(--s-dark);
    color:white;
    border-radius: .4em;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    border:none;
    width: 10em;
    margin:1em 0em 0em 0em;
    padding:.5em;
    :hover{
        background-color: Black;
        color:var(--s-dark);
        transition: .5s;
    }
`
export default function PostItem (props) {
    const [post] = useState(props.post);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        const getImageUrl = retrieveFeaturedMedia(post.featured_media)
        const getAuthor = retrieveAuthor(post.author)
        Promise.all([getImageUrl, getAuthor]).then(res => {
            setImageUrl(res[0].media_details.sizes.full.source_url)
            setIsLoaded(true)
        });
    },[post.author, post.featured_media])

    if(isLoaded){
        return (
            <Item>
                <ImageContainer>
                    <Image src={imageUrl} alt={post.title.rendered}/>
                </ImageContainer>
                <Info img={imageUrl}>
                    <Titel dangerouslySetInnerHTML={{__html: post.title.rendered}}/>
                    <Excerpt dangerouslySetInnerHTML={{__html: post.excerpt.rendered.substring(0,300) }}/>
                    <ReadMore to={{
                        pathname: `/post/${post.id}`
                    }}>
                        Read More.
                    </ReadMore>
                </Info>
            </Item>
        )
    }
    else {
        return (null);
    }
    
}


