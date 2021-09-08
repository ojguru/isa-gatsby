import { graphql, useStaticQuery } from 'gatsby';

const useFaculties = () => {

    const resultado = useStaticQuery(
        graphql `
        {
            allWpFaculty {
              nodes {
                id
                __typename
                title
                content
                date
                link
                uri
                slug
                featuredImage {
                  node {
                    ...ImageFragment
                  }
                }
        
                facultyInfo {
        
                  color
                  mision
                  cover {
                    copy
                  }
                  
                  perfil {
                    name
                    jobtitle
                    content
                    photo {
                      ...ImageFragment
                    }
                  }
        
                  facultyRelationship {
                    ... on WpCareer {
                      id
                      title
                      link
                      uri
                    }
                  }

                  facultyDepartamentRel {
                    ... on WpDepartament {
                      id
                    }
                  }
        
                }

                contact {
                  phones {
                    phone
                    exts {
                      ext
                    }
                  }
                  emails {
                    email
                  }
                }
        
                resources {
                  resourceRelationship {
                    ... on WpResource {
                      id
                      title
                      featuredImage {
                        node {
                          ...ImageFragment
                        }
                      }
                      resource {
                        type
                        file {
                          id
                          localFile {
                            id
                            publicURL
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `
    );

    return resultado.allWpFaculty.nodes.map( faculty => ({
      id: faculty.id,
      title: faculty.title,
      content: faculty.content,
      date: faculty.date,
      slug: faculty.slug,
      uri: faculty.uri,
      link: faculty.link,
      featuredImage: faculty?.featuredImage?.node?.localFile,
      color: faculty.facultyInfo.color,
      mision: faculty.facultyInfo.mision,
      cover: faculty.facultyInfo.cover,
      perfil: faculty.facultyInfo.perfil,
      resources: faculty.resources.resourceRelationship,
      careers: faculty.facultyInfo.facultyRelationship || [],
      departaments: faculty.facultyInfo.facultyDepartamentRel || [],
      type: faculty.__typename,
      contact: faculty.contact,
    }));
}
 
export default useFaculties;