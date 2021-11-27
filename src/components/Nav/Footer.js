import React from 'react'
import styled from "styled-components";

const Info = styled.div`
position:relative;
padding-bottom:var(--sidebar-width);
display:flex;
justify-content:center;
align-items:center;
height:var(--footer-height);
background-color:var(--p-10);
z-index:2;
border-top: 2px var(--p-vlight) solid;
`

const Text = styled.p`
    color:var(--p-vlight);
    top:50;
`

export default function Footer () {
        return (
            <Info>
                <Text>© Milan Tornier</Text>
            </Info>
        )   
}