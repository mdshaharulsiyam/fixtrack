import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { can_move_status, get_next_status } from "../src/apis/Job/job_status";

describe("job status transitions", () => {
  it("allows every move to the next status", () => {
    assert.equal(can_move_status("Received", "Diagnosing"), true);
    assert.equal(can_move_status("Diagnosing", "Repairing"), true);
    assert.equal(can_move_status("Repairing", "Ready"), true);
    assert.equal(can_move_status("Ready", "Delivered"), true);
  });

  it("rejects skipping a step", () => {
    assert.equal(can_move_status("Received", "Repairing"), false);
    assert.equal(can_move_status("Diagnosing", "Delivered"), false);
  });

  it("rejects going backwards or staying the same", () => {
    assert.equal(can_move_status("Ready", "Repairing"), false);
    assert.equal(can_move_status("Delivered", "Received"), false);
    assert.equal(can_move_status("Repairing", "Repairing"), false);
  });

  it("has no next status after Delivered", () => {
    assert.equal(get_next_status("Delivered"), null);
  });
});
