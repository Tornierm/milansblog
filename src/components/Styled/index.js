import styled, {keyframes, css} from 'styled-components'

//Animations

export const neon = keyframes`
    0%,15%,17%,23%{
        color: transparent;
        text-shadow:none;
    }
    14%,16%,22%,50%,100%{
        color: var(--p-vlight);
        text-shadow:0 0 5px var(--s-3),
        0 0 10px var(--s-3),
        0 0 20px var(--s-3),
        0 0 40px var(--s-3),
        0 0 80px var(--s-3);
        0 0 160px var(--s-3);
    }
`;

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

export const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-50px);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
`;

//Basic Components

export const H1 = styled.h1` 
    color:var(--p-1);
    position:relative;
    margin:0 auto;
    padding:.3em;
    width:max-content;
    :before{
        position:absolute;
        display:block;
        content:'';
        bottom:0;
        left:0;
        width:100%;
        height:3px;
        background: radial-gradient(circle, var(--p-3) 0%, var(--p-10) 100%);
    }
`

export const H2 = styled.h2` 
    width:100%;
    color:var(--p-1);
    margin:0;
    text-align:center;
`

export const H3 = styled.h3` 
    width:100%;
    color:var(--p-1);
    margin:0;
    text-align:center;
`

export const H4 = styled.h4` 
    width:100%;
    color:var(--p-1);
    margin:0;
    text-align:center;
`

export const Paragraph = styled.p`
    color: var(--p-1);
    text-align: center;
    padding:var(--margin) 0;
    ${props => props.fadeIn && css`
        animation: ${fadeIn} 1s forwards;
    `}
`

export const Line = styled.hr`
    width: 100%;               
    opacity: 1;
    border-top: ${props => props.height} solid var(--p-1);
    margin:.5em 0;
`

export const PrimaryButton = styled.button`
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

export const SecondaryButton = styled.button`
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

export const Wrapper = styled.section`
    margin-right: auto;
    margin-left:  auto;
    max-width: 64em;
    padding:0 0;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`


//Loading Page
export const Loading = styled.section`  
    margin-right: auto; /* 1 */
    margin-left:  auto; /* 1 */
    max-width: 60em; /* 2 */
    height:100vh;   
    display:flex;
`

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
`;




  
