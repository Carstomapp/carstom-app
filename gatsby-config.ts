import type { GatsbyConfig } from 'gatsby';
import { paths } from './src/constants';

const config: GatsbyConfig = {
  pathPrefix: paths.GATSBY_PATH_PREFIX,
  siteMetadata: {
    title: 'Carstom',
    siteUrl: 'https://Carstomapp.github.io/carstom-app/',
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data`,
      },
    },
  ],
};

export default config;
