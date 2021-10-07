import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { css, Global } from "@emotion/react";

import FrontPage from "./home/front-page";
import Dip from "./page/dip/dip";
import usePages from "../hooks/usePages";
import PageSingle from "./page/page-single";
import RecentPosts from "../components/recent-posts";
import usePosts from "../hooks/usePosts";
import useEvents from "../hooks/useEvents";

export const query = graphql`
  query ($id: String!) {
    allWpPage(filter: { id: { eq: $id } }) {
      nodes {
        id
      }
    }
  }
`;

// markup
const Post = ({ data }) => {
  const {
    allWpPage: { nodes: pages },
  } = data;

  const [page] = usePages().filter( page => pages.map( item => item.id).includes( page.id ) );

  const { slug, isFrontPage } = page;
  
  //Obtiene los datos de los Posts de las categorías seleccionadas
  const posts = usePosts().filter( post => post.categories.filter( category => page.posts.categories.map( item => item.id ).includes(category.id) ).length );

  //Obtiene los datos de los Eventos
  const events = useEvents().filter( event => event.categories.filter( category => page.events.categories.map( item => item.id ).includes( category.id ) ).length );

  return (
    <Layout>
      <Global styles={ css`${page.styles}` } />
      {
        isFrontPage? (
          <FrontPage {...{ page, posts, events }}/>
        ) : slug === 'investigacion'? (
          <Dip  {...{ page }}/>
        ) : (
          <PageSingle {...{ page }}/>
        )
      }

      {
        !isFrontPage? (<RecentPosts {...{posts}} />) : null
      }

    </Layout>
  );
};
export default Post;
