import styled from 'styled-components'

export const Wrapper = styled.div`
    border: 1px solid lightblue;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    width: 100%;

    button {
        border-radius: 0 0 20px 20px;
    }

    img {
        border-radius: 20px 20px 0 0;
        max-height: 250px;
        object-fit: cover;
    }

    div {
        font-family: monospace;
        height: 100%;
        padding: 1rem;
    }
`
