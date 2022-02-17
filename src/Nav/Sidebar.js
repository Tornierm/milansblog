import React, {useEffect, useState, useRef} from 'react';
import styled, {css, keyframes} from 'styled-components'
import {Link} from 'react-scroll'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100vh);
}
  to {
    opacity: 1;
    transform: translateY(-50%);
}
`
const fadeInMobile = keyframes`
  from {
    opacity: 0;
    transform: translateY(100vw);
}
  to {
    opacity: 1;
    transform: translateY(0vw);
}
`

const SideNav = styled.div`
    position:fixed;
    bottom:0;
    z-index:10;
    width:100%;
    margin:0;
    overflow:scroll;
    animation: ${fadeInMobile} 1s forwards;
    display:flex;
    justify-content:center;
    @media (min-width: 48em) {
        animation: ${fadeIn} 1s forwards;
        top:50%;
        transform: translateY(-50%);
        width:var(--sidebar-width);
        bottom:auto;
        overflow:visible;
    }
`

const Links = styled.div`
    display:flex;
    justify-content:center;
    background-color:var(--p-9);
    align-items: center;
    border-top: 2px solid var(--p-3);
    padding:.5em 1em;
    width:100%;
    @media (min-width: 48em) {
        flex-direction:column;
        width:var(--sidebar-width);
        padding: 2em .5em;
        border-radius:3em;  
        margin:0em;
    }
`

const NavLinkContainer = styled.div`
    width:6em;
    display:flex;
    margin:0 .5em;
`

const NavLink = styled(Link)`
    text-decoration:none;
    font-size:12px;
    text-align:center;
    color:var(--p-1);
    padding: 1em 0em;
    transition:.2s ease-in-out;
    -webkit-transition:.5s ease-in-out;
    border-radius: 2em;
    border:1px transparent solid;
    width:100%;
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
        color: var(--p-3);
        border: 1px var(--p-3) solid;
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
    const [navBar] = useState(document.getElementsByClassName("nav-bar"))[0];
    const navRefs = useRef([])

    useEffect( () => {
        let sections = [];
        props.data.forEach(element => {
            let section = document.getElementById(element.id);
            sections = [...sections ,section];
        });
        

        navRefs.current = navRefs.current.slice(0, props.data.length);

        console.log(navRefs);

        const setActive = () => {
            sections.forEach((section, i) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - sectionHeight/3 && window.pageYOffset < sectionTop + sectionHeight/3 ) {
                    setCurrent(section.getAttribute("id"));
                    navRefs.current[i].scrollIntoView({behavior: "smooth", inline: "center", block: "center"})
                }
            }); 
        }

        window.addEventListener("scroll", setActive); 
        return () => {
            window.removeEventListener("scroll", setActive )
        }
    }, [props.data, navBar])

   return (
            <SideNav key='sidebar'>
                <Links>
                { props.data.map((item, i)=> (
                    <NavLinkContainer key={'c'+item.label} ref={el => navRefs.current[i] = el}>
                    <NavLink                    
                        to={item.id}
                        spy={true}
                        smooth={true}
                        duration={500}
                        isDynamic={true}
                        hashSpy={true}
                        offset={-96}

                        key={item.label}
                        active={item.id}
                        current={current}
                    >
                        {item.label}
                    </NavLink> 
                    </NavLinkContainer>
                ))}
                </Links>
            </SideNav>
    )
}

