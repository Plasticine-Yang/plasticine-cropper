# `@plasticine-cropper/core`

An image cropper.

## Usage

```ts
import { CropperImpl } from '@plasticine-cropper/core'

// style sheet
import '@plasticine-cropper/core/style'

const imageElement = document.querySelector<HTMLImageElement>('#playground-image')

if (imageElement) {
  setup(imageElement)
}

function setup(imageElement: HTMLImageElement) {
  new CropperImpl(imageElement)
}
```
