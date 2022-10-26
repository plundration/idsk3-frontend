const { getDirectories } = require('../../../lib/file-helper')
const { renderSass } = require('../../../lib/jest-helpers')
const configPaths = require('../../../config/paths.js')

describe('Components', () => {
  let componentsFiles

  beforeAll(async () => {
    // Component directory listing (with contents)
    componentsFiles = await getDirectories(configPaths.components)
  })

  describe('Sass render', () => {
    it('renders CSS for all components', () => {
      const file = `${configPaths.src}/components/_all.scss`

      return expect(renderSass({ file })).resolves.toEqual(
        expect.objectContaining({
          css: expect.any(Object),
          stats: expect.any(Object)
        })
      )
    })

    it('renders CSS for each component', () => {
      const sassTasks = [...componentsFiles].map(([componentName, { entries }]) => {
        const file = entries?.get(`_${componentName}.scss`)?.path

        return expect(renderSass({ file })).resolves.toEqual(
          expect.objectContaining({
            css: expect.any(Object),
            stats: expect.any(Object)
          })
        )
      })

      return Promise.all(sassTasks)
    })
  })
})
