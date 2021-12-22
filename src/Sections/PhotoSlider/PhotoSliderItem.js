import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

import { retrieveFeaturedMedia, retrieveAuthor } from '../../service/WPService';
import styled, { css } from "styled-components";
import {H4} from '../../components/Styled';

const Item = styled.section`
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-Items:center;
    padding:1em;
`

const Polaroid = styled.div`
    height:100%;
    width:100%;
    max-width:20em;
    max-height:30em;
    background-color:var(--p-vlight);
    padding:1em;
`

const ItemTitle = styled(H4)`
    color: var(--p-black);
`

const Info = styled.div`
    padding:1em 0 0 0;
    height:50%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
`

const Square = styled.div`
    width: 100%;
    padding-bottom: 100%;
    position: relative; 
    ${props => props.src && css`
        background-image: url(${props.src});
        background-size: cover;
    `}
` 


const PrimaryButton = styled(Link)`
    background-color: var(--s-3);
    color: var(--p-10);
    display: inline-block;
    text-align: center;
    text-decoration: none;
    border:1px solid var(--s-3);
    border-radius:1em;
    width: 90%;
    max-width:8em;
    padding:.5em;
    margin:3em .5em;
    transition: .5s;
    :hover{
        border:1px solid var(--p-9);
        color: var(--p-9);
    }
`

export default function PhotoSliderItem(props)  {
    const [post] = useState(props.post);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
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
                <Polaroid>
                    <Square src={imageUrl}>
                    </Square>
                    <Info>
                        <ItemTitle dangerouslySetInnerHTML={{__html: post.title.rendered}}/> 
                    </Info> 
                </Polaroid>
                <PrimaryButton to={{
                    pathname: `/post/${post.id}`
                }}>
                    View 
                </PrimaryButton>
            </Item>
        )
    }
    else {
        return (null);
    }
}