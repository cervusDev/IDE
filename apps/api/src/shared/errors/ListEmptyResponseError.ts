import { EHttpCode } from '@infra/http/enums/HttpCode.js';
import { BaseError } from '@infra/http/errors/BaseError';

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
