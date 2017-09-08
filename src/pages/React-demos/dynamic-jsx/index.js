const MyComponent = () => {
  return <div>
    MyComponent
  </div>
}

const HisComponent = () => {
  return <div>
    HisComponent
  </div>
}


export default class extends React.Component {
  static defaultProps = {
    long: 1
  }

  onChange() {

  }

  render() {
    const input = this.props.long ? <textarea
      onChange={this.onChange}
      className="make-this-pretty"
      id="important-input"
      name="important-input" /> :
      <input
        onChange={this.onChange}
        className="make-this-pretty"
        id="important-input"
        name="important-input" />;


    const Tag = this.props.long ? "textarea" : "input";
    const dynamicInput = <Tag onChange={this.onChange} className="make-this-pretty" id="important-input" />

    const DynamicComponent = this.props.long ? 'MyComponent' : 'HisComponent';

    return <div>
      <p>动态jsx标签</p>
      {input}
      {dynamicInput}
      {DynamicComponent}
    </div>
  }

}
