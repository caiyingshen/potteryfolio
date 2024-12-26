import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "96vu6mex",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});