import React from 'react'
import Sidebar from '../components/Nav/Sidebar'
import Welcome from '../components/Sections/Welcome'
import PostSlider from '../components/Posts/PostSlider'
import InstaPreview from '../components/Sections/InstaPreview'
import styled from 'styled-components';

const Page = styled.div`
    padding:0 var(--margin);
    @media (min-width: 48em) {
        padding:0 calc(2*var(--margin));
        max-width:80em;
    }   
    @media (min-width: 64em) {
        margin-left:auto;
        margin-right:auto;
    }    
`
const Sections = styled.div`
    margin:0;
    @media (min-width: 48em) {
        margin-left:calc(var(--sidebar-width) +  2*var(--margin));
        margin-right:calc(var(--sidebar-width) +  2*var(--margin));
    }  
    @media (min-width: 64em) {
    }      
`


export default function Home() {
    return (
        <Page>
            <Sections>
                <Welcome />
                <PostSlider category="photo"/>
                <InstaPreview/>
            </Sections>
            <Sidebar/>
        </Page>
    )
}
