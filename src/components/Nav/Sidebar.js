import React from 'react';
import {Link} from 'react-scroll';
import styled from 'styled-components'

const SideNav = styled.div`
    position:fixed;
    top:50%;
    transform: translatey(-50%);
    width:var(--sidebar-width);
    display:flex;
    flex-direction: column;
    justify-content: center;
    background-color:var(--p-dark);
    align-items: center;
    z-index:10;
    padding: 2em .5em;
    border-radius:3em;
    @media (max-width: 48em) {
        transform: translateY(0em);
        border-top: 1px var(--p-10) solid;
        height:var(--sidebar-width);
        flex-direction:row;
        border-radius:0;
        width:100%;
        margin:0;
        padding:.5em 0;
        bottom:0;
        left:0;
        top:auto;    
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
    @media (max-width: 48em) {
        margin 0 .5em 0 0;
        :hover{
            padding: 1em .5em;
        }
    }
`

export default function Sidebar (props) {
   return (
            <SideNav>
                { props.data.map(item => (
                <NavLink
                activeClass="active"
                to={item.id}
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                >
                    {item.label}
                </NavLink> 
                ))}
            </SideNav>
    )
}

