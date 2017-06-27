const { Component, render, h } = require('preact');

module.exports = class PreactFade extends Component {

  /* We will update elements manually. */
  shouldComponentUpdate() { return false }

  /* Just render an initial container */
  render() {
    return h('div', {
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

    for (const node of this.containerEl.childNodes) {
      if (node === newEl) {
        node.style.opacity = 0;
        node.style.transition = fadeInDuration;
        setTimeout(() => node.style.opacity = 1);
      } else {
        node.style.transition = fadeOutDuration;
        node.style.opacity = 0;
        node.style.position = 'absolute';
        node.addEventListener('transitionend', () => node.remove(), { once: true });
      }
    }

    /* has rendered at least once */
    this.firstTime = false;
  }
}
