export default {
  alias: {
    $components: './src/components',
    $pages: './src/pages',
    $layouts: './src/layouts',
    $: './src',
  },
  packageOptions: {
    external: [
      '@prismicio/client'
    ]
  }
};