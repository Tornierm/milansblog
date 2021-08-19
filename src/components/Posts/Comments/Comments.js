import {useState, useEffect} from 'react'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import {retrieveComments} from '../../../service/WPService'
import styled, {css} from 'styled-components'

const CommentSection = styled.section`
    margin-bottom:1.5em;
    background-color: var(--p-9);
    padding:1em;
`

const Button = styled.button`
    align-self:flex-end;
    width:8em;
    text-align: center;
    margin:0em 0em 0em .5em;
    color: var(--p-1);
    background-color:transparent;
    border:none;
    border-bottom: 2px var(--s-3) solid;
    :hover{
        color: var(--s-3);
        transition:1s;
        -webkit-transition:1s;
        border-bottom: 2px var(--p-9) solid;
    }
    @media (max-width: 45em) {
        width:100%;
    }
`

const Container = styled.section`
    display:flex;
    flex-direction:column;
    ${props => props.depth === 1 && css`
        margin-left: 2em;
    `}
`

const Buttons = styled.div`
    display:flex;
    justify-content:flex-end;
    margin-bottom:.5em;
`

export default function Comments(props) {

    const [comments, setComments] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [id]  = useState(props.post)
    const [parent] = useState(props.parent)

    const [hideForm, setHideForm] = useState(false);
    const [hideReplies, setHideReplies] = useState(false);

    const [showRepliesText, setShowRepliesText] = useState('show replies')
    const [replyText, setReplytext] = useState('reply')

    const [depth] = useState(props.depth)
    
    useEffect( () => {

        console.log('retrieve')
        retrieveComments(id, parent).then( res =>
            setComments(res),
            setLoaded(true),
        )

        return function cleanup() {
            setLoaded(false);
        }

    }, [id, parent])

    const showReplies = (currently) => {
        setHideReplies(!currently);
        if(hideReplies){
            setShowRepliesText('show replies')
        } else {
            setShowRepliesText('hide replies')
        }
    }

    const showForm = (currently) => {
        setHideForm(!currently);
        if(hideForm){
            setReplytext('reply')
        } else {
            setReplytext('cancel')
        }
    }

    const updateComments = (newComment) => {
        showReplies(false);
        if(newComment === null){
            return;
        }
        setComments(comments => [newComment, ...comments])
    }

        if(loaded){
            return (
                <CommentSection>
                    <Container depth={depth}>
                        <Buttons>
                            {depth===1 && <Button onClick={() => showForm(hideForm)}>{replyText}</Button>}
                            {depth===1 && <Button onClick={() => showReplies(hideReplies)}>{showRepliesText}</Button> }
                        </Buttons>
                        {(depth===0||hideForm) && 
                            <CommentForm
                                updateComments = {x => updateComments(x)} 
                                post={id}
                                parent={parent} 
                                key={'commentForm'+{parent}} 
                            />
                        }
                        <br/>
                        {(depth===0||hideReplies) && comments.map(comment => (
                            <CommentItem 
                                depth={depth+1}
                                key={comment.id} 
                                comment={comment}
                            />
                        ))}
                    </Container>
                </CommentSection>
            )
        } else {
            return 'loading...'
        }
}

