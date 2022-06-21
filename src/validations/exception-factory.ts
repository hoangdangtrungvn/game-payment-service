import { UnprocessableEntityException } from '@nestjs/common'

export function ExceptionFactory(errors: any) {
  const props = {}

  for (const error of errors) {
    const messages = []

    for (const key in error.constraints) {
      messages.push(error.constraints[key])
    }

    props[error.property] = messages
  }

  return new UnprocessableEntityException({
    message: 'Invalid parameters',
    error: props,
  })
}
