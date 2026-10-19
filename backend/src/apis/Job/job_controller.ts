import { Request, Response } from "express";
import { HttpStatus } from "../../DefaultConfig/config";
import { sendResponse } from "../../utils/sendResponse";
import { IAuth } from "../Auth/auth_types";
import { job_service } from "./job_service";
import { IJobListQuery } from "./job_types";

const asText = (value: unknown) =>
  typeof value === "string" ? value : undefined;

async function create(req: Request, res: Response) {
  const result = await job_service.create(req.body, req.user as IAuth);

  sendResponse(res, HttpStatus.CREATED, result);
}

async function get_all(req: Request, res: Response) {
  const query: IJobListQuery = {
    search: asText(req.query.search),
    status: asText(req.query.status),
    page: asText(req.query.page),
    limit: asText(req.query.limit),
  };
  const result = await job_service.get_all(query, req.user as IAuth);

  sendResponse(res, HttpStatus.SUCCESS, result);
}

async function update(req: Request, res: Response) {
  const result = await job_service.update(
    req.params.id,
    req.body,
    req.user as IAuth,
  );

  sendResponse(res, HttpStatus.SUCCESS, result);
}

async function update_status(req: Request, res: Response) {
  const result = await job_service.update_status(
    req.params.id,
    req.body.status,
    req.user as IAuth,
  );

  sendResponse(res, HttpStatus.SUCCESS, result);
}

async function track(req: Request, res: Response) {
  const result = await job_service.track(req.params.code);

  sendResponse(res, HttpStatus.SUCCESS, result);
}

export const job_controller = Object.freeze({
  create,
  get_all,
  update,
  update_status,
  track,
});
