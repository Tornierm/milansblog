import React, {useState, useEffect} from 'react';
import {Wrapper, Loading} from './Styled'
import styled from 'styled-components'
import Comments from './Comments/Comments'
import { retrieveFeaturedMedia, retrievePost } from '../service/WPService';

const PostWrapper = styled(Wrapper)`
    max-width:50em;
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
    left: 50%;
    right: auto;
    position:fixed;
    height:100vh;
    width:100vw;
    max-width:52em;
    z-index:1;
    margin-left:-26em;
    @media (max-width: 52em) {
        margin-left:0;
        left:0;
    }
`

const Margin = styled.div`
    padding:.5em;
    background-color: var(--p-7);
    opacity:90%;
    z-index:2;
`

const Article = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index:2;
`

const Info = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    max-width:100%;
    max-height:100%;
    height: 100vh;
    width: 100vw;
    z-index:2;
`

const Title = styled.h1`
    background-color:var(--p-9);
    border-radius:.1em;
    padding:.2em;
    color:var(--p-1);
`

const Content = styled.div`
    width:100vw;
    max-width:100%;
    background-color:var(--p-9);
    padding:2em;
    display:flex;
    flex-direction:column;
    align-items:center; 
    p{
        color:var(--p-1);
        text-align: justify;
    }
    img{
        height:auto;
        max-height:calc(80vh);
        width:auto;
        max-width:100%;
        object-fit: cover;
        display:block;
    }
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
            if(!(res === null)){
                setImageUrl(res.media_details.sizes.full.source_url)
            }
            setIsLoaded(true)
        })
        
    },[match.params])

    if(isLoaded){
        return(
            <PostWrapper>
                <Header img={imageUrl}>
                </Header>
                <Info>
                    <Title dangerouslySetInnerHTML={{__html: post.title.rendered}}/>
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


