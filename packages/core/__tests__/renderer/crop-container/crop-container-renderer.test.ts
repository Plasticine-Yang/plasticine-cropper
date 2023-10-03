import {
  CROPPER_LINE_NOT_RESIZABLE,
  CROPPER_POINT_NOT_RESIZABLE,
  CROP_CONTAINER_MOVEABLE,
  Coordinate,
  CropperRenderer,
  CropperRendererImpl,
  Rect,
} from '@internal-dist/index'

describe('crop container renderer', () => {
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

  test('should get crop container renderer', () => {
    const { cropperRenderer } = setup()

    cropperRenderer.mount()
    expect(cropperRenderer.getCropContainerRenderer()).not.toBeNull()

    cropperRenderer.unmount()
    expect(cropperRenderer.getCropContainerRenderer()).toBeNull()
  })

  test('should render crop container', () => {
    const { cropperRenderer } = setup()

    cropperRenderer.mount()

    const cropContainerRenderer = cropperRenderer.getCropContainerRenderer()!

    const coordinate: Coordinate = {
      x: 100,
      y: 50,
    }

    const rect: Rect = {
      width: 400,
      height: 300,
    }

    cropContainerRenderer.renderCropContainer({ coordinate, rect })

    const { cropContainer } = cropperRenderer.getCropperElements()!

    expect(cropContainer.style.width).toBe('400px')
    expect(cropContainer.style.height).toBe('300px')
    expect(cropContainer.style.left).toBe('100px')
    expect(cropContainer.style.top).toBe('50px')
  })

  test('should control moveable', () => {
    const { cropperRenderer } = setup()

    cropperRenderer.mount()

    const { cropContainerMovePlaceholder } = cropperRenderer.getCropperElements()!
    const cropContainerRenderer = cropperRenderer.getCropContainerRenderer()!

    cropContainerRenderer.makeItMoveable()
    expect(cropContainerMovePlaceholder.classList.contains(CROP_CONTAINER_MOVEABLE)).toBe(true)

    cropContainerRenderer.makeItNotMoveable()
    expect(cropContainerMovePlaceholder.classList.contains(CROP_CONTAINER_MOVEABLE)).toBe(false)
  })

  test('should control resizable', () => {
    const { cropperRenderer } = setup()

    cropperRenderer.mount()

    const { cropContainerLines, cropContainerPoints } = cropperRenderer.getCropperElements()!
    const cropContainerRenderer = cropperRenderer.getCropContainerRenderer()!

    cropContainerRenderer.makeItResizable()
    expect(Object.values(cropContainerLines).some((el) => el.classList.contains(CROPPER_LINE_NOT_RESIZABLE))).toBe(
      false,
    )
    expect(Object.values(cropContainerPoints).some((el) => el.classList.contains(CROPPER_POINT_NOT_RESIZABLE))).toBe(
      false,
    )

    cropContainerRenderer.makeItNotResizable()
    expect(Object.values(cropContainerLines).some((el) => el.classList.contains(CROPPER_LINE_NOT_RESIZABLE))).toBe(true)
    expect(Object.values(cropContainerPoints).some((el) => el.classList.contains(CROPPER_POINT_NOT_RESIZABLE))).toBe(
      true,
    )
  })
})
