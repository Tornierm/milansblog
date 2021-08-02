import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { retrieveFeaturedMedia, retrieveAboutPage } from '../service/WPService';
import {Loading} from './Styled'


const AboutContainer = styled.section`
    Display:flex;
    height: calc(100vh - 8em);
    margin:5em 1em 0em 1em;
    background: linear-gradient(90deg, transparent 75%, var(--p-light) 10em);
    @media (max-width: 45em) {
        min-height: calc(100vh - 6em);
        height:auto;
        background:none;
        flex-direction:column;
        justify-content:space-between;
        margin:4em 0 0 0;
    }
    border:2px white solid;
`

const ImageContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:100%;
    width:50%;
    @media (max-width: 45em) {
        background:  var(--p-light);
        justify-content:center;
        width:100%;
        height:50%;
        margin-left:0em;
    }
`

const TextContainer = styled.div`
    height:100%;
    width:50%;
    display:flex;
    flex-direction:column;
    align-items:flex-end;
    justify-content:center;
    margin-left:1em;
    margin-top:1em;
    padding:0 2em;
    overflow:scroll;
    @media (max-width: 45em) {
        align-items:center;
        width:100%;
        max-width: none;
        height:50%;
        order 2;
        margin-left:0;
        margin-top:1em;
        padding:1em;
    }
`

const Image = styled.img`
    margin:1em;    
    object-fit: cover;
    display:block;
    width:90%;
    height:auto;
    max-height:24em;
    max-width:24em;
    border-radius:50%;
    background-color:black;
    @media (max-width: 45em) {
        height:16em;
        width:16em;
    }
`

const Title = styled.h1`
    align-self:center;
    margin-bottom:2em;
    @media (max-width: 45em) {
        margin-bottom:1em;
    }
`

const Text = styled.p`
    max-width: 30em;
    text-align:left;
    @media (max-width: 45em) {
        text-align:justify;
    }
`


export default function About() {

    const [about, setAbout] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [imageUrl, setImageUrl] = useState('');

    const setStuff = async () => {
        const page = await retrieveAboutPage();
        console.log(page)
        setAbout(page)
        if(page===null){
            return;
        }
        retrieveFeaturedMedia(page.featured_media)
        .then(res => {
            setImageUrl(res.media_details.sizes.full.source_url)
            setIsLoaded(true)
        })
    }

    useEffect( () => {   
        setStuff()

        return function cleanup() {
            setIsLoaded(false);
        }
    },[])

    if(isLoaded){
        return (
            <AboutContainer>
                <TextContainer>
                    <Title>
                        {about.title.rendered}
                    </Title>
                    <Text dangerouslySetInnerHTML={{__html: about.content.rendered}}>
                    </Text>
                </TextContainer>
                <ImageContainer>
                    <Image src={imageUrl}/>
                </ImageContainer>
            </AboutContainer>
        )
    }
    else{
        return null
    }
}