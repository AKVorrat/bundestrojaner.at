// PKGS
const _ = require('lodash')
const dnt = require('date-and-time')
const htmlmin = require('html-minifier')
const markdownIt = require('markdown-it')

const isProdDeployment = Boolean(
  process.env.ELEVENTY_RUN_MODE
  && process.env.ELEVENTY_RUN_MODE === 'build'
)

module.exports = (config) => {
  config.addFilter('formatDate', (date) => {
    const d = date
      ? new Date(date)
      : new Date()
    return dnt.format(d, 'MMM DD YYYY, HH:mm')
  })

  // rebuild on CSS changes
  config.addWatchTarget('./src/_includes/css/')

  // Markdown
  config.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true
    })
  )

  // COLLECTIONS
  config.addCollection('arguments', async(collection) => {
    return collection.getFilteredByGlob('./src/arguments/**/*.md')
  })

  config.addCollection('quotes', async(collection) => {
    return collection.getFilteredByGlob('./src/quotes/**/*.md')
  })

  // STATIC FILES
  config.addPassthroughCopy({ './src/static/': '/' })

  // TRANSFORM -- Minify HTML Output
  if (isProdDeployment) {
    config.addTransform('htmlmin', (content, outputPath) => {
      if (outputPath && outputPath.endsWith('.html')) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        })
        return minified
      }
      return content
    })
  }

  return {
    dir: {
      input: 'src',
      output: 'public',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts'
    },
    templateFormats: [
      'md',
      'njk',
      '11ty.js'
    ],
    htmlTemplateEngine: 'njk'
  }
}
