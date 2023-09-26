import { Coordinate, MoveCropContainerLogic, Rect } from '@internal-dist/index'

describe('move crop container', () => {
  const setup = () => {
    const rootCoordinate: Coordinate = {
      x: 100,
      y: 100,
    }

    const cropContainerRect: Rect = {
      width: 400,
      height: 300,
    }

    const initialMouseCoordinate: Coordinate = {
      x: 100,
      y: 50,
    }

    const initialCropContainerCoordinate: Coordinate = {
      x: 200,
      y: 200,
    }

    return {
      rootCoordinate,
      cropContainerRect,
      initialMouseCoordinate,
      initialCropContainerCoordinate,
    }
  }

  test('happy path', () => {
    const { rootCoordinate, cropContainerRect, initialMouseCoordinate, initialCropContainerCoordinate } = setup()
    const moveCropContainerLogic = new MoveCropContainerLogic()

    moveCropContainerLogic.handleCropContainerActive(initialMouseCoordinate, initialCropContainerCoordinate)

    const mouseCoordinate: Coordinate = {
      x: 200,
      y: 100,
    }

    const result = moveCropContainerLogic.handleCropContainerMove(mouseCoordinate, rootCoordinate, cropContainerRect)

    expect(result).not.toBeNull()
    expect(result!.x).toMatchInlineSnapshot('200')
    expect(result!.y).toMatchInlineSnapshot('150')
  })
})
