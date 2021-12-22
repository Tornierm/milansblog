import React, {useEffect, useState} from 'react';
import styled, {css, keyframes} from 'styled-components'
import {Link} from 'react-scroll'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100vw) translateY(-50%);
}
  to {
    opacity: 1;
    transform: translateX(0vw) translateY(-50%);
}
`

const SideNav = styled.div`
    position:fixed;
    display:flex;
    align-items: center;
    background-color:var(--p-10);
    z-index:10;
    border-top: 1px var(--p-0) solid;
    height:4em;
    border-radius:0;
    width:100%;
    margin:0;
    padding:.5em 0;
    bottom:0;
    left:0;
    @media (min-width: 48em) {
        animation: ${fadeIn} 1s forwards;
        flex-direction:column;
        border:none;
        height:auto;
        top:50%;
        transform: translateY(-50%);
        width:var(--sidebar-width);
        padding: 2em .5em;
        border-radius:3em;  
        left:auto;
        bottom:auto;
    }
`

const NavLink = styled(Link)`
    border:1px transparent solid;
    width:6em;
    font-size:12px;
    text-align:center;
    color:var(--p-1);
    text-decoration:none;
    margin:0 auto;
    padding: 1em 0em;
    transition:.2s ease-in-out;
    -webkit-transition:.5s ease-in-out;
    border-radius: 2em;
    :hover{
        border: 1px var(--s-3) solid;
        color: var(--s-3);
    }
    @media (min-width: 48em) {
        text-align:left;
        width:100%;
        margin: .5em 0 0 0;
        padding: 1em 2em;
    }
    ${props => props.active === props.current && css`
        color: var(--s-3);
        border: 1px var(--s-3) solid;
        -webkit-transition:.2s ease-in-out;
        padding: 1em 0em;
        @media (min-width: 48em) {
            padding:1em 1em;
            :hover{
            }
        }
    `}
`

export default function Sidebar (props) {
    const [current, setCurrent] = useState(props.data[0].id);

    useEffect( () => {
        let tmp = [];
        props.data.forEach(element => {
            let section = document.getElementById(element.id);
            tmp = [...tmp ,section];
        });

        const setActive = () => {
            tmp.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - sectionHeight / 3 && window.pageYOffset < sectionTop + 2*sectionHeight/3 ) {
                    setCurrent(section.getAttribute("id"));
                }
            }); 
        }

        window.addEventListener("scroll", setActive); 
        return () => {
            window.removeEventListener("scroll", setActive )
        }
    }, [props.data])

   return (
            <SideNav key='sidebar'>
                { props.data.map(item => (
                    <NavLink                    
                        key={item.label}
                        current={current}
                        active={item.id}
                        to={item.id}
                        spy={true}
                        smooth={true}
                        duration={500}
                        isDynamic={true}
                        hashSpy={true}
                    >
                        {item.label}
                    </NavLink> 
                ))}
            </SideNav>
    )
}

