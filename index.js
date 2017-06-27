const { Component, render, h } = require('preact');
const fade = require('fade');

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
        Object.assign({}, newProps, {
          /* opacity:0 to start hidden */
          style: 'opacity:0',
        }),
        newProps.children || []
      ),
      /* render (append) it inside the container */
      this.containerEl
    );

    const fadeInDuration = this.props.fadeInDuration || this.props.duration || 1000;
    const fadeOutDuration = this.props.fadeOutDuration || this.props.duration || 500;

    // fade.in(newEl, fadeInDuration)
    /* Using setTimeout because for some reason it doesn't fade in otherwise */
    setTimeout(() => fade.in(newEl, fadeInDuration));

    /* fade out and remove all other (previous) elements */
    if (this.containerEl.childNodes.length > 1) {
      for (const node of this.containerEl.childNodes) {
        if (node !== newEl) {
          /* position:absolute to overlap for fading in/out in place */
          if (newProps.positionAbsolute !== false && this.props.positionAbsolute !== false) {
            node.style.position = 'absolute';
          }
          fade.out(node, fadeOutDuration, () => node.remove());
        }
      }
    }

    /* has rendered at least once */
    this.firstTime = false;
  }
}
