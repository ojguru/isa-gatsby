import React, {useState} from "react";
import { styled, css, connect } from "frontity";
import {Section, Container, Row, Col, mq} from "@osirispp/frontity-layout";
import {lighten, darken} from "polished";
import FeaturedMedia from "../../featured-media";

const CareerCompetencies = ({ state, libraries, facultyColor, career })=>{

    const {
        meta_box
    } = career;

    const { 
        career_competencies_title, 
        career_competencies_group
     } = meta_box;

    const {
        colors
    } = state.theme;

    const Html2React = libraries.html2react.Component;

    const [active, setActive] = useState(0);

    return (
        <Section>
            <Section spaceNone as="div">
                <Container>
                    <Row>
                        <Col>
                            <Title color={facultyColor}>{ career_competencies_title }</Title>
                        </Col>
                    </Row>
                </Container>
            </Section>
            <Section spaceNone as="div" css={displayerSectionStyles({
                bgColor: colors.gray.light,
                bgDecoBig: darken(0.15,facultyColor),
                bgDecoSmall: lighten(0.15,facultyColor),
            })}>
                <Container>
                    <Row>
                        <Col size="auto" mxAuto>
                            <Navigation justifyContent="center">
                            {
                                career_competencies_group.map((item,index)=>{

                                    const {
                                        name
                                    } = item;

                                    const isActive = index == active;

                                    return (
                                        <Col key={index} size={12} sizeSM="auto" noGutters>
                                            <NavItem>
                                                <Tab 
                                                    disabled={isActive} 
                                                    color={colors.text.base}
                                                    activeColor={darken(0.15,facultyColor)}
                                                    activeBgColor={lighten(0.52,facultyColor)}
                                                    onClick={(e) => {
                                                        setActive(index);
                                                    }}
                                                >{name}</Tab>
                                            </NavItem>
                                        </Col>
                                    )
                                })   
                            }
                            </Navigation>
                        </Col>
                    </Row>
                    <Displayer>
                        <Row>
                        {
                            career_competencies_group .map((item, index)=>{

                                const {
                                    content
                                } = item;

                                const isActive = index == active;

                                return (
                                    <Col key={index} size={12} hidden={!isActive}>
                                        <Content>
                                            <Description>
                                                <Html2React html={ content } />
                                            </Description>
                                        </Content>
                                    </Col>
                                )
                            })   
                        }
                        </Row>
                    </Displayer>
                </Container>
            </Section>
        </Section>
    );
}

export default connect(CareerCompetencies);

const displayerSectionStyles = ({
    bgColor="#F0F0F0",
    bgDecoBig = "green",
    bgDecoSmall = "lightgreen",
}) => css`
    background-color: ${bgColor};
    &:before{
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10%;
        padding-bottom: 10%;
        background-color: ${bgDecoBig};
        transform: translate(25%, 50%);
    }
    &:after{
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 5%;
        padding-bottom: 5%;
        background-color: ${bgDecoSmall};
        transform: translate(-100%, 50%);
        opacity: 0.5;
    }
`;

const Navigation = styled(Row)`
    padding: 0;
    margin: 0;
    margin-top: -2rem;
    box-shadow: .5rem .5rem .5rem rgba(0,0,0,0.15);
    background-color: white;
    border-radius: 1.5rem;
    overflow: hidden;
`;

const NavItem = styled.li`
    list-style: none;
    margin: 0;
`;

const Tab = styled.button`
    ${({color="darkgray", activeColor="green", activeBgColor="lightgreen"})=>css`
        text-transform: uppercase;
        padding: 1.5rem;
        display: block;
        max-width: initial;
        width: 100%;
        text-align: center;
        background-color: white;
        cursor: pointer;
        color: ${color};
        transition: all 0.25s ease-in-out;
        &[disabled]{
            color: ${activeColor};
            font-weight: bold;
            background-color: ${activeBgColor};
        }
    `}
`;

const Displayer = styled.div`

`;

const Content = styled.div`
    max-width: 75rem;
    margin: 0 auto;
    padding: 6rem 0;
    padding-bottom: 10rem;
    position: relative;
    z-index: 2;
    ${mq.md}{
        box-sizing: content-box;
        padding: 4rem 4rem;
        padding-bottom: 10rem;
    }
`;

const Title = styled.h2`
    ${({color="green"})=>css`
        color: ${color};
        text-transform: uppercase;
        margin-bottom: 4rem;
        text-align: center;
    `}
`;

const Description = styled.div`
    margin-bottom: 3rem;
`;
