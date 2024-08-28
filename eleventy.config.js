import dotenv from 'dotenv'
import { EleventyHtmlBasePlugin } from '@11ty/eleventy'
import htmlmin from 'html-minifier'
import markdownIt from 'markdown-it'
import { minify } from 'terser'
import filters from './src/utils/filters.js'

dotenv.config()

const isProdDeployment = Boolean(
  process.env.ELEVENTY_RUN_MODE
  && process.env.ELEVENTY_RUN_MODE === 'build'
)

function sortByOrder(a, b) {
  return a.data.order - b.data.order
}

export default async function(config) {
  // PLUGINS
  config.addPlugin(EleventyHtmlBasePlugin)

  config.addNunjucksAsyncFilter('jsmin', async function(code, callback) {
    if (isProdDeployment) {
      try {
        const minified = await minify(code)
        callback(null, minified.code)
      } catch (ex) {
        console.error('Terser error: ', ex)
        // Fail gracefully.
        callback(null, code)
      }
    } else {
      // localhost: output unminified JS
      callback(null, code)
    }
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

  // FILTERS
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName])
  })

  // COLLECTIONS
  config.addCollection('arguments', async(collection) => {
    return collection.getFilteredByGlob('./src/arguments/**/*.md')
      .sort(sortByOrder)
  })

  config.addCollection('feedback', async(collection) => {
    return collection.getFilteredByGlob('./src/feedback/**/*.md')
      .sort(sortByOrder)
  })

  config.addCollection('quotes', async(collection) => {
    return collection.getFilteredByGlob('./src/quotes/**/*.md')
      .sort(sortByOrder)
  })

  // STATIC FILES
  config.addPassthroughCopy({ './src/static/': '/' })

  // TRANSFORM -- Minify HTML Output
  // Unless we're running `serve` mode for local development
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
