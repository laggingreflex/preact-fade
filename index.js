const { Component, render, h } = require('preact');

module.exports = class PreactFade extends Component {

  /* We will update elements manually. */
  shouldComponentUpdate() { return false }

  /* Just render an initial container */
  render() {
    return h('div', {
      class: 'preact-fade-container',
      ref: ref => this.containerEl = ref,
      style: 'position:relative'
    }, []);
  }

  componentWillReceiveProps(newProps = {}) {
    /* Wait for initial container to be rendered */
    if (!this.containerEl) return;

    /* Match the "changed" property on the old props with the new props */
    if ('changed' in this.props
      && this.firstTime === false
      && this.props.changed === newProps.changed
    ) return;
    /* return if same, and has been rendered at least once. */

    /* Create the new Element */
    const newEl = render(
      h('div',
        Object.assign({}, newProps),
        newProps.children || []
      ),
      /* render (append) it inside the container */
      this.containerEl
    );

    const fadeInDuration = this.props.fadeInDuration || this.props.duration || '1000ms';
    const fadeOutDuration = this.props.fadeOutDuration || this.props.duration || '500ms';
    // const fadeInDuration = '300000ms'
    // const fadeOutDuration = '300000ms'

    const oldSize = { width: 0, height: 0 };
    for (const node of this.containerEl.childNodes) {
      if (node === newEl) {
        node.style.opacity = 0;
        node.style.transition = fadeInDuration;
        setTimeout(() => {
          node.style.opacity = 1;
          delete this.containerEl.style.height;
          delete this.containerEl.style.width;
        });
      } else {
        node.style.transition = fadeOutDuration;
        node.style.opacity = 0;
        node.style.position = 'absolute';
        oldSize.width = Math.max(oldSize.width, node.offsetWidth);
        oldSize.height = Math.max(oldSize.height, node.offsetHeight);
        node.addEventListener('transitionend', () => node.remove(), { once: true });
      }
    }
    if (!newEl.offsetHeight && oldSize.height) {
      this.containerEl.style.height = oldSize.height;
    }
    if (!newEl.offsetWidth && oldSize.width) {
      this.containerEl.style.width = oldSize.width;
    }

    /* has rendered at least once */
    this.firstTime = false;
  }
}
