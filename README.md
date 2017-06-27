# preact-fade

[Preact] HOC for fading in/out (using [fade]) and also transitioning between components.

[preact]: https://preactjs.com
[fade]: https://github.com/juliangruber/fade

## Install

```sh
npm i preact-fade
```

## Usage

```html
import PreactFade from 'preact-fade'

<PreactFade
  duration=1000
  fadeInDuration=1000
  fadeOutDuration=500
  changed={{some.prop}}
  positionAbsolute={{true}}
>
  <YourComponent>
</PreactFade>
```

Options:

* **`duration`**: Fade in/out duration.
* **`fade[In|Out]Duration`**: fade in/out duration.
* **`changed`**: Only do DOM manipulations when this setting changes (in case a component keeps firing "onUpdate" etc. events multiple times causing weird fade in/out artifacts).
* **`positionAbsolute`**: Use `position:absolute` on old element to keep everything in place for smooth fade in/out transition.
