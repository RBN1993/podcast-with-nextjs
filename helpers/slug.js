import slugify from 'slugify'

export const slug = name =>
  slugify(name, { lower: true }).replace(/[^\w\-]+/g, '')
