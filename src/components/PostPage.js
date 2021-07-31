import React, {useState, useEffect} from 'react';
import {Wrapper, Loading} from './Styled'
import styled from 'styled-components'
import Comments from './Comments/Comments'
import { retrieveFeaturedMedia, retrievePost } from '../service/WPService';

const PostWrapper = styled(Wrapper)`
    display:flex;
    flex-direction:column;
`

const Header = styled.div`
    background: url(${props => props.img}) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-attachment: scroll;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position:fixed;
    height:100vh;
    width:100vw;
    z-index:-9;
`

const Margin = styled.div`
    padding:.5em;
    background-color: rgba(255,255,255,0.8);
`

const Article = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Info = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    max-width:100%;
    max-height:100%;
    height: 100vh;
    width: 100vw;
`

const Title = styled.h1`
    background-color:white;
    border-radius:.1em;
`

const Content = styled.div`
    width:100vw;
    max-width:100%;
    background-color: rgba(255,255,255,1);
    padding:2em;
`
export default function PostPage ({match}) {
    const [post, setPost] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [depth] = useState(0);

    useEffect( () => {
        const { id } = match.params;
        retrievePost(id)
        .then( res =>{
            setPost(res)
            return retrieveFeaturedMedia(res.featured_media)
        })
        .then(res => {
            setImageUrl(res.media_details.sizes.full.source_url)
            setIsLoaded(true)
        })
    },[match.params])

    if(isLoaded){
        return(
            <PostWrapper>
                <Header img={imageUrl}>
                </Header>
                <Info>
                    <Title>{post.title.rendered}</Title>
                </Info>
                <Article>
                    <Content dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
                </Article>
                <Margin>
                    <Comments parent="0" post={post.id} depth={depth}/>
                </Margin>
            </PostWrapper>
        )
    } else {
        return (
            <Loading>Loading...</Loading>
        )
    }
}


