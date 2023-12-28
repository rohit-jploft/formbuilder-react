module.exports = {
    apps: [
      {
        name: `formbuilder3040`,
        script: "serve",
        env: {
          PM2_SERVE_PATH: "./dist",
          PM2_SERVE_PORT: 3040,
          PM2_SERVE_SPA: "true",
          NODE_ENV: 'production',
        },
      },
    ],
  };