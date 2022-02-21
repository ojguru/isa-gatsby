import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import container from "../../components/layout/new/container";
import colors from "../../components/styles/colors";
import useFiles from "../../hooks/useFiles";
import FeaturedMedia from "../../components/featured-media";
import mq from "../../components/layout/new/mq";
import Carousel from "react-slick";
import { mqVal } from "../../components/layout/index";

const EgresadosBody = (props) => {
  const images =
    Object.values(useFiles()["servicios-estudiantiles"]).filter((imagen) =>
      imagen.name.includes("agisa")
    ) || [];

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState([]);
  const [slider2, setSlider2] = useState([]);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  const title = "Asociación De Graduados De ISA (AGISA)";
  const content = `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae mattis nunc. Nunc volutpat non turpis ut tempus. Nulla volutpat, nisl quis euismod condimentum, nulla sem convallis ligula, sed finibus nibh libero et libero. Aenean eu dolor porta quam facilisis sodales vel vel nisi. Sed a lectus id nisi laoreet dapibus venenatis non urna. </p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae mattis nunc. Nunc volutpat non turpis ut tempus. Nulla volutpat, nisl quis euismod condimentum, nulla sem convallis ligula, sed finibus nibh libero et libero. Aenean eu dolor porta quam facilisis sodales vel vel nisi. Sed a lectus id nisi laoreet dapibus venenatis non urna. </p>

      `;

  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <Wrapper>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Content>
        <MediaContainer>
          <DecoMedia decoBg={colors.blue.dark} decoBgA={colors.cta.base}>
            <VisualCarousel>
              <Carousel
                asNavFor={nav2}
                pauseOnHover
                arrows={false}
                ref={(slider) => setSlider1(slider)}
              >
                {images.map((item, index) => {
                  return (
                    <Logo
                      key={index}
                      media={item}
                      size="56.25%"
                      sizeLG="100%"
                      bgColor
                    />
                  );
                })}
              </Carousel>
            </VisualCarousel>

            <ThumbnailCarousel>
              <Carousel
                autoplay
                asNavFor={nav1}
                ref={(slider) => setSlider2(slider)}
                slidesToShow={3}
                pauseOnHover
                vertical={true}
                verticalSwiping={true}
                arrows={false}
                responsive={[
                  {
                    breakpoint: mqVal.lg,
                    settings: {
                      vertical: false,
                      verticalSwiping: false,
                      slidesToShow: 4,
                      arrows: false,
                      dots: false,
                      centerMode: true,
                    },
                  },
                ]}
              >
                {images.map((item, index) => {
                  return (
                    <Dot key={index} onClick={(e) => nav2.slickGoTo(index)}>
                      <Logo media={item} size="56.25%" sizeLG="100%" bgColor />
                    </Dot>
                  );
                })}
              </Carousel>
            </ThumbnailCarousel>
          </DecoMedia>
        </MediaContainer>
      </Wrapper>
    </Section>
  );
};

export default EgresadosBody;

const Section = styled.section`
  padding: 4rem 0;
  background-color: ${colors.gray.light};
`;

const SectionTitle = styled.h1`
  text-align: center;
`;

const Wrapper = styled.div`
  ${container};

  ${mq.lg} {
    padding: 5%;
    display: grid;
    grid-template-columns: 47.75% 47.75%;
    column-gap: 5%;
  }
`;

const Dot = styled.div``;

const Logo = styled(FeaturedMedia)``;

const Content = styled.div`
  color: ${(props) => props.color};
  padding: 1.5rem;
  ${mq.sm} {
    padding: 5%;
  }
  ${mq.lg} {
    padding: 0;
    order: 2;
  }
`;



const MediaContainer = styled.div`
  position: relative;
  ${mq.lg} {
    height: 0;
    padding-bottom: 73%;
    order: 1;
  }
`;

const DecoMedia = styled.div`
  display: grid;
  grid-template-columns: 100%;
  row-gap: 1.5rem;

  &:before {
    content: "";
    position: absolute;
    right: 5%;
    top: 0%;
    transform: translate(0, -50%);
    background: ${colors.primary.base};
    width: 23%;
    padding-bottom: 4%;
    z-index: -1;
  }
  &:after {
    content: "";
    position: absolute;
    right: 5%;
    top: 0%;
    transform: translate(0, -50%);
    background: ${colors.primary.dark};
    width: 12%;
    padding-bottom: 4%;
    z-index: -1;
  }

  ${mq.lg} {
    grid-template-columns: 23.75% 73.75%;
    column-gap: 2.5%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &::before {
      z-index: 0;
    }
    &::after {
      z-index: 0;
    }
  }
`;

const VisualCarousel = styled.div`
  font-size: 0;

  ${mq.lg} {
    order: 2;
  }
`;

const ThumbnailCarousel = styled.div`
  font-size: 0;
  width: 100%;
  display: block;

  .slick-list {
    padding: 0 !important;
  }

  .slick-slide {
    padding: 0 0.75rem;
  }

  ${mq.lg} {
    order: 1;
    height: 100%;
    position: relative;

    .slick-slider {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
    }

    .slick-list {
      height: 100% !important;
    }

    .slick-slide {
      padding: 0;
      padding-bottom: 10%;
      overflow: hidden;
    }
  }
`;
