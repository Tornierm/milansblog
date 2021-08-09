import React, { useState, useEffect} from 'react';
import {retrieveNavbar} from '../../service/WPService';
import styled, {css} from 'styled-components'
import ReorderIcon from '@material-ui/icons/Reorder'

const TopNav = styled.div`
    position:fixed;
    top:0;
    transition: all .5s ease-in-out;

    z-index:999;
    height:60px;
    width:100%;
    display:flex;
    background-color:var(--p);
    border-bottom: 2px white solid;

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
    border-radius: .5em;
    padding:.8em;
    color: white;
    :hover{
        color: var(--s);
        transition:1s;
        -webkit-transition:1s;
        background-color:var(--p-dark);
        border-radius:.3em;
    }
    @media (max-width: 45em) {
        width:100%;
    }
`
const Logo = styled(NavLink)`
    font-family: w3-cursive;
    margin-right: auto;
    @media (max-width: 45em) {
        width:8em;
    }
`

const Right = styled.div`
display:flex;
flex-direction:row;
margin-left:auto;
background-color:var(--p);

@media (max-width: 45em) {
    flex-direction:column;
    margin-left:0;
    margin-bot:5em;
    border-bottom: 2px white solid;
    ${props => !props.show && css`
    display:none;
`}
}
`
const Left = styled.div`
    display:flex;
    justify-content:space-between;
`

const Burger = styled.a`
    color:white;
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
export default function Navbar () {
    const [listItems, setListItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [clicked, setClicked] = useState(false);

    useEffect( () => {
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
                    </Right>
                </TopNav>
        )
    }
    else {
        return null;
    }
}

