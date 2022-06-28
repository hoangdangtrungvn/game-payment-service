import { SetMetadata, ValidationPipeOptions } from '@nestjs/common'
import { OVERRIDE_VALIDATION_PIPE } from './constants'

export const OverrideValidationPipe = (options: ValidationPipeOptions) =>
  SetMetadata(OVERRIDE_VALIDATION_PIPE, options)
