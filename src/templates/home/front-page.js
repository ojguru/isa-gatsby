import React from "react";

import HomeCover from "./home-cover";
import HomeContact from "./home-contact";
import HomeProjects from "./home-projects";
import HomeAplication from "./home-aplication";
import HomeOffer from "./home-offer";
import HomeNews from "./home-news";
import Calendar from "../../components/calendar";

import useSlides from "../../hooks/useSlides";
import useProjects from "../../hooks/useProjects";

import { useStaticQuery, graphql } from "gatsby";

const FrontPage = ({ page, posts = [], events }) => {

  //Obtiene las imágenes localmente desde la ruta "images/home"
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          relativeDirectory: {
            in: [
              "home"
            ]
          }
        }
      ) {
        nodes {
          id
          name
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  `);

  // Convierte arreglo de imágenes en objeto cuya llave es el nómbre del archivo
  // Esto para facilitar la búsqueda de la imagenes en los componentes hijos.
  const images = allFile.nodes.reduce( (obj, item)=>{
      return {
          ...obj,
          [item.name]:item
      }
  }, {} )

  //Obtiene los datos de los slides
  const slides = useSlides();

  //Obtiene los datos de los Proyectos
  const projects = useProjects();

  // Load the post, but only if the data is ready.
  return (
    <>
      <HomeCover {...{ slides, images }} />
      <HomeOffer />
      <Calendar {...{events}} />
      <HomeNews {...{ posts }} />
      <HomeProjects {...{ projects }} />
      <HomeAplication {...{ images }} />
      <HomeContact {...{ images }} />
    </>
  );
};

export default FrontPage;