import { graphql, useStaticQuery } from 'gatsby';

const useEvents = () => {

    const resultado = useStaticQuery(
        graphql `
          {
            allWpEvent {
              nodes {
                id
                title
                link
                uri
                slug
                data {
                  dueDate
                }
                eventCategories {
                  nodes {
                    id
                    slug
                    name
                    link
                    uri
                  }
                }
              }
            }
          }
        `
    );

    return resultado.allWpEvent.nodes.map( event => ({
        id: event.id,
        title: event.title,
        slug: event.slug,
        uri: event.uri,
        link: event.link,
        dueDate: event.data.dueDate,
        categories: event.eventCategories.nodes,
    }));
}
 
export default useEvents;