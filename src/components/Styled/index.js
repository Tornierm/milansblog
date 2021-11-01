import styled, {keyframes} from 'styled-components'

export const Wrapper = styled.section`
    margin-right: auto;
    margin-left:  auto;
    max-width: 64em;
    min-height:100vh;
    border: 2px solid var(--p-9);
`

export const Loading = styled.section`  
    margin-right: auto; /* 1 */
    margin-left:  auto; /* 1 */
    max-width: 60em; /* 2 */
    height:100vh;   
    display:flex;
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

export const Title = styled.h1`
    color:var(--p-1);
`

const pulse = keyframes`
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(1.3);
        opacity: 0;
    }
`;

export const Spinner = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: relative;
    display: inline-block;
    align-self:center;
    left:50%;
    margin-left:-50px;

    :after, :before{
        content: '';
        display: block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background:red;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -50px;
        background: var(--s-7);
        animation: ${pulse} 3s linear infinite;
        opacity: 0;
    }   
        
    &:after{
        animation: ${pulse} 2s linear 2.3s infinite;
    }
`



  
