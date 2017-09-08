class Menu1item extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.glyph1}</p>
        <p dangerouslySetInnerHTML={{ __html: this.props.glyph1 }}></p>
        <p>{[this.props.glyph1]}</p>
        <p>{this.props.glyph}</p>
        <p>{this.props.value}</p>
      </div>
    )
  }
}

export default class extends React.Component {
  render() {
    const menu = {
      menu1: 'YOU',
      glyph1: '<span class="icon">&#xe80d;</span>',
      glyph: (<span className="icon">&#xe80d;</span>)
    }
    return <div>
      <Menu1item glyph1={menu.glyph1} glyph={menu.glyph} value={menu.menu1} />
    </div>
  }
}
