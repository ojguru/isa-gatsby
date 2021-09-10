import React from "react";
import styled from "@emotion/styled";
import { Section, Container, Row, Col } from "../../../components/layout/index";
import { HotelIcon, FoodIcon } from "../../../components/icons";
import { css } from "@emotion/react";
import colors from "../../../components/styles/colors";

const AdmissionServices = ({ page }) => {

  const services = [
    {
      name: "Alojamiento",
      icon: HotelIcon,
    },
    {
      name: "Alimentación",
      icon: FoodIcon
    }
  ]

  return (
    <Section>
      <Container>
        <Row>
          <Col>
            <Title>Servicios Opcionales</Title>
            <Row alignCenter>
            {services.map((service, index) => {

              const Icono = service.icon;

              return (
                <Col key={index} size={12} sizeMD={4} mxAuto>
                    <Service>
                        <Icon css={css`color: ${colors.primary.dark};`}>
                          <Icono />
                        </Icon>
                        <h3>{service.name}</h3>
                    </Service>
                </Col>
              );
            })}
            </Row>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default AdmissionServices;

const Title = styled.h2`
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 4rem;
`;

const Service = styled.div`
    width: 100%;
    max-width: 25rem;
    margin: 0 auto;
    margin-bottom: 2rem;
    background-color: #FAFAFA;
    padding: 1.5rem;
    text-align: center;
`;

const Icon = styled.div`
  max-width: 6rem;
  margin: 0 auto;
`;
