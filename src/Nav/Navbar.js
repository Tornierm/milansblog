import React, { useState, useEffect} from 'react';
import {retrieveNavbar} from '../service/WPService';
import styled, {css} from 'styled-components'
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';

const NavContainer = styled.div`
    z-index:500;
    position:fixed;
    top:0;
    width:100%;
    background-color: var(--p-10);
    border-bottom: transparent;
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
const MenuContainer = styled.div`
    height:100vh;
    width:100%;
    display:flex;
    padding: var(--navbar-height) 0 var(--navbar-height) calc(2*var(--navbar-height));
    justify-content:flex-end;
    align-items:center;
    z-index:750;
    position:fixed;
    top:0;
    right:0;
    transition: all 0.5s ease-in-out;
    -webkit-transition: all 0.5s ease-in-out;
    ${props => props.showMenu && css`
        transform: translateX(0vw);
    `}
    ${props => !props.showMenu && css`
        transform: translateX(100vw);
    `}
    @media (min-width: 48em) {
        display:none;
    }
`

const Blur = styled.div`
    opacity:0;
    position:fixed;
    top:0;
    right:0;
    height:100vh;
    width:100%;
    transition: all 1s ease-in-out;
    -webkit-transition: all 1s ease-in-out;
    ${props => props.showMenu && css`
        backdrop-filter: blur(2px);
        opacity:100%;
    `}
`

const Menu = styled.div`
    border: 2px solid var(--s-3);
    background-color: var(--p-10);
    height:100%;
    width:100%;
    padding:var(--margin);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-radius: 3em 0 0 3em;
    transition: all 0.5s ease-in-out;
    -webkit-transition: all 0.5s ease-in-out;
    ${props => props.showMenu && css`
        transform: translateX(0vw);
    `}
    ${props => !props.showMenu && css`
        transform: translateX(100vw);
    `}
`

const Links = styled.div`
    display:none;
    @media (min-width: 48em) {
        display:flex;
        justify-content:center;
        align-items:center;
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
    font-style: Comforter Brush;
    margin-right: auto;
    border: 1px transparent solid;
    width:auto;
    padding-left:0;
    font-size:1.5em;
    padding:0;
    outline:none;
    ${props => props.transparent && css`
        color: var(--p-1);
    `}
    :hover{
        color:var(-s--3);
    }
`

const ThemeChanger = styled.div`
    margin-top:2em;
    width:4em;
    height:2em;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background-color: var(--p-0);
    border-radius:1em;
    box-shadow: 0 0 0 2px var(--p-0);
    @media (min-width: 48em) {
        margin-top:0em;
    }
`

const Highlight = styled.div`
        z-index:875;    
        height:2em;
        width:2em;
        position:absolute;
        background-color:var(--s-3);
        transition: all .5s ease-in-out;
        border-radius:1em;
        ${props => props.themeChanger === 'light' && css`
            transform: translateX(2em);
        `}
`

const Icons = styled.div`
    width:100%;
    display:flex;
    align-items:space-around;
    justify-content:space-around;
`

const Sun = styled(WbSunnyIcon)`
    color:var(--p-10);
    z-index:800;
    display:flex;
    align-items:space-around;
    justify-content:space-around;
`

const Moon = styled(Brightness2Icon)`
    color:var(--p-10);
    z-index:800;
    display:flex;
    align-items:space-around;
    justify-content:space-around;
`

const BurgerContainer = styled.div`
    z-index:875;
    position:absolute;
    top:0;
    right:0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--navbar-height);
    height: var(--navbar-height);
    cursor: pointer;
    transition: all .5s ease-in-out;
    border-radius:0 0 0 1em;
    background-color:var(--s-3);
    @media (min-width: 48em) {
        display:none;
    }
    ${props => props.transparent && css`
        background-color:transparent;
    `}
`
  
const Burger = styled.div`
    width: 1.5em;
    height: .15em;
    background: var(--p-1);
    border-radius: .15em;
    transition: all .5s ease-in-out;
    ::before,::after {
        content: '';
        position: absolute;
        width: 1.5em;
        height: .15em;
        background: var(--p-1);
        border-radius: .1em;
        transition: all .5s ease-in-out;
    }
    ::before {
        transform: translateY(-.4em);
    }
    ::after {
        transform: translateY(.4em);
    }
    ${props => props.open && css`
        transform: translateX(50px);
        background: transparent;
        box-shadow: none;
        ::before {
            transform: rotate(45deg) translate(-35px, 35px);
        }
        ::after {
            transform: rotate(-45deg) translate(-35px, -35px);
        }
    `}
    ${props => props.transparent && css`
        ::before,::after {
            background: var(--p-1);;
        }
        @media (min-width: 32em) {
            background: var(--p-1);
        }
    `}
`

export default function Navbar (props) {
    const [listItems, setListItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [active, setActive] = useState('home');
    const [open, setOpen] = useState(false);


    const [themeChanger, setThemeChanger] = useState(true);
    const [transparent, setTransparent] = useState(true);

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
            setThemeChanger('dark')
        } else if(current==='light'){
            setThemeChanger('light')
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
            setThemeChanger('light')
        } else {
            props.setTheme('dark')
            localStorage.setItem('theme', 'dark');
            setThemeChanger('dark')
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
                    <BurgerContainer transparent={transparent} onClick={() => {setOpen(!open); displayMenu()}}>
                        <Burger transparent={transparent} open={open}/>
                    </BurgerContainer>
                    <Links>
                        {listItems.map((item) =>
                            <MenuButton key={item.title} href={item.url} active={item.title === active} onClick={()=> {select(item.title)}}>{item.title}</MenuButton>
                        )}
                        <ThemeChanger transparent={transparent} onClick={changeTheme}>
                            <Highlight themeChanger={themeChanger}/>
                            <Icons>
                                <Moon/>
                                <Sun/> 
                            </Icons>
                        </ThemeChanger>
                    </Links>
                    <MenuContainer showMenu={showMenu}>
                        <Blur showMenu={showMenu} onClick={() => {setOpen(!open); displayMenu()}}/>
                        <Menu showMenu={showMenu}>
                            <MenuButton key={'home'} href={'/'} active={'home' === active} onClick={()=> {select('home')}}>home</MenuButton>
                            {listItems.map((item) => 
                                <MenuButton key={item.title} href={item.url} active={item.title === active} onClick={()=> {select(item.title)}}>{item.title}</MenuButton>
                            )}
                            <ThemeChanger transparent={transparent} onClick={changeTheme}>
                                <Highlight themeChanger={themeChanger}/>
                                <Icons>
                                    <Moon/>
                                    <Sun/> 
                                </Icons>
                            </ThemeChanger>
                        </Menu>
                    </MenuContainer>
                </TopNav>
            </NavContainer>
        )
    }
    else {
        return null;
    }
}

