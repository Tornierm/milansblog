import React, { useState, useEffect} from 'react';
import {retrieveNavbar} from '../../service/WPService';
import styled, {css} from 'styled-components'
import ReorderIcon from '@material-ui/icons/Reorder'
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';

const TopNav = styled.div`
    position:fixed;
    top:0;
    transition: all .5s ease-in-out;
    z-index:999;
    height:4em;
    width:100%;
    display:flex;
    justify-content:center;
    background-color:var(--p-dark);
    border-bottom: 1px var(--p-vlight) solid;
    @media (max-width: 45em) {
        flex-direction:column;
        height:auto;
    }
`
const NavItem = styled.li`
    list-style-type: none;
    display:flex;
    align-items:center;
    justify-content:center;
    transition: all 0.3s ease;
    margin:.2em;
    @media (max-width: 42em) {
        width:auto;
    }
`

const NavLink = styled.a`
    min-width:100px;
    text-align: center;
    text-decoration: none;
    width:auto;
    padding:.6em;
    margin:0 .5em;
    color: var(--p-vlight);
    border: 1px var(--p-vlight) solid;
    :hover{
        color: var(--s-5);
        transition:1.5s;
        -webkit-transition:1.5s;
        border: 1px var(--s-5) solid;
    }
    @media (max-width: 45em) {
        width:100%;
    }
`
const Logo = styled(NavLink)`
    margin-right: auto;
    color: var(--p-vlight);
    border: 1px var(--p-dark) solid;
    @media (max-width: 45em) {
        width:8em;
    }
    :hover{
    }
`

const Right = styled.div`
display:flex;
flex-direction:row;
justify-content:flex-end;
width:50%;
max-width:30em;
@media (max-width: 45em) {
    background-color:var(--p-dark);
    flex-direction:column;
    margin-left:0;
    margin-bot:5em;
    border-bottom: 2px var(--p-vlight) solid;
    width:100%;
    max-width:100%;
    ${props => !props.show && css`
    display:none;
`}
}
`
const Left = styled.div`
    width:50%;
    max-width:30em;
    display:flex;
    justify-content:space-between;
    @media (max-width: 45em) {
        width:100%;
        max-width:100%;
    }
`

const Burger = styled.a`
    color:var(--p-vlight);
    display:none;
    text-align: center;
    transition: all 0.3s ease;
    text-decoration: none;
    padding:.8em;
    @media (max-width: 45em) {
        display:inline;
    }
    :hover{
        color: var(--s);
        transition:1s;
        -webkit-transition:1s;
    }
`

const Button = styled.button`
    border: none;
    min-width:100px;
    text-align: center;
    text-decoration: none;
    width:auto;
    border-radius: .5em;
    padding:.8em;
    color: var(--p-vlight);
    background-color: transparent;
    :hover{
        color: var(--s-5);
        transition:1.5s;
        -webkit-transition:1.5s;
        border-radius:.3em;
    }
    @media (max-width: 45em) {
        width:100%;
    }
`

export default function Navbar (props) {
    const [listItems, setListItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [themeChanger, setThemeChanger] = useState(<Brightness2Icon/>);

    useEffect( () => {
        const current = localStorage.getItem('theme');
        if(current==='dark'){
            setThemeChanger(<WbSunnyIcon/>)
        } else if(current==='light'){
            setThemeChanger(<Brightness2Icon/>)
        }

        retrieveNavbar()
        .then(res => {
            const Items = res.items.map((item) =>
            <NavItem key={item.title}>
                <NavLink key={item.title} href={item.url}>{item.title}</NavLink>
            </NavItem>
            );
            setLoaded(true);
            setListItems(Items)
        });
        return () => {
            setLoaded(false);
        }
    },[])

    const showLinks = () => {
        let show = clicked;
        setClicked(!show)
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
                <TopNav>
                    <Left>
                        <NavItem>
                            <Logo mr href='/'>Milan Tornier</Logo>
                        </NavItem>
                        <NavItem>
                            <Burger onClick={showLinks}><ReorderIcon/></Burger>
                        </NavItem>
                    </Left>
                    <Right show={clicked}>
                        {listItems}
                        <Button onClick={changeTheme}> {themeChanger} </Button>
                    </Right>
                </TopNav>
        )
    }
    else {
        return null;
    }
}

