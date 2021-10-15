import React from 'react';
import {Link} from 'react-scroll';
import styled from 'styled-components'

const SideNav = styled.div`
    width:4em;
    margin-top:25vh;
    height:auto;
    position:fixed;
    display:flex;
    flex-direction: column;
    justify-content: center;
    background-color:var(--p-dark);
    align-items: center;
    margin-left:2em;
    z-index:10;
    padding: 2em .5em;
    border-radius:3em;
    @media (max-width: 75em) {
        border-top: 1px var(--p-10) solid;
        height:var(--sidebar-height);
        flex-direction:row;
        bottom:0;
        border-radius:0;
        width:100%;
        margin:0;
        padding:.5em 0;
    }
`

const NavLink = styled(Link)`
    min-width:6em;
    text-align: center;
    padding: 1em .5em;
    font-size:12px;
    color:var(--p-vlight);
    text-decoration:none;
    margin .5em 0 0 0;
    transition:.5s ease-in-out;
    -webkit-transition:.5s ease-in-out;
    :hover{
        color: var(--s-5);
        padding-bottom:1.5em;
    }
    @media (max-width: 75em) {
        margin 0 .5em 0 0;
        :hover{
            padding: 1em .5em;
        }
    }
`

export default function Sidebar () {
   return (
            <SideNav>
                <NavLink
                        activeClass="active"
                        to="about"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={500}
                    >
                    About
                </NavLink>
                <NavLink
                    activeClass="active"
                    to="recents"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                >
                    Recents
                </NavLink> 
            </SideNav>
    )
}

