import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { DownloadIcon } from "./icons";
import { Row, Col } from "./layout/index";
import {h5} from "./styles/tipography";
import FeaturedMedia from "./featured-media"
import colors from "./styles/colors";
import ModalCard from "./modal"
import useModal from "./hooks/useModal";

const ResourceCard = ({
    state, actions, libraries, 
    title, to, icon, color=state.theme.colors.primary.dark,
    item
}) => {

    const [isOpenModal, openModal, closeModal] = useModal();
    
    return (
        <Card>
            <Div onClick={openModal}>
                <Row>
                    <Col>
                        <ResourceName color={color}>{title}</ResourceName>
                    </Col>
                </Row>
                <Row alignCenter>
                    <Col size="auto" mxAuto>
                        <Icon bgColor={icon?"transparent":colors.gray.light} hasIcon={icon?true:false}>
                        {
                            icon? (
                                <FeaturedMedia media={icon} />
                            ):(
                                <DownloadIcon />
                            )
                        }
                        </Icon>       
                    </Col>
                </Row>
            </Div>
            {/* Aca se les pasan los datos que se moestrar en el modal */}
            <ModalCard
                isOpen={isOpenModal} 
                closeModal={closeModal}>
                 <h1>Titulo en admisiones</h1>
                  
             </ModalCard> 
                                              
        </Card>
    )
}

export default ResourceCard;

const Card = styled.div`
    max-width: 300px;
    padding: 2rem;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,0.15);
    border-radius: 15px;
    margin: 0 auto;
    position: relative;
    margin-bottom: 50px;
    &:hover{
        svg{
            opacity: 0.5;
        }
    }
`;

const Div = styled.div`
    padding: 15px;
    display: block;
    &:hover{
      cursor: pointer;
    }
`;

const ResourceName = styled.span`
    ${({color="blue"}) => css`
        ${h5}
        display: block;
        text-align: center;
        font-weight: bold;
        color: ${color};
        margin: 0;
        margin-bottom: 1rem;
        text-transform: uppercase;
    `}
`;

const Icon = styled.div`
    ${({bgColor="lightgray", hasIcon=false})=>css`
        position: relative;
        display: block;
        margin: 0 auto;
        width: 70px;
        ${hasIcon?css`
            margin: 1rem auto;
        `:css`
            background-color: ${bgColor};
            padding-bottom: 70px;
            border-radius: 50%;
        `}
        svg{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1.5);
            fill: black;
            opacity: 0.25;
            transition: opacity 0.2s ease-in-out;
        }
    `}
`;

// const Button = styled.span`
//     ${cta}
//     margin-top: 1rem;
// `;