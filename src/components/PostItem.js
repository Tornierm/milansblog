import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import { retrieveFeaturedMedia, retrieveAuthor } from '../service/WPService';
import {Line} from './Styled';

const Date = styled.span`
    color:var(--p-1);
    font-size:.8em;
    align-self:flex-start;
`

const Info = styled.div`
    width: 25em;
    height: 25em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border:1px solid var(--p-5);
    transform: translate(0em, 2.5em);
    background-color:var(--p-9);
    padding:1em 2em 1em 2em;
    @media (max-width: 45em) {
        border:none;
        width: 100%;
        max-width:30em;
        height:auto;
        transform: translate(0em, 0em);
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
        padding:1em;
        transform: translate(0, 0);
        width:100%;
        margin:0;
    }
`
const Image = styled.img`
    width:20em;
    height:25em;
    object-fit: cover;
    display:block; 
    @media (max-width: 45em) {
        width: 100%;
    }
`
const Item = styled.div`
    background: linear-gradient(90deg, var(--p-3) 10em, transparent 10em);
    max-width: 800px;
    display: flex;
    margin: 5em 0em 0em 0em;
    margin-right:auto;
    @media (max-width: 45em) {
        border:1px solid var(--p-5);
        flex-direction:column; 
        margin:0 0 1em 0;
        background: var(--p-9);
        width: 90vw;
        max-width:30em;
    }
    :nth-child(even){
        background: linear-gradient(to left, var(--p-3) 10em, transparent 10em);
        margin: 0em 0em 13.5em 0em;
        margin-left:auto;
        margin-right:0;
        @media (max-width: 45em) {
            margin:0;
            background: var(--p-9);
        }
    }
    :nth-child(even) ${ImageContainer}{
        transform: translate(-2.5em, 5em);
        margin-left:0;
        margin-right:auto;
        order:2;
        @media (max-width: 45em) {
            transform: translate(0, 0);
            margin:0 0 0 0;
            background: none;
            order:0;
         }
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
    align-self:flex-start;
`
const Excerpt = styled.div`
    overflow: hidden;
    text-align:justify;
    @media (max-width: 45em) {
        display:none;
    }
    p{
        color:var(--p-1);
    }
`

const Button = styled(Link)`
    background-color: var(--p-9);
    color: var(--s-1);
    display: inline-block;
    text-align: flex-start;
    align-self:flex-start;
    text-decoration: none;
    border:2px solid var(--s-3);
    width: 10em;
    padding:.5em;
    :hover{
        border:2px solid var(--p-9);
        color: var(--s-3);
        transition: .5s;
    }
    @media (max-width: 45em) {
        margin:1em 0;
    }
`
export default function PostItem (props) {
    const [post] = useState(props.post);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        console.log(post)
        const getImageUrl = retrieveFeaturedMedia(post.featured_media)
        const getAuthor = retrieveAuthor(post.author)
        Promise.all([getImageUrl, getAuthor]).then(res => {
            if(!(res[0] === null)){
                setImageUrl(res[0].media_details.sizes.full.source_url)
            }
            setIsLoaded(true)
        });
    },[post])

    if(isLoaded){
        return (
            <Item>
                <ImageContainer>
                    <Image src={imageUrl} alt={post.title.rendered}/>
                </ImageContainer>
                <Info img={imageUrl}>
                    <Line height='2px'/>
                    <Titel dangerouslySetInnerHTML={{__html: post.title.rendered}}/>
                    <Date dangerouslySetInnerHTML={{__html: post.date}}/>
                    <Line height='1px'/>
                    <Excerpt dangerouslySetInnerHTML={{__html: post.excerpt.rendered.substring(0,300) }}/>
                    <Button to={{
                        pathname: `/post/${post.id}`
                    }}>
                        Read More.
                    </Button>
                    <Line height='2px'/>
                </Info>
            </Item>
        )
    }
    else {
        return (null);
    }
    
}


