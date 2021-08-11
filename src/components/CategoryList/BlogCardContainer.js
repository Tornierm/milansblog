import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { retrieveFeaturedMedia, retrievePageByName } from '../../service/WPService';
import {Loading} from '../Styled'

const CategoryContainer = styled.section`
    background-color:white;
    height:100vh;
`


export default function BlogCardContainer() {

    const [categories, setCategories] = useState()
    const [isLoaded, setIsLoaded] = useState(true)

    useEffect( () => {   
      
    })

    if(isLoaded){
        return (
            <CategoryContainer>
            </CategoryContainer>
        )
    }
    else{
        return <Loading></Loading>
    }
}