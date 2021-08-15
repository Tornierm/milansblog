import styled from 'styled-components'

export const Wrapper = styled.section`
    margin-right: auto; /* 1 */
    margin-left:  auto; /* 1 */
    max-width: 60em; /* 2 */
`

export const Loading = styled.section`  
    margin-right: auto; /* 1 */
    margin-left:  auto; /* 1 */

    max-width: 60em; /* 2 */

    display:flex;
    justify-content:center;
    align-items:center;
`

export const Button = styled.button`
    background-color: var(--s-dark);
    border: 1px var(--s-dark) solid;
    color:white;
    border-radius: .4em;
    display: inline-block;
    text-align: justify;
    text-decoration: none;
    width: 10em;
    margin:1em 0em 0em 0em;
    padding:.5em;
    :hover{
        color:black;
        transition: .5s;
        border: 1px black solid;
    }
`

export const Line = styled.hr`
    width: 100%;               
    opacity: 1;
    border-top: ${props => props.height} solid var(--p-1);
    margin:.5em 0;
`

