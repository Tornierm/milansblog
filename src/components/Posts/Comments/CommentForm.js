import {useState} from 'react'
import styled from 'styled-components'
import {PrimaryButton} from '../../Styled'
import {postComment} from '../../../service/WPService'

const Form = styled.form`
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color: var(--p-9);
    padding:1em;
`

const Label = styled.label`
    color:var(--p-3);
`
const Info = styled.div`
    display:flex;
    justify-content:space-between;
    width:100%;
    @media (max-width: 45em) {
        flex-direction:column;
    }
`

const Input = styled.input`
    border: none;
    background-color: var(--p-white);
    margin:0;
    border-bottom:1px var(--p-1) solid;
`

const Comment = styled.textarea`
    height: 100px;
    width=100%;
    border: none;
    background-color: white;
    margin:0 ;
    border-bottom:1px var(--p-1) solid;
`
const FormItem = styled.div`
    display:flex;
    Flex-Direction:column;
    width:100%;
    margin:0 .5em;
    @media (max-width: 45em) {
        margin:0em;
    }
`


export default function CommentForm(props) {
    const [parent] = useState(props.parent)
    const [post] = useState(props.post)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [comment, setComment] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = JSON.stringify({
            post: post,
            author_name: name,
            author_email: email,
            content:comment,
            parent:parent
        })
        await(postComment(data))
        .then(res => props.updateComments(res))
    }

        return (
            <Form onSubmit={handleSubmit.bind(this)}>
                <Info>
                    <FormItem>
                        <Label htmlFor="name">Name*</Label>
                        <Input type="text" id="name" name="name" value={name} onChange={(event) => {setName(event.target.value)}}/>
                    </FormItem>
                    <FormItem>
                        <Label htmlFor="email">E-mail*</Label>
                        <Input type="text" id="email" name="email" value={email} onChange={(event) => {setEmail(event.target.value)}}/>
                    </FormItem>
                </Info>
                <FormItem>
                    <Label htmlFor="comment">Comment</Label>
                    <Comment type="text" id="comment" name="comment" value={comment} onChange={(event) => {setComment(event.target.value)}}/>
                </FormItem>
                <PrimaryButton type="submit" >Comment</PrimaryButton>
            </Form>
        );
    }

