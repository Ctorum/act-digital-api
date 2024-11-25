import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./tests"],
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/$1",
  },
};

export default config;
