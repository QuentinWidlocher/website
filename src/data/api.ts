import Prismic from '@prismicio/client'

export const getApi = (
  req = '',
  url = 'https://quentinwidlocher.prismic.io/api',
) =>
  Prismic.getApi(url, {
    accessToken: import.meta.env.accessToken,
    req,
  })

export type Response =
  | {
      [k: string]: {
        type: 'StructuredText'
        value: { text: string }[]
      }
    }
  | {
      [k: string]: {
        type: 'Image'
        value: { main: { url: string } }
      }
    }
  | {
      [k: string]: {
        type: 'Link.web'
        value: { url: string }
      }
    }
  | {
      [k: string]: {
        type: 'Group'
        value: Response[]
      }
    }
  | {
      [k: string]: {
        type: 'Select'
        value: string
      }
    }
  | {
      [k: string]: {
        type: 'Date'
        value: string
      }
    }

export type Model =
  | {
      [k: string]: string | Model[]
    }
  | { tags: string[] }

export function mapResponseToObj(res: Response, tags: string[] = []): Model {
  return Object.keys(res).reduce(
    (obj, key) => {
      const prop = res[key]

      switch (prop.type) {
        case 'StructuredText':
          return { ...obj, [key]: prop.value[0].text }
        case 'Select':
          return { ...obj, [key]: prop.value }
        case 'Date':
          return { ...obj, [key]: new Date(prop.value) }
        case 'Image':
          return { ...obj, [key]: prop.value.main.url }
        case 'Link.web':
          return { ...obj, [key]: prop.value.url }
        case 'Group':
          return {
            ...obj,
            [key]: prop.value.map((item) => mapResponseToObj(item)),
          }
        default:
          return obj
      }
    },
    { tags },
  )
}
