import React from 'react'
import styled, {keyframes, css} from "styled-components";

const roll = keyframes`
    0% {
        transform:translateX(-6em) rotateZ(0deg) ;
    }
    80% {
        transform:translateX(-6em) rotateZ(360deg) ;
    }
    100% {
        transform:translateX(0em) rotateZ(540deg) ;
    }
`;

const rollMobile = keyframes`
    0% {
        transform:translateY(3em) rotateZ(0deg) ;
    }
    80% {
        transform:translateY(3em) rotateZ(360deg) ;
    }
    100% {
        transform:translateY(0em) rotateZ(180deg) ;
    }
`;


const Container = styled.div`
    height:6em;
    width:6em;
    z-index:10;
    position:relative;
    font-size:40px;

    --X:1.33em;
    --Y:.31em;

    --delay0: 0s;
    --delay1: 1s;
    --delay2: 1.3s;
    --delay3: 1.6s;
    --delay4: 1.9s;
    --delay5: 2.2s;
    transform:translateX(0em) rotateZ(0deg);
    animation:${rollMobile} 3s ease-in-out forwards;
    @media (min-width: 48em) {
        animation:${roll} 3s ease-in-out forwards;
    }  
`

const boxTransform1 = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        transform:translateY(-1.59em) translateX(-.91em) skew(60deg) rotateX(60deg);
    }
`;

const boxTransform2 = keyframes`
    0% {
        opacity: 0;
        transform:translateY(-1.59em) translateX(-.91em) skew(60deg) rotateX(60deg);
    }
    100% {
        transform:translateY(-.92em) translateX(-.24em) skew(30deg) rotateX(30deg);
    }
`;

const boxTransform3 = keyframes`
    0% {
        opacity: 0;
        transform:translateY(-.92em) translateX(-.24em) skew(30deg) rotateX(30deg);
    }
    100% {
        transform:translateY(0) translateX(0) skew(0) rotateX(0);
    }
`;

const boxTransform4 = keyframes`
    0% {
        opacity: 0;
        transform:translateY(0) translateX(0) skew(0) rotateX(0);
    }
    100% {
        transform:translateY(.92em) translateX(-.24em) skew(-30deg) rotateX(-30deg);
    }
`;

const boxTransform5 = keyframes`
    0% {
        opacity: 0;
        transform:translateY(.92em) translateX(-.24em) skew(-30deg) rotateX(-30deg);
    }
    100% {
        transform:translateY(1.59em) translateX(-.91em) skew(-60deg) rotateX(-60deg);
    }
`;

const Box = styled.div`
    opacity: 1;
    height:.99em;
    width:.99em;
    position:absolute;
    border:solid .01em black;
    background: 
        linear-gradient(90deg,
        ${props => props.color} 0%, 
        var(--p-3) 130%);
    transform:translateY(-1.59em) translateX(-.91em) skew(60deg) rotateX(60deg);
    ${props => props.order === "1" && css`
        animation:${boxTransform1} .2s var(--delay1)  linear forwards;
    `}
    ${props => props.order === "2" && css`
        animation:${boxTransform2} .2s var(--delay2)  linear forwards;
    `}
    ${props => props.order === "3" && css`
        animation:${boxTransform3} .2s var(--delay3)  linear forwards;
    `}
    ${props => props.order === "4" && css`
        animation:${boxTransform4} .2s var(--delay4)  linear forwards;
    `}
    ${props => props.order === "5" && css`
        animation:${boxTransform5} .2s var(--delay5)  linear forwards;
    `}
`

const fadeInRow = keyframes`
    0% {
        opacity: 0;
        transform:rotateZ(0deg) translateY(var(--Y)) translateX(var(--X));
    }
    100% {
        opacity: 1;
    }
`;

const Row = styled.div`
    opacity: 0;
    transform:rotateZ(0deg) translateY(var(--Y)) translateX(var(--X));
    top: 50%;
    left: 50%;
    position: absolute;
    animation:${fadeInRow} 1s .5s ease-out forwards;
`
const Row1 = styled(Row)`
    transform:rotateZ(0deg) translateY(var(--Y)) translateX(var(--X));
`
const Row2 = styled(Row)`
    
    transform:rotateZ(-60deg) translateY(var(--Y)) translateX(var(--X));
`

const Row3 = styled(Row)`
    
    transform:rotateZ(-120deg) translateY(var(--Y)) translateX(var(--X));
`

const Row4 = styled(Row)`
    
    transform:rotateZ(-180deg) translateY(var(--Y)) translateX(var(--X));
`

const Row5 = styled(Row)`
    
    transform:rotateZ(-240deg) translateY(var(--Y)) translateX(var(--X));
`

const Row6 = styled(Row)`
    
    transform:rotateZ(-300deg) translateY(var(--Y)) translateX(var(--X));
`

export default function Figure() {
    return (
        <Container>
            <Row1>
                <Box color="var(--s-5)" order="1"/>
                <Box color="var(--s-5)" order="2"/>
                <Box color="var(--s-5)" order="3"/>
                <Box color="var(--s-5)" order="4"/>
                <Box color="var(--s-5)" order="5"/>
            </Row1>
            <Row2>
                <Box color="var(--s-7)" order="1"/>
                <Box color="var(--s-7)" order="2"/>
                <Box color="var(--s-7)" order="3"/>
                <Box color="var(--s-7)" order="4"/>
                <Box color="var(--s-7)" order="5"/>
            </Row2>
            <Row3>
                <Box color="var(--s-5)" order="1"/>
                <Box color="var(--s-5)" order="2"/>
                <Box color="var(--s-5)" order="3"/>
                <Box color="var(--s-5)" order="4"/>
                <Box color="var(--s-5)" order="5"/>
            </Row3>
            <Row4>
                <Box color="var(--s-3)" order="1"/>
                <Box color="var(--s-3)" order="2"/>
                <Box color="var(--s-3)" order="3"/>
                <Box color="var(--s-3)" order="4"/>
                <Box color="var(--s-3)" order="5"/>
            </Row4>
            <Row5>
                <Box color="var(--s-1)" order="1"/>
                <Box color="var(--s-1)" order="2"/>
                <Box color="var(--s-1)" order="3"/>
                <Box color="var(--s-1)" order="4"/>
                <Box color="var(--s-1)" order="5"/>
            </Row5>
            <Row6>
                <Box color="var(--s-3)" order="1"/>
                <Box color="var(--s-3)" order="2"/>
                <Box color="var(--s-3)" order="3"/>
                <Box color="var(--s-3)" order="4"/>
                <Box color="var(--s-3)" order="5"/>
            </Row6>
        </Container>
    )
}

