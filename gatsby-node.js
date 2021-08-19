const path = require(`path`)
const chunk = require(`lodash/chunk`)

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  // Query our posts from the GraphQL server
  const posts = await getNodes(gatsbyUtilities)

  const configs = await getNodesConfig(gatsbyUtilities);

  const categories = await getCategoriesNodes(gatsbyUtilities);

  // If there are no posts in WordPress, don't do anything
  if (!posts.length) {
    return
  }

  // If there are posts and pages, create Gatsby pages for them
  await createSinglePages({ posts, gatsbyUtilities })

  // And a paginated archive
  await createBlogPostArchive({ posts, configs, gatsbyUtilities })

  // Archivos para las categorías
  await createCategoriesArchives({ posts, categories, gatsbyUtilities });
}

/**
 * This function creates all the individual blog pages in this site
 */
const createSinglePages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info 
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: post.uri,

        // use the blog post template as the page component
        component: path.resolve(
          `./src/templates/${post.__typename.replace(`Wp`, ``)}.js`
        ),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )

/**
 * This function creates all the individual blog pages in this site
 */
async function createBlogPostArchive({ posts, configs, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  const includeTypes = ["post"];

  configs.filter( config => includeTypes.includes( config.name ) )
  .map( config => {

    const archivePath = config.archivePath || `/${config.name}/`;

    const _posts = posts.filter( ({ post }) => post.__typename.replace(`Wp`, ``).toLowerCase() === config.name );

    const postsChunkedIntoArchivePages = chunk(_posts, postsPerPage)
    const totalPages = postsChunkedIntoArchivePages.length
 
      postsChunkedIntoArchivePages.map(async (_posts, index) => {
        const pageNumber = index + 1
  
        const getPagePath = page => {
          if (page > 0 && page <= totalPages) {
            // Since our homepage is our blog page
            // we want the first page to be "/" and any additional pages
            // to be numbered.
            // "/blog/2" for example
            return page === 1 ? `${archivePath}` : `${archivePath}${page}`
          }
  
          return null
        }
  
        // createPage is an action passed to createPages
        // See https://www.gatsbyjs.com/docs/actions#createPage for more info
        await gatsbyUtilities.actions.createPage({
          path: getPagePath(pageNumber),
  
          // use the blog post archive template as the page component
          component: path.resolve(`./src/templates/${config.name}-archive.js`),
  
          // `context` is available in the template as a prop and
          // as a variable in GraphQL.
          context: {
            // the index of our loop is the offset of which posts we want to display
            // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
            // etc
            offset: index * postsPerPage,

            items: _posts.map( ({ post }) => post.id ),
  
            // We need to tell the template how many posts to display too
            postsPerPage,
  
            nextPagePath: getPagePath(pageNumber + 1),
            previousPagePath: getPagePath(pageNumber - 1),
          },
        })
      }
    )
  });

}

/**
 * This function creates all the individual taxonomies pages in this site
 */
 async function createCategoriesArchives({ posts, categories, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  categories.map( term => {

    const archivePath = term.uri;

    const _posts = posts.filter( ({ post }) => post.categories.nodes.map( item => item.id ).includes( term.id ) );

    const postsChunkedIntoArchivePages = chunk(_posts, postsPerPage)
    const totalPages = postsChunkedIntoArchivePages.length

    return Promise.all(
      postsChunkedIntoArchivePages.map(async (_posts, index) => {
        const pageNumber = index + 1
  
        const getPagePath = page => {
          if (page > 0 && page <= totalPages) {
            // Since our homepage is our blog page
            // we want the first page to be "/" and any additional pages
            // to be numbered.
            // "/blog/2" for example
            return page === 1 ? `${archivePath}` : `${archivePath}${page}`
          }
  
          return null
        }
  
        // createPage is an action passed to createPages
        // See https://www.gatsbyjs.com/docs/actions#createPage for more info
        await gatsbyUtilities.actions.createPage({
          path: getPagePath(pageNumber),
  
          // use the blog post archive template as the page component
          component: path.resolve(`./src/templates/${term.nodeType.toLowerCase()}-archive.js`),
  
          // `context` is available in the template as a prop and
          // as a variable in GraphQL.
          context: {
            // the index of our loop is the offset of which posts we want to display
            // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
            // etc
            offset: index * postsPerPage,

            items: _posts.map( ({ post }) => post.id ),
  
            // We need to tell the template how many posts to display too
            postsPerPage,
  
            nextPagePath: getPagePath(pageNumber + 1),
            previousPagePath: getPagePath(pageNumber - 1),
          },
        })
      })
    )

  });

}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getNodes({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query Query {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            __typename
            id
            uri
            categories {
              nodes {
                id
              }
            }
          }
          next {
            id
          }
        }
      }
      allWpPage(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            __typename
            id
            uri
          }
          next {
            id
          }
        }
      }
      allWpProject(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            __typename
            id
            uri
          }
          next {
            id
          }
        }
      }
      allWpCareer(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            __typename
            id
            uri
          }
          next {
            id
          }
        }
      }
      allWpFaculty(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            __typename
            id
            uri
          }
          next {
            id
          }
        }
      }
      allWpDepartament(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            __typename
            id
            uri
          }
          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return [
    ...graphqlResult.data.allWpPost.edges,
    // ...graphqlResult.data.allWpPage.edges,
    // ...graphqlResult.data.allWpProject.edges,
    // ...graphqlResult.data.allWpCareer.edges,
    // ...graphqlResult.data.allWpFaculty.edges,
    // ...graphqlResult.data.allWpDepartament.edges,
  ]
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
 async function getCategoriesNodes({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query Query {
      # Query all WordPress blog posts sorted by date
      allWpCategory {
        edges {
          node {
            id
            uri
            nodeType
            posts {
              nodes {
                id
                uri
                __typename
              }
            }
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return [
    ...graphqlResult.data.allWpCategory.edges,
  ]
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress content types. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 */
 async function getNodesConfig({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query Query {

      # Query all Wordpress content type configurations
      allWpContentType {
        nodes {
          id
          name
          hasArchive
          archivePath
        }
      }
      
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your content types`,
      graphqlResult.errors
    )
    return
  }

  return [
    ...graphqlResult.data.allWpContentType.nodes,
  ]
}