import { EHttpCode } from "../enums/HttpCode";
import { BaseError } from "./BaseError";

export class ListEmptyResponseError extends BaseError {
  constructor(context?: Record<string, unknown>) {
    super(
      'List empty',
      EHttpCode.NO_CONTENT,
      'ListEmptyResponseError',
      context,
    );
  }
}
