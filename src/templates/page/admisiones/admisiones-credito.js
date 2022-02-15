import React from 'react'
import styled from '@emotion/styled'
import { Section, Container, Row, Col } from '../../../components/layout/index'
import FeaturedMedia from '../../../components/featured-media'
import useFiles from '../../../hooks/useFiles'

const AdmisionesCredito = () => {
  const images = useFiles()

  const data = [
    {
      url: 'https://bancoadopem.com.do/',
      title: 'Banco Adopem',
      image: images.admisiones.banco_adopem,
    },
    {
      url: 'https://banfondesa.com.do/',
      title: 'Banfondesa',
      image: images.admisiones.banfondesa,
    },
    {
      url: 'https://www.fundapec.edu.do/',
      title: 'Fundapec',
      image: images.admisiones.fundapec,
    },
  ]

  const contacto = {
    content: `
   <p>
    <span><strong>CONTACTOS</strong></span><br/>
    <span>Correo: </span> <a href="mailto: asistenciaeconomica@isa.edu.do">asistenciaeconomica@isa.edu.do</a>  <br/>
    <span>Teléfono:</span> <a href="tel:+18092472000">809-247-2000. Ext.: 235, 236 y 237.</a>
   <p>   
   
   `,
  }

  return (
    <Section id="section_4">
      <Container>
        <Row>
          <Col>
            <Title>Asistencia para la gestión del crédito educativo</Title>
            <Copy>Financiamiento disponible a través de:</Copy>
            <Row alignCenter>
              {data.map((item, key) => {
                return (
                  <Col key={key} size={12} sizeMD={4}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.title}
                    >
                      <Institution>
                        <Media>
                          <FeaturedMedia media={item.image} />
                        </Media>
                      </Institution>
                    </a>
                  </Col>
                )
              })}
              <div dangerouslySetInnerHTML={{ __html: contacto.content }} />
            </Row>
          </Col>
        </Row>
      </Container>
    </Section>
  )
}

export default AdmisionesCredito

const Title = styled.h2`
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 4rem;
`

const Copy = styled.p``

const Institution = styled.div`
  width: 100%;
  max-width: 25rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  display: flex;
  position: relative;
`

const Media = styled.div`
  flex: 1;
`
