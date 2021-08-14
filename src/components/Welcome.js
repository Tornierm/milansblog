import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { retrieveFeaturedMedia, retrievePageByName } from '../service/WPService';
import {Loading, Line} from './Styled'

const Wrapper = styled.section`
    display:flex;
    justify-content:center;
    align-items:center;
`

const WelcomeContainer = styled.section`
    width:100%;
    max-width:80em;
    Display:flex;
    justify-content:space-between;
    align-items:flex-start;
    height: calc(100vh - 8em);
    margin-top:4em;
    background-color:var(--p-9);
    padding:2em;
    @media (max-width: 45em) {
        padding:1em;
        height:auto;
        flex-direction:column;
    }
    border:2px var(--p-5) solid;
`

const ImageContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-end;
    height:100%;
    width:50%;
    @media (max-width: 45em) {
        justify-content:center;
        padding:2em;
        width:100%;
        height:60vh;
        background: none; 
    }
`

const TextContainer = styled.div`
    height:100%;
    width:50%;
    max-width: 30em;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:flex-end;
    padding:0em 0em 0em 0em;
    margin-right:2em;
    @media (max-width: 45em) {
        padding:2em 2em 2em 2em;
        width:100%;
        max-width:100%;
        height:auto;
    }
`

const Image = styled.img`
    object-fit: cover;
    display:block;
    width:100%;
    height:100%;
    max-width:35em;
    @media (max-width: 45em) {
        
    }
`

const Title = styled.h1`    
    color:var(--p-1);
    margin-bottom:1em;
    font-size:5em;
    @media (max-width: 45em) {
        margin-bottom:.5em;
    }
`

const Text = styled.div`
    p{
        color:var(--p-1);
    }
    text-align:justify;
    margin: 2em 0;
    @media (max-width: 45em) {
    }
`


export default function Welcome() {

    const [welcome, setWelcome] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [imageUrl, setImageUrl] = useState('');

    const setStuff = async () => {
        const page = await retrievePageByName("Welcome");
        console.log(page)
        setWelcome(page)
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
            <Wrapper>
                <WelcomeContainer>
                    <TextContainer>
                        <Title dangerouslySetInnerHTML={{__html: welcome.title.rendered}}/>
                        <Line height='2px'/>
                        <Text dangerouslySetInnerHTML={{__html: welcome.content.rendered}}/>
                        <Line height='2px'/>
                    </TextContainer>
                    <ImageContainer img={imageUrl}>
                        <Image src={imageUrl}/>
                    </ImageContainer>
                </WelcomeContainer>
            </Wrapper>
        )
    }
    else{
        return <Loading></Loading>
    }
}