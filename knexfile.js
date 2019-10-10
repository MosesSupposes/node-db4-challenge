// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: "postgres://localhost/nodedb4",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },

    seeds: {
      directory: './data/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: "postgres://localhost/nodedb4",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },

    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: "postgres://localhost/nodedb4",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },

    seeds: {
      directory: './data/seeds'
    }
  }

};
