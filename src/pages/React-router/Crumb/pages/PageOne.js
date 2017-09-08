const {Link} = ReactRouter;

export default class extends React.Component {
  render() {
    return <div style={{border: '1px solid red', padding: '20px'}}>
      This is page one
      <Link to="/react-router/crumb/level1/level2">level2</Link>
      <div>{this.props.children}</div>
    </div>
  }
}
