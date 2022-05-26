import { screen, render } from "@testing-library/react";

import useFetchProducts from ".";

import { makeServer, TServer } from "../../services/mirage/server";

describe("useFetchProducts", () => {
  let server: TServer;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });
});
