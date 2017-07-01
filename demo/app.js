class Demo extends Component {

  render() {
    return h('container', {}, [
      h('main', {}, [
        h('p', {}, ['Confucius say']),
        this.state.quote && h(PreactFade, {}, [h('blockquote', {
          style: {
            color: 'white',
            background: '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, 0),
            padding: '1em',
          }
        }, [this.state.quote])]),
      ]),
    ])
  }

  componentWillMount() {
    this.randomQuotes = `
      Everything has its beauty, but not everyone sees it.
      It does not matter how slowly you go so long as you do not stop.
      Our greatest glory is not in never falling, but in rising every time we fall.
      I want you to be everything that's you, deep at the center of your being.
      I hear and I forget. I see and I remember. I do and I understand.
      Choose a job you love, and you will never have to work a day in your life.
      Wheresoever you go, go with all your heart.
      By three methods we may learn wisdom: First, by reflection, which is noblest; Second, by imitation, which is easiest; and third by experience, which is the bitterest.
      When anger rises, think of the consequences.
      Real knowledge is to know the extent of one's ignorance.
    `.split(/[\n\r]+/).map(q => q.trim()).filter(Boolean)

    setInterval(() => {
      if (this.ended) {
        this.setState({ quote: null });
      } else if (!this.paused) {
        this.setState({ quote: this.getRandomQuote() })
      }
    }, 1000);

    window.addEventListener('keyup', e => ({
      32: (space) => {
        if (this.ended) {
          this.ended = this.paused = false;
        } else {
          this.paused = !this.paused;
        }
      },
      27: (escape) => {
        this.ended = true;
      },
    }[e.which]()));
  }

  getRandomQuote() {
    return this.randomQuotes[Math.floor(Math.random() * this.randomQuotes.length)];
  }

}

render(h(Demo), document.getElementById('app'));
