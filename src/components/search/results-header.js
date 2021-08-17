import React from "react";
// import ReslutsSearchForm from "./results-form" 
import styled from "@emotion/styled";
import { Container, Section, Row, Col, mq} from "../layout/index";
import colors from '../styles/colors';
import { css } from '@emotion/react';

const ResultsHeader = () => {

  return (
    <Section spaceNone>
            <DivBG  
                bg={ colors.gray.light }
                deco={ colors.blue.dark }
                deco2={ colors.green.base }  />

            <Container>
                <Row>
                    <Col size={10} sizeMD={7}>
                        <Header>
                            {/* <ReslutsSearchForm/> */}
                            <Filtros>  Filtros </Filtros>
                        </Header>
            
                    </Col>
                </Row>
            </Container>
    </Section>
  );
};

export default  ResultsHeader ;


const Header = styled.div`
    margin-top: -10rem;
`;

const Filtros = styled.div`
  padding: 1rem;
`;


const DivBG = styled.div`
    ${({ bg, deco, deco2 })=>css`
        width: 100%;
        height: 20rem;
        position: relative;
        top: 0;
        background: ${ bg };
      &::before{
        content: '';
        position: absolute;
        bottom: -2rem;
        right: -4rem;
        background: ${ deco };
        clip-path: circle(50% at 100% 50%);
        padding: 9rem;
      }
    `}
`;