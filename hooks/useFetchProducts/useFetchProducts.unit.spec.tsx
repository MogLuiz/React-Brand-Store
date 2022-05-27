import { screen, render } from "@testing-library/react";
import { renderHook, act } from '@testing-library/react-hooks'

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

  it("should return a list of 10 products", async () => {
    server.createList("product", 10);

    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts())

    await waitForNextUpdate()

    expect(result.current.products).toHaveLength(10);
    expect(result.current.error).toBe(false);
  });
});
