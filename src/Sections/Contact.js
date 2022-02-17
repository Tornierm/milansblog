import React, {useState} from 'react'
import {Wrapper, H1, PrimaryButton} from '../components/Styled';
import Input from '../components/Basics/Input'
import TextField from '../components/Basics/TextField'
import styled, {keyframes} from "styled-components";

import {contactFormSubmission} from "../service/WPService.js"

const Container = styled(Wrapper)`
    min-height:60vh;
    padding 1em;
`

const Form = styled.form`
    border: 2px solid var(--s-3);
    border-radius:.5em;
    padding:3em 1em;
    width:100%;
    margin:0 auto;
    display:flex;
    flex-direction:column;
    align-items:center;
    max-width:30em;
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
const Feedback = styled.div`
    margin:1em;
    p{
        background-color:var(--s-3);
        color:var(--p-10);
    }
`

export default function Contact() {
    const [name, setName] = useState('')
    const [eMail, setEMail] = useState('')
    const [message, setMessage] = useState('')
    const [subject, setSubject] = useState('')

    const [nameError, setNameError] = useState('')
    const [eMailError, setEMailError] = useState('')
    const [messageError, setMessageError] = useState('')
    const [numberError, setNumberError] = useState('')

    const [feedback, setFeedback] = useState('')

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

    const subjectChange = (subject) => {
        
        if(
            subject.length === 0
            ){
            setNumberError("Whats your inquiry about ?")
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
        let emailBody = {
            "your-name": name,
            "your-email": eMail,
            "your-message": message,
            "your-subject": subject,
        };
        const form = new FormData();
        for (const field in emailBody) {
            form.append(field, emailBody[field]);
        }
        contactFormSubmission(form).then(res=>setFeedback(res.message));
    }

    return (
        <Container>
            <Form>
                <H1>Contact</H1>
                <Input label='Name' onchange={(name) => nameChange(name)} value={name} setValue={(name) => setName(name)} />
                {nameError ? <ValidationHints><p>{nameError}</p></ValidationHints>: null}
                <Input label='E-Mail' onchange={(eMail) => emailChange(eMail)} value={eMail} setValue={(eMail) => setEMail(eMail)} />
                {eMailError ? <ValidationHints><p>{eMailError}</p></ValidationHints>: null}
                <Input label='Subject' onchange={(subject) => subjectChange(subject)} value={subject} setValue={(subject) => setSubject(subject)} />
                {numberError ? <ValidationHints><p>{numberError}</p></ValidationHints>: null}
                <TextField label='Message' onchange={(message) => messageChange(message)} value={message} setValue={(message) => setMessage(message)} />
                {messageError ? <ValidationHints><p>{messageError}</p></ValidationHints>: null}
                <PrimaryButton  onClick={(e) =>{e.preventDefault(); submit()}}>Send</PrimaryButton>
                <Feedback><p>{feedback}</p></Feedback>
            </Form>
        </Container>
    )
}
