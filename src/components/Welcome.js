import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
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
    max-width:60em;
    Display:flex;
    justify-content:space-between;
    align-items:flex-start;
    height: calc(70vh - 8em);
    margin: 20vh 0;
    background-color:var(--p-9);
    @media (max-width: 45em) {
        margin: 0;
        height:auto;
        flex-direction:column;
    }
    border:1px var(--p-1) solid;
`

const ImageContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-end;
    height:100%;
    width:50%;
    @media (max-width: 45em) {
        justify-content:center;
        width:100%;
        height:40vh;
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
    justify-content:space-around;
    padding:0em 0em 0em 0em;
    padding:2em;
    margin-right:2em;
    @media (max-width: 45em) {
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
    @media (max-width: 45em) {
        
    }
`

const Title = styled.h1`    
    color:var(--p-1);
    margin-bottom:1em;
    font-size:3em;
    @media (max-width: 45em) {
        margin-bottom:.5em;
        font-size:3em;
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
                        <Line height="2px"/>
                        <Title dangerouslySetInnerHTML={{__html: welcome.title.rendered}}/>
                        <Line height="1px"/>
                        <Text dangerouslySetInnerHTML={{__html: welcome.content.rendered}}/>
                        <Line height="1px"/>
                        <Button to={{pathname: `/blog`}}>Read Blog.</Button>
                        <Line height="2px"/>
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