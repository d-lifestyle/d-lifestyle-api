module.exports = {
     apps: [
          {
               name: "d-lifestyle-api",
               script: "npm run start", // path needs to be relative from ecosystem.config.js
               watch: true, // any changes to app folder will get pm2 to restart app
               env: {
                    DB_PATH: "mongodb+srv://dinesh:hgfUYWbjVCheedBd@cluster0.hoqxjop.mongodb.net/?retryWrites=true&w=majority",
               },
          },
     ],
};