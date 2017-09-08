const {Link, withRouter} = ReactRouter;

class RouterTab extends React.Component {
  constructor() {
    super();
    this.state = {
      tabs: []
    }
    this.stopPathname = '/react-router/tab/';
  }

  componentWillMount() {
    const {children, location: routerLocation, routes} = this.props;
    const currentTab = routes[routes.length - 1].path;
    if (routes.length === 4) {
      this.setState({tabs: [currentTab]});
    }
  }

  componentWillReceiveProps(nextProps) {
    const {routes, location: routerLocation} = nextProps;
    const currentTab = routes[routes.length - 1].path;
    const {tabs} = this.state;

    const tabIndex = tabs.indexOf(currentTab);
    const stop = this.stopPathname.indexOf(routerLocation.pathname) !== -1;

    if (tabIndex === -1 && !stop) {
      this.setState({tabs: tabs.concat([currentTab])});
    }
  }

  closeTab(tab, index) {
    this.setState({
      tabs: this.state.tabs.filter((tab, idx) => idx !== index)
    }, () => {
      const {tabs} = this.state;
      let prevTab = tabs[tabs.length - 1];
      if (tabs.length === 0) {
        prevTab = '';
      }
      this.props.router.replace(`/react-router/tab/${prevTab}`);
    });

  }

  navigate(nav) {
    this.props.router.replace(this.stopPathname + nav);
  }

  render() {
    const {children} = this.props;
    const {tabs} = this.state;

    console.log(this.props);

    return <div>
      <ul className='navs'>
        {
          ['page1', 'page2', 'page3'].map((nav, idx) => <li key={idx}><a onClick={() => this.navigate(nav)}>{nav}</a></li>)
        }
      </ul>
      <div className='container'>
        <div className='tab-container'>
          {
            tabs.map((tab, index) => <a onClick={() => this.closeTab(tab, index)} key={index}>{tab}</a>)
          }
        </div>
        <div className='page-container'>
          {children}
        </div>
      </div>
    </div>
  }
}

export default withRouter(RouterTab);
