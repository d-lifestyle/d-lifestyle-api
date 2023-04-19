module.exports = {
     apps: [
          {
               name: "d-lifestyle-api",
               cwd: "src/server.ts",
               script: "npm",
               args: "start",
               env: {
                    NODE_ENV: "production",
               },
          },
     ],
};
