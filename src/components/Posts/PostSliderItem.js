import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

import { retrieveFeaturedMedia, retrieveAuthor } from '../../service/WPService';
import styled from "styled-components";
import {Title} from '../Styled';


const Item = styled.section`
    height:500px;
    max-height:100%;
    width:100%;
    max-width:250px;
    background-color:var(--p-9);
    padding:.5em;
    -webkit-box-shadow: 2px 5px 10px 0px var(--p-0);
    -moz-box-shadow: 2px 5px 10px 0px var(--p-0);
    box-shadow: 2px 5px 10px 0px var(--p-0);
`

const Info = styled.div`
    padding:.5em;
    height:40%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`

const Image = styled.img`
    width:100%;
    height:60%;
    object-fit: cover;
    display:block; 
`

const Button = styled(Link)`
    background-color: var(--p-9);
    color: var(--s-1);
    display: inline-block;
    text-align: flex-start;
    text-decoration: none;
    border:2px solid var(--s-3);
    width: 10em;
    padding:.5em;
    margin:0;
    :hover{
        border:2px solid var(--p-9);
        color: var(--s-3);
        transition: .5s;
    }
    
`

export default function PostSliderItem(props)  {
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
                <Image src={imageUrl} alt={post.title.rendered}/>
                <Info>
                    <Title dangerouslySetInnerHTML={{__html: post.title.rendered}}/> 
                    <Button to={{
                        pathname: `/post/${post.id}`
                    }}>
                        Read More.
                    </Button>
                </Info> 
            </Item>
        )
    }
    else {
        return (null);
    }
}