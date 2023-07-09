/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: <https://www.gatsbyjs.com/docs/node-apis/>
 */

// You can delete this file if you're not using it

const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

// Setup Import Alias
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {};

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
        hooks: path.resolve(__dirname, 'src/hooks'),
      },
    },
  });
};

// Generate a Slug Each Post Data
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });

    createNodeField({ node, name: 'slug', value: slug });
  }
};

// Generate Post Page Through Markdown Data
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // Get All Markdown File For Paging
  const queryAllMarkdownData = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { categories: { ne: null } } }
          sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: ASC } }]
        ) {
          edges {
            node {
              fields {
                slug
              }
              headings {
                depth
                value
              }
            }
          }
        }
      }
    `,
  );

  // Handling GraphQL Query Error
  if (queryAllMarkdownData.errors) {
    reporter.panicOnBuild(`Error while running query`);
    return;
  }

  // Import Post Template Component
  const PostTemplateComponent = path.resolve(
    __dirname,
    'src/templates/post_template.tsx',
  );

  const posts = queryAllMarkdownData.data.allMarkdownRemark.edges
  posts.forEach((
    {
      node: {
        fields: { slug },
      }
    },
    index
  ) => {
    const prev = index === 0 ? null : posts[index-1]
    const next = index === posts.length -1 ? null: posts[index+1]
    createPage({
      path: slug,
      component: PostTemplateComponent,
      context: {
        slug,
        prev,
        next,
      }
    })
  })
};