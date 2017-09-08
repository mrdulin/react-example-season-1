export default class extends React.Component {
  constructor() {
    super();
    console.log('Child Component A constructor');
  }

  componentDidMount() {
    console.log('Child Component A did mount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('Child Component A will receive props');
  }

  componentWillUnmount() {
    console.log('Child Component A will unmount')
  }

  componentDidUpdate() {
    console.log('Child Component A did update');
  }

  render() {
    const {show} = this.props;
    if (!show) return null;

    return <div>
      Child Component A
    </div>
  }
}
