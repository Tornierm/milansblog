import React from 'react'

import {Wrapper, H1, Paragraph} from '../components/Styled';
import Figure from '../components/Figure';


import styled, {keyframes} from "styled-components";

const Container = styled(Wrapper)`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    @media (min-width: 48em) {
        flex-direction:row;
    }  
`

const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translateX(1em));
    }
    100% {
        opacity: 1;
    }
`;

const Info = styled.div`
    opacity:0;
    display:flex;  
    flex-direction:column;
    justify-content:center;
    height:auto;
    max-width:30em;
    padding:var(--margin);
    @media (min-width: 32em) {
        width:50%;
        margin-right:var(--margin);
        padding:0;
    }
    animation:${fadeIn} 1s 3s ease-out forwards;
`

export default function Vorstellung() {
    return (
        <Container>
            <Figure/>
            <Info>
                <H1>Milan Tornier</H1>
                <Paragraph>Student der Informatik und Frontend Developer.</Paragraph>
            </Info>
        </Container>
        
    )
}