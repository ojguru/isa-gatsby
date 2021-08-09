// import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const usePersons = () => {

    const resultado = useStaticQuery(
        graphql `
        {
            allWpPerson {
              nodes {
                id: databaseId
                title
                date
                link
                uri
                slug
                featuredImage {
                  node {
                    ...ImageFragment
                  }
                }
                personData {
                  personJobTitle
                  personDegreeTitle
                }
              }
            }
          }
        `
    );

    return resultado.allWpPerson.nodes.map( person => ({
        id: person.id,
        title: person.title,
        date: person.date,
        slug: person.slug,
        uri: person.uri,
        link: person.link,
        featuredImage: person.featuredImage? person.featuredImage.node.localFile : null,
        jobTitle: person?.personData?.personJobTitle,
        degreeTitle: person?.personData?.personDegreeTitle,
    }));
}
 
export default usePersons;