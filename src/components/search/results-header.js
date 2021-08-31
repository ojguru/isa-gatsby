import React from "react";
import styled from "@emotion/styled";
import { Container, Section, Row, Col } from "../layout/index";
import colors from '../styles/colors';
import { css } from '@emotion/react';
import SearchForm from "./input"

const ResultsHeader = ({...props}) => {

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
                  <Label>
                    <SearchForm isResults={true} {...props}/>
                  </Label>
                  </Header>
      
              </Col>
          </Row>
      </Container>
    </Section>
  );
};

export default  ResultsHeader ;


const Header = styled.div`
    margin-top: -6rem;
`;

const DivBG = styled.div`
    ${({ bg, deco, deco2 })=>css`
        width: 100%;
        height: 18rem;
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


const Label = styled.label`
  align-items: stretch;
  display: flex;
  font-size: inherit;
  margin: 0;
  width: 100%;
`;

