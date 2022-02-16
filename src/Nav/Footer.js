import React from 'react'
import styled from "styled-components";

const Info = styled.div`
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    height:var(--footer-height);
    background-color:var(--p-10);
    border-top: 1px var(--p-1) solid;
    padding-bottom:4em;
`

const Text = styled.p`
    color:var(--p-1);
    top:50;
`

export default function Footer () {
        return (
            <Info>
                <Text>© Milan Tornier</Text>
            </Info>
        )   
}