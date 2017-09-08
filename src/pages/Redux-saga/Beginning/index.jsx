import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import classnames from 'classnames';
import style from './style';

const Beginning = class extends React.Component {
  constructor() {
    super();

    this.pageSize = 10;
    this.handleSubmit = (e) => {
      e.preventDefault();
      const {dispatch} = this.props;
      const queryNode = e.target.query;
      const page = 1, query = queryNode.value.trim();

      this.query = query;
      this.blurSearchInput();
      this.fetchBookData(query, page);
    };

    this.blurSearchInput = () => {
      const inputNode = findDOMNode(this.inputNodeRef);
      inputNode.blur();
    }

    this.loadMore = () => {
      const {ReduxSagaBeginning: {page}} = this.props;
      const nextPage = page + 1;
      this.fetchBookData(this.query, nextPage);
    }

    this.fetchBookData = (query, page) => {
      const {dispatch} = this.props;
      dispatch({type: 'BOOK_FETCH_REQUESTED', payload: {query, page}});
    }

    this.toggleLayout = () => {
      const {ReduxSagaBeginning: {layout}, dispatch} = this.props;
      dispatch({type: 'SWITCH_BOOK_LIST_LAYOUT'});
    }
  }

  get hasMore() {
    const {ReduxSagaBeginning: {page, total}} = this.props;
    return Number.parseInt(page, 10) * this.pageSize < total;
  }

  render() {
    const {ReduxSagaBeginning: {books, page, layout}} = this.props;

    const bookNodes = books.map((book, index) => {
      return <li key={index}>
        <div className={style.bookItemLeftPart}>
          <img src={book.Image} alt="book-thumbnail"/>
        </div>
        <div className={style.bookItemRightPart}>
          <h4>{book.Title}</h4>
          <p className={style.bookSubTitle}>{book.SubTitle}</p>
        </div>
      </li>
    });

    const listLayout = classnames({
      'layout-list': layout === 'list',
      'layout-grid': layout === 'grid'
    });

    return <div>
      <h3>redux-saga beginning</h3>
      <div className={style.container}>
        <header className={style.header}>
          <form onSubmit={this.handleSubmit}>
            <input ref={ref => this.inputNodeRef = ref} className={style.searchInput} type="text" placeholder='输入书名搜索' name='query'
                   autoComplete='off'/>
          </form>
          <button type='button' className={style.layoutButton} onClick={this.toggleLayout}>网格</button>
        </header>
        <section className={style.content}>
          <ul className={style.bookList + ' ' + listLayout}>
            {bookNodes}
          </ul>
          {this.hasMore ?
            <p className={style.loadMore} onClick={this.loadMore}>加载更多</p> :
            (page > 1 ? <p className={style.loadMore}>没有更多了~</p> : null)}
        </section>
      </div>
    </div>
  }
}

export default connect(s => ({
  ReduxSagaBeginning: s.ReduxSagaBeginning
}))(Beginning);

