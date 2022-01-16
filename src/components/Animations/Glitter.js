import React from 'react'
import styled, {keyframes, css} from "styled-components";

const glitter = keyframes`
    0% {
        transform:scale(1);
        opacity:0;
    }
    60% {
        transform:scale(1);
        opacity:1;
    }
    85% {
        transform:scale(.3);
    }
    90% {
        transform:scale(.8);
    }
    100% {
        transform:scale(0);
    }
`;

const color = keyframes`
    0% {
        background-color:var(--s-3) ;
    }
    32% {
        background-color:var(--s-3) ;
    }
    33% {
        background-color:var(--s-5) ;
    }
    66% {
        background-color:var(--s-5) ;
    }
    67% {
        background-color:var(--s-7) ;
    }
    100% {
        background-color:var(--s-7) ;
    }
`;

const Container = styled.div`    
    height: calc(
                (${props => props.height} * var(--a))
                +
                (${props => props.height} * var(--c))
                -
                var(--a)
            );
    width: calc(
                (${props => props.width} * var(--b) * 2)
            );
    position:relative;
    display:flex;
    flex-direction:column;
    overflow:hidden;    

    font-size:100px;

    --delay0: 0s;
    --delay1: 1s;
    --delay2: 1.4s;
    --delay3: 1.8s;
    --delay4: 2.2s;
    --delay5: 2.6s;

    --a:.4em;
    --b:.7em;
    --c:.8em;

`

const Row = styled.div`
    display:flex;
    position:relative;
`

const Row1 = styled(Row)`
`
const Row2 = styled(Row)`
    transform: translateX(calc(-1 * var(--b)));
    width:calc(22 * var(--b))
`

const Box = styled.div`
    opactiy:0;
    height:calc(var(--c));
    width: calc(2 * var(--b)); 
    position:relative;
    top:0;
    left:0;
    translate: scale(0);
    background-color:var(--p-5);
    animation:${glitter} 4s ${props => props.delay} ease-in-out forwards;
    ::after { 
        content: ""; 
        position: absolute; 
        bottom: calc(-1 * var(--a)); 
        left: 0; 
        width: 0; 
        height: 0; 
        border-left: var(--b) solid transparent; 
        border-right: var(--b) solid transparent; 
        border-top: var(--a) solid var(--p-5); 
    }
    ::before { 
        content: ""; 
        position: absolute; 
        top: calc(-1 * var(--a)); 
        left: 0; 
        width: 0; 
        height: 0; 
        border-left: var(--b) solid transparent; 
        border-right: var(--b) solid transparent; 
        border-bottom: var(--a) solid var(--p-5); 
    }
`

const Back = styled.div`
    padding-bottom:calc(var(--a) - 1px);
`
//animation:${color} 5s ease-in-out forwards;


export default function Glitter() {
    var rows = [];
    var boxes1 = [];
    var boxes2 = [];
    let height=5;
    let width=5;
    
    for (let j = 0; j < height; j++) {
        boxes1 = [];
        boxes2 = [];

        for (let i = 0; i < width; i++) {
            boxes1.push(
                <Back>
                    <Box delay={(i*i+j)/20+"s"}/>
                </Back>
            );
        }
        for (let i = 0; i < width+1; i++) {
            boxes2.push(
                <Back>
                    <Box delay={(j*j+i)/20+"s"}/>
                </Back>
            );
        }

        rows.push(
            <Row1 delay={j+"s"}>
                {boxes1}
            </Row1>,
            <Row2 delay={j+"s"}>
                {boxes2}
            </Row2>
        );
    }

    return (
        <Container height={height} width={width}>
            {rows}
        </Container>
        )
}