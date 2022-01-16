import React from 'react'
import Sidebar from '../Nav/Sidebar'
import Lebenslauf from '../components/Resume/Lebenslauf'
import Vorstellung from '../components/Resume/Vorstellung'

import styled from "styled-components";

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

export default function Resume() {

    const data=[
        {
            id:'vorstellung',
            label:'Vorstellung',
        },
        {
            id:'lebenslauf',
            label:'Lebenslauf',
        },
    ]

    return (
        <Page>
            <Sections>
                <div id='vorstellung'><Vorstellung/></div>
                <div id='lebenslauf'><Lebenslauf/></div>
            </Sections>
            <Sidebar data={data}/>
        </Page>
    )
}
