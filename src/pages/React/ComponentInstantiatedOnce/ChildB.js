export default class extends React.Component {
  constructor() {
    super();
    console.log('Child Component B constructor');
  }

  componentDidMount() {
    console.log('Child Component B did mount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('Child Component B will receive props');
  }

  componentWillUnmount() {
    console.log('Child Component B will unmount')
  }

  componentDidUpdate() {
    console.log('Child Component B did update');
  }

  render() {
    return <div>
      Child Component B
    </div>
  }
}
