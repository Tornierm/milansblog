import React, {useEffect, useState} from 'react'
import {retrieveIG} from '../../service/IGService';
import {Wrapper, Spinner, Title, Button} from '../Styled'
import styled, {css} from "styled-components";

const GridWrapper = styled(Wrapper)`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const ImageGrid = styled.div`
    max-width:40em;
    width:100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap 1em;
    padding:1em;
`

const ImageContainer = styled.div`
    order:${props => props.order};
    position: relative;
    width: 100%;
    padding-bottom : 100%; /* = width for a 1:1 aspect ratio */
    grid-column: span 1;
    grid-row: span 1;
    background-image:url(${props => props.image});
    background-position:center center;
    background-repeat:no-repeat;
    background-size:cover; 
    box-shadow: 2px 4px 3px 0px var(--p-black);

    ${({ clicked }) => clicked && css`
        grid-column:span 2;
        grid-row: span 2;
        ${({order}) => (order%3 === 0) && css`
            order:calc(${props => props.order} - 3);
        `}
    `}
`


export default function InstaPreview () {
    const [posts, setPosts] = useState()
    const [isLoaded, setIsLoaded] = useState()
    const [selected, setSelected] = useState()


    useEffect( () => {   
        retrieveIG()
        .then(res => {
            setPosts(res)
            setIsLoaded(true)
        })
        return function cleanup() {
            setIsLoaded(false);
        }
    },[])


        if(isLoaded){
            return (
                <GridWrapper id="ig">
                    <Title>Instagram</Title>
                    <ImageGrid>
                        { posts.map((post, index) => (
                            <ImageContainer 
                                key={'ig'+post.id}
                                clicked={selected === post.id} 
                                image={post.media_url}
                                order={(1+index)*2}
                                onClick={ () => {
                                    if(selected !== post.id){
                                        setSelected(post.id)
                                    }
                                    else{
                                        setSelected(null)
                                    }
                                }}
                            />
                        ))}
                    </ImageGrid>
                    <Button onClick={() => {window.location.href="https://www.instagram.com/milan.tornier"}}>Visit</Button>
                </GridWrapper>
            )
        }
        else{
            return (
                <Wrapper id="ig">
                    <Spinner/>
                </Wrapper>
            )
        }
}


