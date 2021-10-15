import styled from 'styled-components'

export const Wrapper = styled.section`
    padding-top: var(--navbar-height);
    padding-bottom: var(--sidebar-height);
    margin-right: auto; /* 1 */
    margin-left:  auto; /* 1 */
    max-width: 60em; /* 2 */
    min-height:100vh;
`

export const Loading = styled.section`  
    margin-right: auto; /* 1 */
    margin-left:  auto; /* 1 */

    max-width: 60em; /* 2 */
    height:100vh;

    display:flex;
    justify-content:center;
    align-items:center;
    color: var(--s-1);
`

export const Button = styled.button`
    background-color: transparent;
    color: var(--s-1);
    text-align: left;
    border:2px solid var(--s-3);
    width: 10em;
    padding:.5em;
    margin-top:1em;
    :hover{
        border:2px solid var(--p-9);
        color: var(--s-3);
        transition: .5s;
    }
    @media (max-width: 45em) {
        margin:1em 0;
    }
`

export const Line = styled.hr`
    width: 100%;               
    opacity: 1;
    border-top: ${props => props.height} solid var(--p-1);
    margin:.5em 0;
`
