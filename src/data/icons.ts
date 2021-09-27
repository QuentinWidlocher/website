import fs from 'node:fs'

export const getIcon = (name: string) =>
  fs.readFileSync(`node_modules/iconoir/icons/${name}.svg`).toString()
