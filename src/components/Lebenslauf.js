import React, {useState} from 'react'

import {Wrapper} from '../components/Styled';
import styled from "styled-components";
import School from '@material-ui/icons/School';
import Construction from '@material-ui/icons/Build';
import Camera from '@material-ui/icons/CameraAlt';



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
    
    border-radius: 24px 0 0 24px;
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
`
const Column = styled.div`
    max-width:100%;
    min-height:32px;
    border-left: 1px solid var(--s-3);
    padding:8px;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:flex-start;
    position:relative;
`

const ColumnTitle = styled.h6`
    color: var(--p-0);
    font-size:1em;
    position:absolute;
    top:-.5em;
    margin-left:8px;
`

const Text = styled.p`
    color: var(--p-0);
    margin:0;
    padding:0;
    
    margin-left:16px;
    margin-top:12px;
    
`

const Dot = styled.div`
    width:16px;
    height:16px;
    border-radius:8px;
    background-color:var(--s-3);
    position:absolute;
    top:-8px;
    left:-8px;
`

export default function Lebenslauf() {
    const [active, setActive] = useState(1);

    return (
        <Container>
            <Item>
                <TopBar onClick={()=>setActive(1)}>
                    <Circle>
                        <School/>
                    </Circle>
                    <Title>Education</Title>
                </TopBar>
                {active===1 &&
                    <Info>
                        <Column>
                            <Dot/>
                            <ColumnTitle>Dathe</ColumnTitle>
                            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                        </Column>
                    </Info>
                }
            </Item>
            <Item>
                <TopBar onClick={()=>setActive(2)}>
                    <Circle>
                        <Construction/>
                    </Circle>
                    <Title>Skills</Title>
                </TopBar>
                {active===2 &&
                    <p>expand</p>
                }
            </Item>
            <Item>
                <TopBar onClick={()=>setActive(3)}>
                    <Circle>
                        <Camera/>
                    </Circle>
                    <Title>Interests</Title>
                </TopBar>
                {active===3 &&
                    <p>expand</p>
                }
            </Item>
        </Container>
    )
}