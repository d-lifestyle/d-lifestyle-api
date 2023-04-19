module.exports = {
     apps: [
          {
               name: "d-lifestyle-api",
               cwd: "cross-env DEBUG=app:* nodemon --watch 'src/**/*' -e ts --exec ./node_modules/.bin/ts-node -r tsconfig-paths/register ./src/bin/www.ts",
               script: "npm",
               args: "start",
               env: {
                    NODE_ENV: "production",
               },
          },
     ],
};
