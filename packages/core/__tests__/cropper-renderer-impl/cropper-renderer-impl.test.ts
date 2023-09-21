import { CropperRendererImpl } from '@internal-dist/index'

describe('cropper renderer impl', () => {
  const setup = () => {
    const containerElement = document.createElement('div')
    const imageElement = document.createElement('img')

    containerElement.appendChild(imageElement)

    const cropperRendererImpl = new CropperRendererImpl(imageElement)

    return {
      cropperRendererImpl,
      imageElement,
    }
  }

  test('should throw error without container', () => {
    const imageElement = document.createElement('img')

    const internalTest = () => {
      new CropperRendererImpl(imageElement)
    }
    expect(internalTest).toThrowErrorMatchingInlineSnapshot('"未发现图片的容器元素，无法渲染 plasticine cropper"')
  })

  test('should get all cropper elements', () => {
    const { cropperRendererImpl } = setup()

    expect(cropperRendererImpl.getCropperElements()).toMatchSnapshot()
  })

  test('should toggle visibility of raw image element', () => {
    const { cropperRendererImpl, imageElement } = setup()

    // hide
    cropperRendererImpl.hideRawImageElement()
    expect(Array.from(imageElement.classList)).toMatchInlineSnapshot(`
      [
        "plasticine-cropper-common-hidden",
      ]
    `)

    // show
    cropperRendererImpl.showRawImageElement()
    expect(Array.from(imageElement.classList)).toMatchInlineSnapshot('[]')
  })

  test('should move crop container', () => {
    const { cropperRendererImpl } = setup()
    const { cropContainer } = cropperRendererImpl.getCropperElements()

    cropperRendererImpl.moveCropContainer(400, 300)

    expect({ top: cropContainer.style.top, left: cropContainer.style.left }).toMatchInlineSnapshot(`
      {
        "left": "400px",
        "top": "300px",
      }
    `)
  })
})
