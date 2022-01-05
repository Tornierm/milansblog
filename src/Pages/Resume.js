import React from 'react'
import Figure from '../components/Figure';
import styled from "styled-components";

const Container = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:flex-start;
    align-items:center;
`

export default function Resume() {
    return (
        <Container>
            <Figure/>
        </Container>
        
    )
}
