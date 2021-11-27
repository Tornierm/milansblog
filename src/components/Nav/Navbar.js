import React, { useState, useEffect} from 'react';
import {retrieveNavbar} from '../../service/WPService';
import styled, {css} from 'styled-components'
import ReorderIcon from '@material-ui/icons/Reorder'
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Close from '@material-ui/icons/Close';

const NavContainer = styled.div`
    z-index:500;
    position:fixed;
    top:0;
    width:100%;
    background-color: var(--p-10);
    border-bottom: 1px var(--p-1) solid;
    transition: all 0.5s ease-in-out;
    -webkit-transition: all 0.5s ease-in-out;
    ${props => props.transparent && css`
        background-color:transparent;
        border-bottom: transparent;
    `}
`

const TopNav = styled.div`
    height:var(--navbar-height);
    width:100%;
    max-width:80em;
    margin:0 auto;
    display:flex;
    justify-content:center;
`

const Menu = styled.div`
    z-index:750;
    position:fixed;
    top:0;
    right:0vw;
    height:100vh;
    width:100%;
    padding:var(--margin);
    transition: all 0.5s ease-in-out;
    -webkit-transition: all 0.5s ease-in-out;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    ${props => props.showMenu && css`
        transform: translateX(0vw);
        background-color: var(--p-10);
    `}
    ${props => !props.showMenu && css`
        transform: translateX(100vw);
    `}
    @media (min-width: 48em) {
        display:none;
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
    text-align:center;
    margin:.5em;
    text-decoration: none;
    width:auto;
    padding:.5em;
    color: var(--p-1);
    border: 1px transparent solid;
    transition:all .5s ease-in-out;
    -webkit-transition:all .5s ease-in-out;
    :hover{
        color: var(--s-3);
    }
    @media (min-width: 48em) {
        width:8em;
    }
    ${props => props.transparent && css`
        color: var(--p-black);
        border: 1px var(--p-1) solid;
        @media (min-width: 32em) {
            color: var(--p-1);
        }
    `}
`

const MenuButton = styled(AnchorButton)`
        text-align:left;
        width:80%;
        min-width:8em;
        padding:.5em 3em;
        font-size:1.2em;
    ${props => props.active && css`
        color: var(--s-3);
        border: 1px var(--s-3) solid;
        border-radius: 2em;
        padding:1em 2em;
        font-size:1.3em;
    `}
    @media (min-width: 48em) {
        width:8em;
        padding:.5em;
        font-size:1.2em;
        text-align:center;
    }
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
    color: var(--p-1);
    border:none;
    :hover{ 
        border:none;
    }
`

const Cancel = styled.a`
    position:absolute;
    top:12px;
    right:16px;
    color: var(--p-1);
    transition:1s;
    -webkit-transition:1s;
    :hover{
        color: var(--s);
    }
`

export default function Navbar (props) {
    const [listItems, setListItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [active, setActive] = useState('home');

    const [themeChanger, setThemeChanger] = useState(<Brightness2Icon/>);
    const [transparent, setTransparent] = useState(false);

    const changeTransparent = () =>{
        if(window.scrollY >= 28){
            setTransparent(false);
        } else {
            setTransparent(true);  
        }
    }

    const displayMenu = () => {
        setShowMenu(!showMenu)
    }

    useEffect( () => {

        window.addEventListener("scroll", changeTransparent);
        const current = localStorage.getItem('theme');
        if(current==='dark'){
            setThemeChanger(<WbSunnyIcon/>)
        } else if(current==='light'){
            setThemeChanger(<Brightness2Icon/>)
        }

        setActive(localStorage.getItem('active'));

        retrieveNavbar()
        .then(res => {
            if(res.items.type === 'undefined'){

            } else {
                const Items = res.items;
                setListItems(Items)
                setLoaded(true);
            }
        });
        return () => {
            setLoaded(false);
            window.removeEventListener("scroll", changeTransparent);
        }
    },[])

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

    const select = (title) => {
        localStorage.setItem('active', title);
        setActive(title); 
    }

    if(loaded){
        return (
            <NavContainer transparent={transparent}>
                <TopNav>
                    <LogoButton onClick={()=> {select('home')}} transparent={transparent} href='/'>Milan Tornier</LogoButton>
                    <Burger transparent={transparent} onClick={displayMenu}><ReorderIcon/></Burger>
                    <Links>
                        {listItems.map((item) =>
                            <MenuButton key={item.title} href={item.url} active={item.title === active} onClick={()=> {select(item.title)}}>{item.title}</MenuButton>
                        )}
                        <ThemeChanger transparent={transparent} onClick={changeTheme}> {themeChanger} </ThemeChanger>
                    </Links>
                    <Menu showMenu={showMenu}>
                        <MenuButton key={'home'} href={'/'} active={'home' === active} onClick={()=> {select('home')}}>home</MenuButton>
                        {listItems.map((item) => 
                            <MenuButton key={item.title} href={item.url} active={item.title === active} onClick={()=> {select(item.title)}}>{item.title}</MenuButton>
                        )}
                        <Cancel onClick={displayMenu}><Close/></Cancel>
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

