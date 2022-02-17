import React from 'react'
import Sidebar from '../Nav/Sidebar'
import Welcome from '../Sections/Welcome'
import Resume from '../Sections/Resume'
import Contact from '../Sections/Contact'

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
    padding: 4em 0 0 0;
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
            id:'resume',
            label:'Resume',
        },
        {
            id:'contact',
            label:'Contact',
        },
    ]

    return (
        <Page>
            <Sections>
                <div id='about'><Welcome/></div>
                <div id='resume'><Resume/></div>
                <div id='contact'><Contact/></div>
            </Sections>
            <Sidebar data={data}/>
        </Page>
    )
}
//