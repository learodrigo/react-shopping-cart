import styled from 'styled-components'

export const Wrapper = styled.div`
    border-bottom: 1px solid lightblue;
    display: flex;
    font-family: monospace;
    justify-content: space-between;
    padding: 20px;

    div {
        flex: 1;
    }

    .buttons,
    .information {
        display: flex;
        justify-content: space-between;
    }

    img {
        margin-left: 40px;
        max-width: 80px;
        object-fit: cover;
    }
`
