import { Request } from "express";

export interface RequestWithPayload extends Request {
    user: {
      id: string  
      payload: {
        [k: string]: string;
      };
    };
  }