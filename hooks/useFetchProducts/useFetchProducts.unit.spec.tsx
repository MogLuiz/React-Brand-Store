// Packages
import { screen, render } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

// Components
import useFetchProducts from ".";

// Services
import { makeServer, TServer } from "../../services/mirage/server";
import { Response } from "miragejs";

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

    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());

    await waitForNextUpdate();

    expect(result.current.products).toHaveLength(10);
    expect(result.current.error).toBe(false);
  });

  it("should set error to true when catch() block is executed", async () => {
    server.get("products", () => new Response(500, {}, ""));

    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());

    await waitForNextUpdate();

    expect(result.current.error).toBe(true);
    expect(result.current.products).toHaveLength(0);
  });
});
