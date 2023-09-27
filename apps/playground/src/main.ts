import { CropperImpl } from '@plasticine-cropper/core'
import '@plasticine-cropper/core/dist/plasticine-cropper.css'

import './style.css'

const imageElement = document.querySelector<HTMLImageElement>('#playground-image')

if (imageElement) {
  setup(imageElement)
}

function setup(imageElement: HTMLImageElement) {
  new CropperImpl(imageElement, { moveable: true })
}
