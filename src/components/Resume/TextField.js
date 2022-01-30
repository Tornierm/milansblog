import React, {useState} from 'react'
import styled from "styled-components";

const InputContainer = styled.div`
    position:relative;
    width:300px;
    margin-top:.8em;
    > .input {
        border:2px solid var(--s-1);
        color:var(--p-1);
        outline: none;
        min-height:100px;
        height:auto;
        width:100%;
        border-radius:16px;
        background-color:transparent;
        padding-left:12px;
        :hover{
            border:2px solid var(--s-3);
        }
        :focus{
            border:2px solid var(--s-3);
        }
    }
    > label {
        position:absolute;
        left:12px;
        top: 4px;
        transition: 
        top 200ms ease-in,
        font-size 200ms ease-in;
        background-color:var(--p-10);
        padding:0 4px;
        cursor:text;
        pointer-events: none;
        color:var(--p-5);
    }
    > .input:focus ~ label, .input:not(:placeholder-shown).input:not(:focus) ~ label  {
        color:var(--s-3);
        top: -10px;
        font-size: 12px;
    }
`  

export default function Input(props) {
    const [label] = useState(props.label);
    const [value, setValue] = useState(props.value);

    return (
        <InputContainer>
            <textarea 
                className='input' 
                name='input' 
                placeholder=" "
                type='text'
                value={value}
                onChange={(e) =>{ setValue(e.target.value); props.setValue(e.target.value); props.onchange(e.target.value) }}
            />
            <label>
                {label}
            </label>
        </InputContainer>
    )
}
