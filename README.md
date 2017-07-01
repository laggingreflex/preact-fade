# preact-fade

[Preact] HOC for fading in/out and also transitioning between components.

[Demo](http://laggingreflex.github.io/preact-fade/demo/)

[preact]: https://preactjs.com

## Install

```sh
npm i preact-fade
```

## Usage

```html
import PreactFade from 'preact-fade'

<PreactFade
  duration="1000ms"
  fadeInDuration="1000ms"
  fadeOutDuration="500ms"
  changed={{some.prop}}
  positionAbsolute={{true}}
>
  <YourComponent>
</PreactFade>
```

Options:

* **`duration`** **`[string]`** : Fade in/out duration. Must be [CSS `transition`] compatible string /[0-9]+(ms|s)/
* **`fade[In|Out]Duration`** **`[string](default:{in:"1000ms",out:"500ms"})`** : fade in/out duration.
* **`fade[In|Out]Duration`** **`[string](default:"500ms")`** : fade in/out duration.
* **`changed`**: Only do DOM manipulations when this setting changes (in case a component keeps firing "onUpdate" etc. events multiple times causing weird fade in/out artifacts).
* **`positionAbsolute`** **`[boolean]`**: Use `position:absolute` on old element to keep everything in place for smooth fade in/out transition.


[css-transition]: https://developer.mozilla.org/en/docs/Web/CSS/transition
