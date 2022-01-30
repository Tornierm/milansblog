import React, {useState} from 'react'

import {Wrapper} from '../Styled';
import styled, {keyframes, css} from "styled-components";
import School from '@material-ui/icons/School';
import Construction from '@material-ui/icons/Build';
import Camera from '@material-ui/icons/CameraAlt';

import StarOutline from '@material-ui/icons/StarOutline';
import StarRate from '@material-ui/icons/Star';
import StarHalf from '@material-ui/icons/StarHalf';

const Container = styled(Wrapper)`
    min-height:70vh;
    justify-content:flex-start;
    align-items:center;
`

const Item = styled.div`
    width:100%;
    max-width:30em;
    margin:.2em;
`

const TopBar = styled.div`
    height:48px;
    
    background-color:var(--p-0);
    display:flex;
    align-items:center;
    
    border-radius:24px 24px 24px 24px;
    margin-bottom:1em;
`

const Title = styled.h5`
    color: var(--p-10);
    margin:0;
    padding-left:8px;
`

const Circle = styled.div`
    height:40px;
    width:40px;
    margin:4px;
    background-color:var(--s-3);
    border-radius:50%;
    display:flex;
    justify-content:center;
    align-items:center;
`

const Info = styled.div`
    max-width:100%;
    color: white;
    min-height:100px;
    margin: 0 0 0 24px;
    transform-origin:top;
    ${props => props.$display  && css`
        animation:${dot} 1s linear forwards;
    `}
    ${props => !props.$display && css`
        display:none;
    `}
`
const Column = styled.div`
    max-width:100%;
    min-height:32px;
    padding:8px;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:flex-start;
    position:relative;
    padding-bottom:32px;
`

const dot = keyframes`
    0% {
        opacity:0;
    }
    100% {
        opacity:1;
    }
`;

const ColumnTitle = styled.h6`
    opacity:0;
    color: var(--s-3);
    font-size:1em;
    position:absolute;
    top:-.5em;
    margin-left:8px;
    animation:${dot} .4s ${props => props.delay} ease-in-out forwards;
`

const Text = styled.p`
    opacity:0;
    color: var(--p-0);
    margin:0;
    padding:0;
    margin-left:16px;
    margin-top:12px; 
    animation:${dot} 1s 2s ease-in-out forwards;
`
const Time = styled.span`
    opacity:0;
    color: var(--p-3);
    font-size:12px;
    margin:0;
    padding:0;
    margin-left:8px;
    margin-top:6px; 
    animation:${dot} .4s ${props => props.delay} ease-in-out forwards;
`

const Dot = styled.div`
    opacity:0;
    width:16px;
    height:16px;
    border-radius:8px;
    background-color:var(--s-3);
    position:absolute;
    top:-8px;
    left:-8px;
    animation:${dot} .4s ${props => props.delay} ease-in-out forwards;
`

const line = keyframes`
    0% {
        transform:scale(0);
    }
    100% {
        transform:scale(1);
    }
`;

const Line = styled.div`
    width:2px;
    height:100%;
    background-color:var(--s-3);
    position:absolute;
    left:-1px;
    top:0px;
    transform-origin:top;
    transform:scale(0);
    animation:${line} .4s ${props => props.delay} ease-in-out forwards;
`

const StarO = styled(StarOutline)`
    transform: scale(.7);
`
const StarR = styled(StarRate)`
    transform: scale(.7);
`   

const StarH = styled(StarHalf)`
    transform: scale(.7);
`  

