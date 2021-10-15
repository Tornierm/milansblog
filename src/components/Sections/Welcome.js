import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { retrieveFeaturedMedia, retrievePageByName } from '../../service/WPService';
import {Loading, Line, Wrapper as StyledWrapper} from '../Styled'

const Wrapper = styled(StyledWrapper)`
    display:flex;
    justify-content:center;
    align-items:center;
`

const WelcomeContainer = styled.section`
    width:100%;
    max-width:60em;
    align-items:center;
    display:flex;
    margin: 15vh 0;
    @media (max-width: 45em) {
        max-width:30em;
        margin: 0 0 0 0;
        height:auto;
        flex-direction:column;
    }
`

const ImageContainer = styled.div`
    height:100%;
    width:50%;
    padding:1em;
    @media (max-width: 45em) {
        justify-content:center;
        width:100%;
        height:25em;
        background: none; 
    }
`

const TextContainer = styled.div`
    height:100%;
    width:50%;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    padding:2em;
    margin-left:2em;
    @media (max-width: 45em) {
        width:100%;
        max-width:100%;
        height:auto;
        margin-left:0;
    }
`

const Image = styled.img`
    object-fit: cover;
    display:block;
    width:100%;
    height:100%;
    @media (max-width: 45em) {
        
    }
`

const Title = styled.h1`    
    color:var(--p-1);
    @media (max-width: 45em) {
    }
`

const Text = styled.div`
    p{
        color:var(--p-1);
    }
    text-align:justify;
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
            <Wrapper id="about">
                <WelcomeContainer>
                    <ImageContainer img={imageUrl}>
                        <Image src={imageUrl}/>
                    </ImageContainer>
                    <TextContainer>
                        <Line height="2px"/>
                        <Title dangerouslySetInnerHTML={{__html: welcome.title.rendered}}/>
                        <Text dangerouslySetInnerHTML={{__html: welcome.content.rendered}}/>
                        <Line height="2px"/>
                    </TextContainer>
                </WelcomeContainer>
            </Wrapper>
        )
    }
    else{
        return <Loading> Loading ...</Loading>
    }
}