import { ValidationPipe, ArgumentMetadata, Injectable } from '@nestjs/common'
import { OVERRIDE_VALIDATION_PIPE } from '../decorators/constants'

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    const options = Reflect.getMetadata(
      OVERRIDE_VALIDATION_PIPE,
      metadata.metatype,
    )

    if (options) {
      this.validatorOptions = Object.assign(this.validatorOptions, options)
    }

    return super.transform(value, metadata)
  }
}