export default function Lebenslauf() {
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);

    return (
        <Container>
            <Item>
                <TopBar onClick={()=>setActive1(!active1)}>
                    <Circle>
                        <School/>
                    </Circle>
                    <Title>Education</Title>
                </TopBar>
                
                <Info $display={active1}>
                    <Column>
                        <Dot delay={"0s"}/>
                        <Line delay={".2s"}/>
                        <ColumnTitle delay={"0s"}>Madison Consolidated High School (USA)</ColumnTitle>
                        <Time delay={"0s"}>jul 2013 - jun 2014</Time>
                        <Text>After 10th grade I had the opportunity to spend one year in Madison, Indiana where I build solid english skills and got to live the high school experience.</Text>
                    </Column>
                    <Column>
                        <Dot delay={".4s"}/>
                        <Line delay={".6s"}/>
                        <ColumnTitle delay={".4s"}>TU Berlin</ColumnTitle>
                        <Time delay={".4s"}>oct 2016 - oct 2017</Time>
                        <Text>After Abitur I started a degree in Business Informatics while working different Jobs in gastronomy and sales.</Text>
                    </Column>
                    <Column>
                        <Dot delay={".8s"}/>
                        <Line delay={"1s"}/>
                        <ColumnTitle delay={".8s"}>Work and Travel in Australia and New Zealand</ColumnTitle>
                        <Time delay={".8s"}>jan 2018 - sep 2018</Time>
                        <Text>Using the Money I saved, I flew to Australia where I traveled and worked in constuction and on farms.</Text>
                    </Column>
                    <Column>
                        <Dot delay={"1.2s"}/>
                        <Line delay={"1.4s"}/>
                        <ColumnTitle delay={"1.2s"}>HU Berlin</ColumnTitle>
                        <Time delay={"1.2s"}>oct 2018 - now</Time>
                        <Text>After returning from New Zealand I swapt to a computer science degree at HU Berlin that I am planing on finishing this year.</Text>
                    </Column>
                    <Column>
                        <Dot delay={"1.6s"}/>
                        <Line delay={"1.8s"}/>
                        <ColumnTitle delay={"1.6s"}>Erasmus Exchange at TU Wien</ColumnTitle>
                        <Time delay={"1.6s"}>sep 2020 - sep 2021</Time>
                        <Text>To develop my skills in usability engineering and web development I spend one year of my bachelors degree at TU-Wien</Text>
                    </Column>
                </Info>
                
            </Item>
            <Item>
                <TopBar onClick={()=>setActive2(!active2)}>
                    <Circle>
                        <Construction/>
                    </Circle>
                    <Title>Skills</Title>
                </TopBar>
                <Info $display={active2}>
                    <Column>
                        <Dot delay={"0s"}/>
                        <Line delay={".2s"}/>
                        <ColumnTitle delay={"0s"}>HTML & CSS</ColumnTitle>
                        <Time delay={"0s"}>
                            <StarR/><StarR/><StarR/><StarR/><StarH/>
                        </Time>
                        <Text>Since 18 years old I have used HTML and CSS to Change the design of my Tumblr blog template and have continued to develop those skills ever since.</Text>
                    </Column>
                    <Column>
                        <Dot delay={".4s"}/>
                        <Line delay={".6s"}/>
                        <Time delay={".4s"}>
                            <StarR/><StarR/><StarR/><StarO/><StarO/>
                        </Time>
                        <ColumnTitle delay={".4s"}>Java Script and Java Script Frame Works</ColumnTitle>
                        <Text>Though I have worked on smaller assignments with Vue, Angular and Svelte I have developed this Website using React, which I consider to be my strengh.</Text>
                    </Column>
                    <Column>
                        <Dot delay={".8s"}/>
                        <Line delay={"1s"}/>
                        <ColumnTitle delay={".8s"}>SQL</ColumnTitle>
                        <Time delay={".8s"}>
                            <StarR/><StarR/><StarO/><StarO/><StarO/>
                        </Time>
                        <Text>I have absolved the Database course at TU Wien and have used SQL in Software Engineering Projects in Uni. I am hoping to deepen that skill in the future.</Text>
                    </Column>
                    <Column>
                        <Dot delay={"1.2s"}/>
                        <Line delay={"1.4s"}/>
                        <ColumnTitle delay={"1.2s"}>Java</ColumnTitle>
                        <Time delay={"1.2s"}>
                            <StarR/><StarR/><StarH/><StarO/><StarO/>
                        </Time>
                        <Text>Java was the language I first started programming with in high school and has been my main language through all of my degree.
                        </Text>
                    </Column>
                </Info>
            </Item>
            <Item>
                <TopBar onClick={()=>setActive3(!active3)}>
                    <Circle>
                        <Camera/>
                    </Circle>
                    <Title>Interests</Title>
                </TopBar>
                <Info $display={active3}>
                    <Column>
                        <Dot delay={"0s"}/>
                        <Line delay={".2s"}/>
                        <ColumnTitle delay={"0s"}>Photography</ColumnTitle>
                        <Text>Ever since I got my first DSLR for my 18 birthday photography has been one of my passions. Some of my favorite photographs can be found on this website.</Text>
                    </Column>
                    <Column>
                        <Dot delay={".4s"}/>
                        <Line delay={".6s"}/>
                        <ColumnTitle delay={".4s"}>Sports</ColumnTitle>
                        <Text>Football was my earliest passion and I have always loved to take resposibility for my team. Besides I am big into calisthenics, weightlifting and running.</Text>
                    </Column>
                    <Column>
                        <Dot delay={".8s"}/>
                        <Line delay={"1s"}/>
                        <ColumnTitle delay={".8s"}>Reading</ColumnTitle>
                        <Text>My favorite books include "Hippy" by Paolo Coehlo, "The Wisdom of Insecurity" by Alan Watts and "The Subtle Art of not giving a Fuck" by Mark Manson.</Text>
                    </Column>
                </Info>
            </Item>
        </Container>
    )
}