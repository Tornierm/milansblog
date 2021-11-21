import React, { useState, useEffect} from 'react';
import {retrieveNavbar} from '../../service/WPService';
import styled, {css, keyframes} from 'styled-components'
import ReorderIcon from '@material-ui/icons/Reorder'
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Close from '@material-ui/icons/Close';

const changeBackground = keyframes`
    from {
        background-color: var(--p-dark);
    }
    to {
        background-color:transparent;
        border-bottom: none;
    }
`;
const changeBackgroundBack = keyframes`
    from {
        background-color:transparent;
        border-bottom: none;
    }
    to {
        background-color: var(--p-dark);
    }
`;

const NavContainer = styled.div`
    position:fixed;
    top:0;
    z-index:500;
    width:100%;
    background-color: var(--p-dark);
    animation: ${changeBackgroundBack} 1s forwards;
    border-bottom: 1px var(--p-vlight) solid;
    -webkit-transition: all 0.5s ease-in-out;
    ${props => props.transparent && css`
        
        animation: ${changeBackground} 1s forwards;
    `}
`

const TopNav = styled.div`
    height:var(--navbar-height);
    width:100%;
    max-width:80em;
    margin:0 auto;
    display:flex;
    justify-content:center;
    @media (min-width: 48em) {
    }
`

const Links = styled.div`
    display:none;
    @media (min-width: 48em) {
        display:flex;
        justify-content:center;
    }
`

const AnchorButton = styled.a`
    text-align: center;
    margin:.5em;
    text-decoration: none;
    width:auto;
    padding:.5em;
    color: var(--p-vlight);
    border: 1px var(--p-vlight) solid;
    :hover{
        color: var(--s-5);
        transition:.5s;
        -webkit-transition:.5s;
        border: 1px var(--s-5) solid;
    }
    @media (min-width: 48em) {
        width:8em;
    }
    ${props => props.transparent && css`
        color: var(--p-vdark);
        border: 1px var(--p-1) solid;
        @media (min-width: 32em) {
            color: var(--p-1);
        }
    `}
`
const LogoButton = styled(AnchorButton)`
    margin-right: auto;
    border: 1px transparent solid;
    width:8em;
    @media (min-width: 48em) {
    }
    
`

const Burger = styled(AnchorButton)`
    border:none;
    @media (min-width: 48em) {
        display:none;
    }
    :hover{ 
        border:none;
    }
`

const ThemeChanger = styled(AnchorButton)`
    border:none;
    :hover{ 
        border:none;
    }
`

const Cancel = styled.a`
    position:absolute;
    top:12px;
    right:16px;
    color: var(--p-vlight);
    :hover{
        color: var(--s);
        transition:1s;
        -webkit-transition:1s;
    }
`

const showMenu = keyframes`
    from {
        right:-100vw;
    }
    to {
        right:0vw;
    }
`;

const hideMenu = keyframes`
    from {
        right:0vw;
    }
    to {
        right:-100vw;
    }
`;

const Menu = styled.div`
    z-index:750;
    position:fixed;
    top:0;
    right:-100vw;
    height:100vh;
    width:100%;
    padding:var(--margin);
    background-color:var(--p-dark);   
    transition: all 0.5s ease-in-out;
    -webkit-transition: all 0.5s ease-in-out;

    ${props => props.show && css`
        animation: ${showMenu} .3s forwards ease-in-out;
        right:0vw;
        display:flex;
        flex-direction:column;
        justify-content:center;
    `}
    @media (min-width: 48em) {
        display:none;
    }
`

export default function Navbar (props) {
    const [listItems, setListItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [themeChanger, setThemeChanger] = useState(<Brightness2Icon/>);
    const [transparent, setTransparent] = useState(true);

    const changeTransparent = () =>{
        if(window.scrollY >= 28){
            setTransparent(false);
        } else {
            setTransparent(true);  
        }
    }

    useEffect( () => {

        window.addEventListener("scroll", changeTransparent);
        const current = localStorage.getItem('theme');
        if(current==='dark'){
            setThemeChanger(<WbSunnyIcon/>)
        } else if(current==='light'){
            setThemeChanger(<Brightness2Icon/>)
        }

        retrieveNavbar()
        .then(res => {
            if(res.items.type === 'undefined'){

            } else {
                const Items = res.items.map((item) =>
                    <AnchorButton transparent={transparent} key={item.title} href={item.url}>{item.title}</AnchorButton>
                );
                setListItems(Items)
                setLoaded(true);
            }
        });
        return () => {
            setLoaded(false);
            window.removeEventListener("scroll", changeTransparent);
        }
    },[transparent])

    const showMenu = () => {
        setClicked(true)
        setTransparent(false)
    }

    const hideMenu = () => {
        setClicked(false)
        if(window.scrollY <= 60){
            setTransparent(true);
        }
    }

    const changeTheme = () => {
        if(props.theme==='dark'){
          props.setTheme('light')
          localStorage.setItem('theme', 'light');
          setThemeChanger(<Brightness2Icon/>)
        } else {
          props.setTheme('dark')
          localStorage.setItem('theme', 'dark');
          setThemeChanger(<WbSunnyIcon/>)
        }
    }

    if(loaded){
        return (
            <NavContainer transparent={transparent}>
                <TopNav transparent={transparent}>
                    <LogoButton transparent={transparent} mr href='/'>Milan Tornier</LogoButton>
                    <Burger transparent={transparent} onClick={showMenu}><ReorderIcon/></Burger>
                    <Links>
                        {listItems}
                        <ThemeChanger transparent={transparent} onClick={changeTheme}> {themeChanger} </ThemeChanger>
                    </Links>
                    <Menu show={clicked}>
                        {listItems}
                        <Cancel onClick={hideMenu}><Close/></Cancel>
                        <ThemeChanger transparent={transparent} onClick={changeTheme}> {themeChanger} </ThemeChanger>
                    </Menu>
                </TopNav>
            </NavContainer>
        )
    }
    else {
        return null;
    }
}

