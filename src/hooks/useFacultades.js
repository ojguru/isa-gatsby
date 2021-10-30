import { graphql, useStaticQuery } from 'gatsby';

const useFacultades = () => {

    const resultado = useStaticQuery(
        graphql `
        {
            allWpFacultad {
              nodes {
                id
                __typename
                nombre
                copy
                color
                mision
                departamentos {
                  nodes {
                    id
                  }
                }
                carreras {
                  nodes {
                    id
                  }
                }
                date
                link
                uri
                slug
                imagenPortada {
                  ...ImageFragment
                }
        
                #facultyInfo {
        #
                #  perfil {
                #    name
                #    jobtitle
                #    copy
                #    photo {
                #      ...ImageFragment
                #    }
                #  }
        #
                #}

                #contact {
                #  phones {
                #    phone
                #    exts {
                #      ext
                #    }
                #  }
                #  emails {
                #    email
                #  }
                #}
        
                #resources {
                #  resourceRelationship {
                #    ... on WpResource {
                #      id
                #      nombre
                #      imagenPortada {
                #        node {
                #          ...ImageFragment
                #        }
                #      }
                #      resource {
                #        type
                #        file {
                #          id
                #          localFile {
                #            id
                #            publicURL
                #          }
                #        }
                #      }
                #    }
                #  }
                #}
              }
            }
          }
        `
    );

    return resultado.allWpFacultad.nodes.map( facultad => ({
      id: facultad.id,
      nombre: facultad.nombre,
      copy: facultad.copy,
      date: facultad.date,
      slug: facultad.slug,
      uri: facultad.uri,
      link: facultad.link,
      imagenPortada: facultad?.imagenPortada,
      color: facultad.color,
      mision: facultad.mision,
      careers: facultad.carreras.nodes || [],
      departaments: facultad.departamentos.nodes || [],
      type: facultad.__typename,
      resources: facultad.resources.resourceRelationship || [],
      contact: facultad.contact,
    }));
}
 
export default useFacultades;