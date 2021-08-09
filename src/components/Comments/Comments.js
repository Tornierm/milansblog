import {useState, useEffect} from 'react'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import {retrieveComments} from '../../service/WPService'
import styled, {css} from 'styled-components'

const CommentSection = styled.section`
margin-bottom:1.5em;
`

const Button = styled.button`
    margin-left:4em;
    align-self:flex-end;
    border: none;
    background-color: transparent;
    color: var(--s-dark);
    max-width:8em;
`

const Container = styled.section`
    display:flex;
    flex-direction:column;
    ${props => props.depth === 1 && css`
        margin-left: 2em;
    `}
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
        console.log('add')
        console.log(newComment)
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
                        {depth===1 && <Button onClick={() => showForm(hideForm)}>{replyText}</Button>}
                        {(depth===0||hideForm) && 
                            <CommentForm
                                updateComments = {a => updateComments(a)} 
                                post={id}
                                parent={parent} 
                                key={'commentForm'+{parent}} 
                            />
                        }
                        {depth===1 && <Button onClick={() => showReplies(hideReplies)}>{showRepliesText}</Button> }
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

