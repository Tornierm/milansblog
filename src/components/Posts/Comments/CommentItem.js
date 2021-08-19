import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import CommentForm from './CommentForm'
import Comments from './Comments'

const Container = styled.div`
    display:flex;
    background-color: var(--p-9);
    padding:0.5em;
    transition: opacity 1s;
    border: 1px var(--p-1) solid;
`

const Comment = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    margin-left:1em;
`
const Meta = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    margin-right:1em;
`
const Content = styled.div`
    border-radius:1em;
    display:flex;
    flex-direction:column;
    width:100%;
`

const Avatar = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    ${props => props.depth === 2 && css`
        width: 36px;
        height: 36px;
    `}
`
const Author = styled.p`
    margin:0;
    padding:0;
    color:var(--p-3);
`
const Text = styled.div`
    p{
        margin:0 0em;
        color:var(--p-1);
    }
`
const Date = styled.div`
    p{
        font-size:.6em;
        color:var(--p-3);
        margin:0;
    }
    align-self:flex-end;
`

export default function CommentItem (props) {
    const [hideForm] = useState(false);

    const [comment] = useState(props.comment.content.rendered)
    const [author] = useState(props.comment.author_name)
    const [avatar] = useState(props.comment.author_avatar_urls[48])
    const [date] = useState(props.comment.date)
    const [depth] = useState(props.depth)


    return (
        <div>
            <Container>
                <Avatar depth={depth} src={avatar}></Avatar>
                <Comment>
                    <Meta>
                        <Author>{author}</Author>                         
                        <Date><p>{date}</p></Date>
                    </Meta>
                    <Content depth={depth}>
                        <Text dangerouslySetInnerHTML={{__html: comment}}></Text>
                    </Content>
                    {hideForm && 
                        <CommentForm 
                            parent={props.comment.id} 
                            key={'f'+props.comment.id} 
                            post={props.comment.post}                    
                        ></CommentForm>
                    }
                </Comment>
            </Container>
            <Comments depth={depth} key={'r'+props.comment.id} post={props.comment.post} parent={props.comment.id}></Comments>
        </div>
    )
}
