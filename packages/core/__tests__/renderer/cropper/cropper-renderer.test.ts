import { CropperRenderer, CropperRendererImpl } from '@internal-dist/index'

describe('cropper renderer', () => {
  const setup = () => {
    const parentNodeOfImageElement = document.createElement('div')
    const imageElement = document.createElement('img')

    parentNodeOfImageElement.appendChild(imageElement)

    const cropperRenderer: CropperRenderer = new CropperRendererImpl(imageElement)

    return {
      parentNodeOfImageElement,
      cropperRenderer,
      imageElement,
    }
  }

  test('should throw error when no container of image', () => {
    const imageElement = document.createElement('img')

    expect(() => {
      new CropperRendererImpl(imageElement)
    }).toThrowError('图片缺少容器元素')
  })

  test('should mount', () => {
    const { parentNodeOfImageElement, cropperRenderer } = setup()

    cropperRenderer.mount()

    expect(parentNodeOfImageElement).toMatchSnapshot()
  })

  test('should unmount', () => {
    const { parentNodeOfImageElement, cropperRenderer } = setup()

    cropperRenderer.mount()

    expect(parentNodeOfImageElement).toMatchSnapshot()

    cropperRenderer.unmount()

    expect(parentNodeOfImageElement).toMatchSnapshot()
  })

  test('should get all cropper elements', () => {
    const { cropperRenderer } = setup()

    cropperRenderer.mount()

    expect(cropperRenderer.getCropperElements()).toMatchSnapshot()

    cropperRenderer.unmount()

    expect(cropperRenderer.getCropperElements()).toBeNull()
  })

  test('should toggle visibility of raw image element', () => {
    const { cropperRenderer, imageElement } = setup()

    cropperRenderer.mount()

    // hide
    cropperRenderer.hideRawImageElement()
    expect(Array.from(imageElement.classList)).toMatchInlineSnapshot(`
      [
        "plasticine-cropper-common-hidden",
      ]
    `)

    // show
    cropperRenderer.showRawImageElement()
    expect(Array.from(imageElement.classList)).toMatchInlineSnapshot('[]')
  })
})
