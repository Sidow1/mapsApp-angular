const { writeFileSync, mkdirSync } = require("fs");

require("dotenv").config();

const pathFile = "./src/environments";

const targetPath = `${pathFile}/environments.ts`;

const envFileContent = `
export const environments = {
  MAPBOX_KEY: "${process.env.MAPBOX_KEY}",
};`;

mkdirSync(pathFile, { recursive: true });

writeFileSync(targetPath, envFileContent);
