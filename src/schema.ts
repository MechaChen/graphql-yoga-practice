import { createSchema } from "graphql-yoga";

type Link = {
  id: string;
  url: string;
  description: string;
};

const typeDefinitions = `
  type Query {
    info: String!
    feed: [Link!]!
  }
  
  type Mutation {
    postLink(url: String!, description: String!): Link!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

const links: Link[] = [
  {
    id: "link-0",
    url: "https://graphql-yoga.com",
    description: "The easiest way of setting up a GraphQL server",
  },
];

const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: () => links,
  },
  Mutation: {
    postLink: (parent: unknown, args: { url: string; description: string }) => {
      const idCount = links.length;

      const link = {
        id: `link-${idCount}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);

      return link;
    },
  },
  Link: {
    id: (parent: Link) => parent.id,
    description: (parent: Link) => parent.description,
    url: (parent: Link) => parent.url,
  },
};

export const schema = createSchema({
  typeDefs: [typeDefinitions],
  resolvers: [resolvers],
});
