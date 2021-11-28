import React from 'react'
import Sidebar from '../components/Nav/Sidebar'
import Welcome from '../components/Sections/Welcome'
import PostSlider from '../components/Sections/PostSlider/PostSlider'
import InstaPreview from '../components/Sections/InstaPreview'

import styled from 'styled-components';

const Page = styled.div`
    @media (min-width: 48em) {
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
        margin-left:calc(var(--sidebar-width));
        margin-right:calc(var(--sidebar-width));
    }  
    @media (min-width: 64em) {
    }      
`

export default function Home() {
    
    const data=[
        {
            id:'about',
            label:'About',
        },
        {
            id:'blog',
            label:'Blog',
        },
        {
            id:'ig',
            label:'Instagram',
        },
    ]

    return (
        <Page>
            <Sections>
                <div id='about'><Welcome/></div>
                <div id='blog'><PostSlider category="photo"/></div>
                <div id='ig'><InstaPreview/></div>
            </Sections>
            <Sidebar data={data}/>
        </Page>
    )
}
