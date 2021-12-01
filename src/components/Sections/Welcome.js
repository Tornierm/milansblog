import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { retrieveFeaturedMedia, retrievePageByName } from '../../service/WPService';
import {Spinner, Loading, Wrapper, Title} from '../Styled'
import Instagram from '@material-ui/icons/Instagram';
import LinkedIn from '@material-ui/icons/LinkedIn';


const StyledWrapper = styled(Wrapper)`
    padding-top:0;
    margin:0;
    @media (min-width: 32em) {
        margin:0 var(--margin);
        flex-direction:column;
        justify-content:center;
        display:flex;
    }
`

const Upper = styled.div`
    display:flex;
    flex-direction:column;
    height:auto;
    margin-bottom:var(--margin);
    @media (min-width: 32em) {
        flex-direction:row;
    }
`

const Image = styled.img`
    object-fit: cover;
    display:block;
    width:100%;
    height:100%;
    margin-bottom:var(--margin);
    @media (min-width: 32em) {
        width:50%;
        margin-bottom:0;
        order:3;
    }
`

const Info = styled.div`
    display:flex;  
    flex-direction:column;
    justify-content:space-around;
    height:auto;
    padding:var(--margin);
    @media (min-width: 32em) {
        width:50%;
        margin-right:var(--margin);
        padding:0;
    }
`
const Social = styled.div`
    
    @media (min-width: 32em) {
        margin:calc(var(--margin)) 0;
        order:3;
    }
`

const SocialList = styled.ul`
    display:flex;
    justify-content:flex-end;
    margin:0;
    padding:0;
    width:100%;
    justify-content:flex-start;
    @media (min-width: 32em) {
        align-items:flex-start;
        justify-content:flex-start;

    }
`

const SocialItem = styled.li`
    list-style-type: none;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:calc(var(--margin)/2) calc(2*var(--margin)) calc(var(--margin)/2) 0;
    @media (min-width: 32em) {
        padding:calc(var(--margin)/2) 0 0 0;
        margin:0 2em 0 0;
    }
`

const SocialLink = styled.a`
    text-decoration: none;
    color: var(--s-3);
    :hover{
        transition:.5s;
        -webkit-transition:.5s;
        color: var(--p-3);
    }
`

const Text = styled.div`
    margin:1em;
    p{
        color:var(--p-1);
        margin:0;
    }
    text-align:justify;
    @media (min-width: 32em) {
        width:100%;
        margin:0;
        padding:1em;
        order:2;
    }
`

export default function Welcome() {

    const [welcome, setWelcome] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [imageUrl, setImageUrl] = useState('');

    const setStuff = async () => {
        const page = await retrievePageByName("Welcome");
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
            <StyledWrapper>
                <Upper>
                    <Image src={imageUrl}/>
                    <Info>
                        <Title dangerouslySetInnerHTML={{__html: welcome.title.rendered}}/>
                        <Text dangerouslySetInnerHTML={{__html: welcome.content.rendered}}/>
                        <Social>
                            <SocialList>
                                <SocialItem>
                                    <SocialLink href="/"><Instagram/></SocialLink>
                                </SocialItem> 
                                <SocialItem>
                                    <SocialLink href="/"><LinkedIn/></SocialLink>
                                </SocialItem>
                            </SocialList>
                        </Social>
                    </Info>
                </Upper>
            </StyledWrapper>
        )
    }
    else{
        return (
            <Loading id="about">
                <Spinner/>
            </Loading>
        )
    }
}