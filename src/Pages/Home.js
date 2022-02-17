import React, {useEffect, useState} from 'react'
import Sidebar from '../Nav/Sidebar'
import Welcome from '../Sections/Welcome'
import Resume from '../Sections/Resume'
import Contact from '../Sections/Contact'
import  {useInView} from 'react-intersection-observer'

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

    const options = {
        "threshold": .7,
        "rootMargin": "100px 0px"
    }

    const {ref: ref1, inView: visible1} = useInView(options);
    const {ref: ref2, inView: visible2} = useInView(options);
    const {ref: ref3, inView: visible3} = useInView(options);
    const [animate1, setAnimate1] = useState();
    const [animate2, setAnimate2] = useState();
    const [animate3, setAnimate3] = useState();

    
    
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

    useEffect(() => {
        if(visible1){
            setAnimate1(true)
        }
        if(visible2){
            setAnimate2(true)
        } 
        if(visible3){
            setAnimate3(true)
        }
    },[visible1, visible2, visible3])

    return (
        <Page>
            <Sections>
                <div id='about'><Welcome innerRef={ref1} appear={animate1}/></div>
                <div id='resume'><Resume innerRef={ref2} appear={animate2}/></div>
                <div id='contact'><Contact innerRef={ref3} appear={animate3}/></div>
            </Sections>
            <Sidebar data={data}/>
        </Page>
    )
}
//