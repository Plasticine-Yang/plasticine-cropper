import { CropperRendererImpl } from '@internal-dist/index'

describe('cropper renderer impl', () => {
  test('should get all cropper elements', () => {
    const containerElement = document.createElement('div')
    const imageElement = document.createElement('img')

    containerElement.appendChild(imageElement)

    const cropperRendererImpl = new CropperRendererImpl(imageElement)

    expect(cropperRendererImpl).toBeDefined()
  })
})
