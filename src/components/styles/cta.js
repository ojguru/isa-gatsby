import {css} from "@emotion/react";

const ctas = ({bgColor="#00A4E5", bgActiveColor="#1A5687", shadowColor="rgba(115, 185, 255, 0.5)", textColor="#FFFFFF",paddingX="5rem"}) => css`
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: ${bgColor};
    font-weight: bold;
    padding: 1rem ${paddingX};
    border-radius: 0.8rem;
    display: inline-block;
    color: ${textColor} !important;
    outline: initial;
    border: initial;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    &:focus{
        box-shadow: 0 0 0 0.32rem ${shadowColor};
    }
    &:hover{
        color: ${textColor} !important;
        background-color: ${bgActiveColor};
    }

`;

export default ctas;