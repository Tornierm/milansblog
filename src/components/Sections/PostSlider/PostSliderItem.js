import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

import { retrieveFeaturedMedia, retrieveAuthor } from '../../../service/WPService';
import styled, { css } from "styled-components";
import {Title} from '../../Styled';
import Close from '@material-ui/icons/Close';

const Item = styled.section`
    position:relative;
    min-height:25em;
    height:100%;
    width:100%;
    max-width:14em;
    transform-style: preserve-3d;
    transition: all .5s ease-in-out;
    ${props => props.flip && css`
        transform: rotateY(180deg);
    `}
`

const Front = styled.div`
    position:absolute;
    
    backface-visibility: hidden;
    height:100%;
    width:100%;

    background-color:var(--p-1);
    border-radius:1em;
    padding:.5em;
    -webkit-box-shadow: 2px 5px 10px 0px var(--p-vdark);
    -moz-box-shadow: 2px 5px 10px 0px var(--p-vdark);
    box-shadow: 2px 5px 10px 0px var(--p-vdark);
`

const Back = styled.div`
    position:absolute;
    backface-visibility: hidden;
    height:100%;
    width:100%;
    padding:3em .5em .5em .5em;
    border-radius:1em;

    transform: rotateY(180deg);
    background-color:var(--p-9);
    display:flex;
    flex-direction:column;
    justify-content:space-between;

    -webkit-box-shadow: 2px 5px 10px 0px var(--p-vdark);
    -moz-box-shadow: 2px 5px 10px 0px var(--p-vdark);
    box-shadow: 2px 5px 10px 0px var(--p-vdark);
`

const ItemTitle = styled(Title)`
    padding:0 .5em;
    font-size:1.5em;
    color: var(--p-9);
    ::after, ::before{
        background-color:var(--p-9);
    }
`

const Info = styled.div`
    padding:1em 0 0 0;
    height:50%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
`

const Image = styled.img`
    width:100%;
    height:50%;
    object-fit: cover;
    display:block; 
    border-radius:.5em;
`

const Buttons = styled.div`
    display:flex;
    width:100%;
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
    padding:.5em;
    margin:.5em;
    transition: .5s;
    :hover{
        border:1px solid var(--p-9);
        color: var(--p-9);
    }
`

const SecondaryButton = styled(PrimaryButton)`
    background-color: transparent;
    color: var(--p-10);
    border:1px solid var(--p-9);
    :hover{
        background-color: transparent;
        border:1px solid var(--s-3);
        color: var(--s-3);
    }
`

const Excerpt= styled.div`
    color:var(--p-1);
    text-align: justify;
    overflow:scroll;
    padding:.5em;
`

const Cancel = styled.a`
    position:absolute;
    top:12px;
    right:16px;
    color: var(--s-3);
    transition:1s;
    -webkit-transition:1s;
    :hover{
        color: var(--s);
    }
`

export default function PostSliderItem(props)  {
    const [post] = useState(props.post);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [flip, setFlip] = useState(false);


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
            <Item flip={flip}>
                <Front>
                    <Image src={imageUrl} alt={post.title.rendered}/>
                    <Info>
                        <ItemTitle dangerouslySetInnerHTML={{__html: post.title.rendered}}/> 
                        <Buttons>
                            <SecondaryButton to="" onClick={() =>{ setFlip(!flip)}}>
                                excerpt
                            </SecondaryButton>
                            <PrimaryButton to={{
                                pathname: `/post/${post.id}`
                            }}>
                                read
                            </PrimaryButton>  
                        </Buttons>
                    </Info> 
                </Front>
                <Back>
                    <Cancel onClick={()=>setFlip(!flip)}><Close/></Cancel>
                    <Excerpt dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}/>
                    <PrimaryButton to={{
                        pathname: `/post/${post.id}`
                    }}>
                        read
                    </PrimaryButton>   
                </Back>
            </Item>
            
        )
    }
    else {
        return (null);
    }
}