import { UnprocessableEntityException } from '@nestjs/common'
import { ValidationError } from 'class-validator'

export function ExceptionFactory(errors: ValidationError[]) {
  return new UnprocessableEntityException({
    message: 'Invalid parameters',
    error: formatErrors(errors),
  })
}

function formatErrors(
  errors: ValidationError[],
  props: { [key: string]: string[] } = {},
  data: { property: string; path: string } = { property: null, path: null },
) {
  for (const error of errors) {
    const property = data.property ?? error.property
    props[property] ??= []

    if (error.children?.length > 0) {
      const path = data.path ? `${data.path}.${error.property}` : error.property
      formatErrors(error.children, props, { property, path })
    }

    for (const key in error.constraints) {
      const message = data.path
        ? `${data.path}.${error.constraints[key]}`
        : error.constraints[key]
      props[property].push(message)
    }
  }

  return props
}
