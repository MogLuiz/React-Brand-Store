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

  it("should return a list of 10 products", () => {
    server.createList("product", 10);

    const { products } = useFetchProducts();

    expect(products).toHaveLength(10);
  });
});
