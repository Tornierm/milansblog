import React from 'react'
import {NeoButton, Wrapper} from '../components/Styled';
import styled from 'styled-components'

const ThisWrapper = styled(Wrapper)`
    padding-top:5em;
`

export default function ThemeComponents() {
    return (
        <ThisWrapper>
            <NeoButton>Button</NeoButton>
        </ThisWrapper>
    )
}
