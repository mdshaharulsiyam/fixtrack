import "./setup_env";

import assert from "node:assert/strict";
import { AddressInfo } from "node:net";
import { Server } from "node:http";
import { after, before, describe, it } from "node:test";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../src/app";

let mongo: MongoMemoryServer;
let server: Server;
let baseUrl: string;

const request = async (path: string, method = "GET", body?: unknown, token?: string) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: response.status, body: await response.json() };
};

const signUp = async (email: string) => {
  const { body } = await request("/auth/sign-up", "POST", {
    name: "Shop Owner",
    email,
    password: "password123",
    confirm_password: "password123",
  });
  return body.token as string;
};

const validJob = {
  customer_name: "Rahim",
  customer_phone: "+880 1712-345678",
  device: "Samsung A52",
  problem: "phone fell in water, screen flickers",
  category: "water damage",
  likely_fault: "Liquid damage on the display connector",
  estimated_cost: 2500,
};

describe("job api", () => {
  let ownerToken: string;
  let otherToken: string;
  let jobId: string;
  let jobCode: string;

  before(async () => {
    mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
    server = app.listen(0);
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    ownerToken = await signUp("owner@shop.com");
    otherToken = await signUp("other@shop.com");
  });

  after(async () => {
    server?.close();
    await mongoose.disconnect();
    await mongo?.stop();
  });

  it("requires login to create a job", async () => {
    const { status } = await request("/job/create", "POST", validJob);
    assert.equal(status, 401);
  });

  it("rejects an invalid phone and a cost of zero", async () => {
    const phone = await request("/job/create", "POST", { ...validJob, customer_phone: "abc" }, ownerToken);
    assert.equal(phone.status, 400);
    const cost = await request("/job/create", "POST", { ...validJob, estimated_cost: 0 }, ownerToken);
    assert.equal(cost.status, 400);
    assert.match(cost.body.message, /greater than 0/);
  });

  it("creates a job with a code and the Received status", async () => {
    const { status, body } = await request("/job/create", "POST", validJob, ownerToken);
    assert.equal(status, 201);
    assert.match(body.data.job_code, /^FX-\d{4}$/);
    assert.equal(body.data.status, "Received");
    assert.equal(body.data.customer_phone, "+8801712345678");
    jobId = body.data._id;
    jobCode = body.data.job_code;
  });

  it("only lists the owner's own jobs", async () => {
    const own = await request("/job/get-all", "GET", undefined, ownerToken);
    assert.equal(own.body.data.length, 1);
    const other = await request("/job/get-all", "GET", undefined, otherToken);
    assert.equal(other.body.data.length, 0);
  });

  it("does not let another owner edit the job", async () => {
    const { status } = await request(`/job/update-status/${jobId}`, "PATCH", { status: "Diagnosing" }, otherToken);
    assert.equal(status, 404);
    const edit = await request(`/job/update/${jobId}`, "PATCH", { device: "Hacked" }, otherToken);
    assert.equal(edit.status, 404);
  });

  it("moves status one step at a time", async () => {
    const skip = await request(`/job/update-status/${jobId}`, "PATCH", { status: "Repairing" }, ownerToken);
    assert.equal(skip.status, 409);
    const next = await request(`/job/update-status/${jobId}`, "PATCH", { status: "Diagnosing" }, ownerToken);
    assert.equal(next.status, 200);
    assert.equal(next.body.data.status, "Diagnosing");
    const back = await request(`/job/update-status/${jobId}`, "PATCH", { status: "Received" }, ownerToken);
    assert.equal(back.status, 409);
  });

  it("does not let an edit change the status or code", async () => {
    const { status } = await request(`/job/update/${jobId}`, "PATCH", { status: "Delivered" }, ownerToken);
    assert.equal(status, 400);
  });

  it("shows only the status on the public page", async () => {
    const { status, body } = await request(`/job/track/${jobCode.toLowerCase()}`);
    assert.equal(status, 200);
    assert.deepEqual(Object.keys(body.data).sort(), ["job_code", "status", "updatedAt"]);
    assert.equal(body.data.status, "Diagnosing");
    assert.equal(JSON.stringify(body).includes("1712345678"), false);
  });

  it("rejects a malformed code and returns 404 for an unknown one", async () => {
    const { status } = await request("/job/track/not-a-code");
    assert.equal(status, 400);
    const missing = await request(`/job/track/${jobCode === "FX-9999" ? "FX-9998" : "FX-9999"}`);
    assert.equal(missing.status, 404);
  });
});
