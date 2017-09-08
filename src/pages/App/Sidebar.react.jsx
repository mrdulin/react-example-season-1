import React, {Component, PureComponent} from 'react';
import {withRouter, Link} from 'react-router';
import {META_DATA} from 'articles';

class Sidebar extends PureComponent {
  constructor(props) {
    super(props);
    this.handleTextFilterChange = ::this.handleTextFilterChange;
    this.toggleSideBar = ::this.toggleSideBar;
    this.state = {
      filterText: this.props.filterText,
      hideSideBar: this.props.hideSideBar,
      libShowMap: {}
    };

    const libNames = this.libNames;
    const libShowMap = {};
    libNames.forEach((libName, idx) => {
      libShowMap[libName] = true;
    });
    Object.assign(this.state, {libShowMap});
  }

  get libNames() {
    return Object.keys(META_DATA.items);
  }

  render() {
    console.count('sidebar render');
    const sideBarItems = this.renderItems();
    const {hideSideBar, filterText} = this.state;
    return <div className={`sidebar ${hideSideBar ? 'hide' : ''}`}>
      <a id='hide-sidebar' onClick={this.toggleSideBar}>隐藏</a>
      <Link className='toc_title' to='/'><code>React</code>全家桶<span>({__VERSION__})</span></Link>
      <ul className='toc_section'>
        <li>» <a href="https://github.com/mrdulin/react-examples">GitHub Repository</a></li>
      </ul>
      <input id='article-filter' type="text" placeholder='Filter' value={filterText} onChange={this.handleTextFilterChange}/>
      {sideBarItems}
    </div>
  }

  handleTextFilterChange(e) {
    const value = e.target.value;
    this.setState({filterText: value});
    this.props.handleFilterChangeCallback(value);
  }

  renderItems() {
    const {items} = META_DATA;
    const libNames = this.libNames;
    return libNames.map((libName, index) => {
      const articleKeys = Object.keys(items[libName]);
      const articles = articleKeys.sort().map((articleKey, idx) => {
        if (articleKey.indexOf(this.state.filterText) !== -1) {
          return <li key={articleKey}>
            - <Link to={`/${libName}/${articleKey}`}>{articleKey}</Link>
          </li>
        }
      });
      return <div key={libName} className='searchable_section'>
        <a className="toc_title" href='javascript:void(0)' onClick={e => this.handleTitleClick(e, libName)}>{libName}</a>
        <div>
          <ul className='toc_section' id={`${libName}-list`}>{articles}</ul>
          {this.state.libShowMap[libName] ? null : <span>...</span>}
        </div>
      </div>
    })
  }

  toggleSideBar(e) {
    const {
      handleSideBarHideCallback = () => {
      }
    } = this.props;
    const hideSideBar = !this.state.hideSideBar;
    this.setState({hideSideBar}, handleSideBarHideCallback.bind(this, hideSideBar));
  }

  handleTitleClick(e, libName) {
    const currentLibName = this.props.location.pathname.replace('/', '');
    this.toggleList(libName, `${libName}-list`);
    if (currentLibName === libName) {
      return void 0;
    }
    this.props.router.push(`/${libName}`);
  }

  componentDidUpdate(prevProps, prevState) {
  }

  /**
   * @desc ul用DOM原生方法处理显示与隐藏，省略号用了react的state来控制显示与隐藏
   * @param libName
   * @param idSelector
   */
  toggleList(libName, idSelector) {
    const listNode = document.getElementById(idSelector);
    const show = listNode.style.display === 'block' || listNode.style.display === '';
    listNode.style.display = show ? 'none' : 'block';
    this.setState((prevState, props) => {
      const {libShowMap} = prevState;
      libShowMap[libName] = !libShowMap[libName];
      return {libShowMap};
    });
  }
}

export default withRouter(Sidebar);
