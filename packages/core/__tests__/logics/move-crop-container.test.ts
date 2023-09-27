import { Coordinate, MoveCropContainerLogic, Rect } from '@internal-dist/index'

describe('move crop container', () => {
  test('should move', () => {
    const rootCoordinate: Coordinate = {
      x: 0,
      y: 0,
    }

    const rootRect: Rect = {
      width: 800,
      height: 600,
    }

    const cropContainerRect: Rect = {
      width: 400,
      height: 300,
    }

    const initialMouseCoordinate: Coordinate = {
      x: 0,
      y: 0,
    }

    const initialCropContainerCoordinate: Coordinate = {
      x: 0,
      y: 0,
    }

    const moveCropContainerLogic = new MoveCropContainerLogic()

    moveCropContainerLogic.handleCropContainerActive(initialMouseCoordinate, initialCropContainerCoordinate)

    // mouse move from (0, 0) to (100, 100)
    const mouseCoordinate: Coordinate = {
      x: 100,
      y: 100,
    }

    const result = moveCropContainerLogic.handleCropContainerMove({
      mouseCoordinate,
      rootCoordinate,
      rootRect,
      cropContainerRect,
    })

    expect(result).not.toBeNull()
    expect(result!.x).toBe(100)
    expect(result!.y).toBe(100)
  })

  test('should not move beyond the top boundary', () => {
    const rootCoordinate: Coordinate = {
      x: 0,
      y: 0,
    }

    const rootRect: Rect = {
      width: 800,
      height: 600,
    }

    const cropContainerRect: Rect = {
      width: 400,
      height: 300,
    }

    const initialMouseCoordinate: Coordinate = {
      x: 0,
      y: 300,
    }

    const initialCropContainerCoordinate: Coordinate = {
      x: 0,
      y: 300,
    }

    const moveCropContainerLogic = new MoveCropContainerLogic()

    moveCropContainerLogic.handleCropContainerActive(initialMouseCoordinate, initialCropContainerCoordinate)

    // mouse move from (0, 300) to (0, -300)
    const mouseCoordinate: Coordinate = {
      x: 0,
      y: -300,
    }

    const result = moveCropContainerLogic.handleCropContainerMove({
      mouseCoordinate,
      rootCoordinate,
      rootRect,
      cropContainerRect,
    })

    expect(result).not.toBeNull()
    expect(result!.x).toBe(0)
    expect(result!.y).toBe(0)
  })

  test('should not move beyond the right boundary', () => {
    const rootCoordinate: Coordinate = {
      x: 0,
      y: 0,
    }

    const rootRect: Rect = {
      width: 800,
      height: 600,
    }

    const cropContainerRect: Rect = {
      width: 400,
      height: 300,
    }

    const initialMouseCoordinate: Coordinate = {
      x: 0,
      y: 0,
    }

    const initialCropContainerCoordinate: Coordinate = {
      x: 0,
      y: 0,
    }

    const moveCropContainerLogic = new MoveCropContainerLogic()

    moveCropContainerLogic.handleCropContainerActive(initialMouseCoordinate, initialCropContainerCoordinate)

    // mouse move from (0, 0) to (800, 0)
    const mouseCoordinate: Coordinate = {
      x: 800,
      y: 0,
    }

    const result = moveCropContainerLogic.handleCropContainerMove({
      mouseCoordinate,
      rootCoordinate,
      rootRect,
      cropContainerRect,
    })

    expect(result).not.toBeNull()
    expect(result!.x).toBe(400)
    expect(result!.y).toBe(0)
  })

  test('should not move beyond the bottom boundary', () => {
    const rootCoordinate: Coordinate = {
      x: 0,
      y: 0,
    }

    const rootRect: Rect = {
      width: 800,
      height: 600,
    }

    const cropContainerRect: Rect = {
      width: 400,
      height: 300,
    }

    const initialMouseCoordinate: Coordinate = {
      x: 0,
      y: 0,
    }

    const initialCropContainerCoordinate: Coordinate = {
      x: 0,
      y: 0,
    }

    const moveCropContainerLogic = new MoveCropContainerLogic()

    moveCropContainerLogic.handleCropContainerActive(initialMouseCoordinate, initialCropContainerCoordinate)

    // mouse move from (0, 0) to (0, 600)
    const mouseCoordinate: Coordinate = {
      x: 0,
      y: 600,
    }

    const result = moveCropContainerLogic.handleCropContainerMove({
      mouseCoordinate,
      rootCoordinate,
      rootRect,
      cropContainerRect,
    })

    expect(result).not.toBeNull()
    expect(result!.x).toBe(0)
    expect(result!.y).toBe(300)
  })

  test('should not move beyond the left boundary', () => {
    const rootCoordinate: Coordinate = {
      x: 0,
      y: 0,
    }

    const rootRect: Rect = {
      width: 800,
      height: 600,
    }

    const cropContainerRect: Rect = {
      width: 400,
      height: 300,
    }

    const initialMouseCoordinate: Coordinate = {
      x: 800,
      y: 0,
    }

    const initialCropContainerCoordinate: Coordinate = {
      x: 400,
      y: 0,
    }

    const moveCropContainerLogic = new MoveCropContainerLogic()

    moveCropContainerLogic.handleCropContainerActive(initialMouseCoordinate, initialCropContainerCoordinate)

    // mouse move from (800, 0) to (0, 0)
    const mouseCoordinate: Coordinate = {
      x: 0,
      y: 0,
    }

    const result = moveCropContainerLogic.handleCropContainerMove({
      mouseCoordinate,
      rootCoordinate,
      rootRect,
      cropContainerRect,
    })

    expect(result).not.toBeNull()
    expect(result!.x).toBe(0)
    expect(result!.y).toBe(0)
  })
})
