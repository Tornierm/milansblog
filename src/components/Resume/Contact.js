import React, {useState} from 'react'
import {Wrapper, H1, PrimaryButton} from '../Styled';
import Input from './Input'
import TextField from './TextField'
import styled, {keyframes} from "styled-components";

<script src="https://smtpjs.com/v3/smtp.js">
</script>

const Container = styled(Wrapper)`
    min-height:80vh;
`

const Form = styled.form`
    border: 2px solid var(--s-3);
    border-radius:.5em;
    padding:5em 1em;
    width:100%;
    margin:0 auto;
    display:flex;
    flex-direction:column;
    align-items:center;
    @media (min-width: 45em) {
        min-width:40em;
    }
`

const line = keyframes`
    0% {
        transform:scaleY(0);
    }
    100% {
        transform:scaleY(1);
    }
`;

const ValidationHints = styled.div`
    width:290px;
    p{
        margin:0 1em;
        background-color:var(--s-3);
        color:var(--p-10);
        border-radius:0 0 .3em .3em;
        padding:8px 16px;
    }
    transform-origin:top;
    transform:scale(0);
    animation:${line} .4s ease-in-out forwards;
`

export default function Contact() {
    const [name, setName] = useState('')
    const [eMail, setEMail] = useState('')
    const [message, setMessage] = useState('')
    const [number, setNumber] = useState('')

    const [nameError, setNameError] = useState('')
    const [eMailError, setEMailError] = useState('')
    const [messageError, setMessageError] = useState('')
    const [numberError, setNumberError] = useState('')

    const nameChange = (name) =>  {
        if(name.length < 3){
            setNameError("Name must have 3 letters")
        } else {
            setNameError(null)
        }
    }

    const emailChange = (eMail) => {
        if(
            !eMail.match(
                //eslint-disable-next-line
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ){
            setEMailError("invalid E-mail")
        } else {
            setEMailError(null)
        }
    }

    const numberChange = (number) => {
        
        if(
            !number.match(
                //eslint-disable-next-line
                /^([0-9\(\)\/\+ \-]*)$/
            )
            ){
            setNumberError("invalid Number")
        } else {
            setNumberError(null)
        }
    }

    const messageChange = (message) => {
        if(
            message.length < 30
        ){
            let tmp = "Tell me more :) (" + (30-message.length).toString() + " letters)";
            setMessageError(tmp)
        } else {
            setMessageError(null)
        }
    }

    const submit = () => {
        
    }

    return (
        <Container>
            <Form>
                <H1>Contact</H1>
                <Input label='Name' onchange={(name) => nameChange(name)} value={name} setValue={(name) => setName(name)} />
                {nameError ? <ValidationHints><p>{nameError}</p></ValidationHints>: null}
                <Input label='E-Mail' onchange={(eMail) => emailChange(eMail)} value={eMail} setValue={(eMail) => setEMail(eMail)} />
                {eMailError ? <ValidationHints><p>{eMailError}</p></ValidationHints>: null}
                <Input label='Number' onchange={(number) => numberChange(number)} value={number} setValue={(number) => setNumber(number)} />
                {numberError ? <ValidationHints><p>{numberError}</p></ValidationHints>: null}
                <TextField label='Message' onchange={(message) => messageChange(message)} value={message} setValue={(message) => setMessage(message)} />
                {messageError ? <ValidationHints><p>{messageError}</p></ValidationHints>: null}
                <PrimaryButton >Send</PrimaryButton>

            </Form>
        </Container>
    )
}
