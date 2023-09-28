import {
  type CropperRenderer,
  CropperRendererImpl,
  CROPPER_LINE_NOT_RESIZABLE,
  CROPPER_POINT_NOT_RESIZABLE,
} from '@internal-dist/index'

describe('cropper renderer impl', () => {
  const setup = () => {
    const containerElement = document.createElement('div')
    const imageElement = document.createElement('img')

    containerElement.appendChild(imageElement)

    const cropperRenderer: CropperRenderer = new CropperRendererImpl(imageElement)

    return {
      cropperRenderer,
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
    const { cropperRenderer } = setup()

    expect(cropperRenderer.getCropperElements()).toMatchSnapshot()
  })

  test('should toggle visibility of raw image element', () => {
    const { cropperRenderer, imageElement } = setup()

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

  test('should move crop container', () => {
    const { cropperRenderer } = setup()
    const { cropContainer } = cropperRenderer.getCropperElements()

    cropperRenderer.moveCropContainer(400, 300)

    expect({ top: cropContainer.style.top, left: cropContainer.style.left }).toMatchInlineSnapshot(`
      {
        "left": "400px",
        "top": "300px",
      }
    `)
  })

  test('should control resizable of crop container', () => {
    const { cropperRenderer } = setup()
    const { cropContainerLines, cropContainerPoints } = cropperRenderer.getCropperElements()

    cropperRenderer.makeCropContainerResizable()

    for (const lineElement of Object.values(cropContainerLines)) {
      expect(lineElement.classList.contains(CROPPER_LINE_NOT_RESIZABLE)).toBe(false)
    }

    for (const pointElement of Object.values(cropContainerPoints)) {
      expect(pointElement.classList.contains(CROPPER_POINT_NOT_RESIZABLE)).toBe(false)
    }

    cropperRenderer.makeCropContainerNotResizable()

    for (const lineElement of Object.values(cropContainerLines)) {
      expect(lineElement.classList.contains(CROPPER_LINE_NOT_RESIZABLE)).toBe(true)
    }

    for (const pointElement of Object.values(cropContainerPoints)) {
      expect(pointElement.classList.contains(CROPPER_POINT_NOT_RESIZABLE)).toBe(true)
    }
  })
})
