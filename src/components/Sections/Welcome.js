import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { retrieveFeaturedMedia, retrievePageByName } from '../../service/WPService';
import {Spinner, Loading, Wrapper, Title} from '../Styled'
import Instagram from '@material-ui/icons/Instagram';
import LinkedIn from '@material-ui/icons/LinkedIn';


const StyledWrapper = styled(Wrapper)`
    margin:0 var(--margin);
    @media (max-width: 32em) {
        padding-top:0;
        margin:0;
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
        width:33%;
        margin-bottom:0;
        margin-right:var(--margin);
    }
`



const Lower = styled.div`
    display:flex;  
    flex-direction:column;
    height:auto;
    @media (min-width: 32em) {
        flex-direction:row;
    }
`
const Social = styled.div`
    display:flex;
    flex-direction:column;
    margin-top:var(--margin);
    ::after{
        content: "";
        height: 2px;
        background-color: var(--p-1);
    }
    ::before{
        content: "";
        height: 1px;
        background-color: var(--p-1);
    }
    @media (min-width: 32em) {
        order:-1;
        width:33%;
        bottom:0;
        margin:auto var(--margin) 0 0;
    }
`

const SocialList = styled.ul`
    display:flex;
    justify-content:flex-end;
    margin:0;
    padding:0;
    @media (min-width: 32em) {
        flex-direction:column;
        align-items:flex-start;
        justify-content:flex-end;
    }
`

const SocialItem = styled.li`
    list-style-type: none;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:calc(var(--margin)/2) calc(var(--margin)) calc(var(--margin)/2) calc(var(--margin));
    @media (min-width: 32em) {
        padding:calc(var(--margin)/2) 0 0 0;
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
    margin:0 1em;
    p{
        color:var(--p-1);
        margin:0;
    }
    text-align:justify;
    @media (min-width: 32em) {
        width:67%;
        min-height:100%;
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
            <StyledWrapper>
                <Upper>
                    <Image src={imageUrl}/>
                    <Title dangerouslySetInnerHTML={{__html: welcome.title.rendered}}/>
                </Upper>
                <Lower>
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
                </Lower>
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