import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { retrieveFeaturedMedia, retrieveWelcomePage } from '../service/WPService';
import {Loading} from './Styled'

export default function Welcome() {

    const [categories, setCategories] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [imageUrl, setImageUrl] = useState('');

    useEffect( () => {   
      
    })

    if(isLoaded){
        return (
            <Container>
            </Container>
        )
    }
    else{
        return <Loading></Loading>
    }
}