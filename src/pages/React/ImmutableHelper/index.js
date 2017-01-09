import update from 'immutability-helper';
import 'whatwg-fetch';

const {PureComponent, Component} = React;
const {findDOMNode} = ReactDOM;
const API = 'http://it-ebooks-api.info/v1/search';

 const _compare = (prop) => (a, b) => {
    const valA = a[prop];
    const valB = b[prop];
    if(val1 < val2) return -1;
    if(val1 > val2) return 1;
    return 0;
}

const _compareByKey = (prop, sortKey) => (a, b) => {
    return sortKey === 'desc' ? ~~(a[prop] > b[prop]) : ~~(a[prop] < b[prop]);
}

const BookList = ({books, toggleIntro}) => {
    if(!books || books.length === 0) return null;
    return <ul className='book-list'>
        {books.map((book, index) => <BookItem key={index} book={book} toggleIntro={() => toggleIntro(index)}></BookItem>)}
    </ul>
}

const BookItem = ({book, toggleIntro}) => (
    <li className='book-item'>
        <div className='l'>
            <img className='book-thumbnail' src={book.Image} alt="book thumbnail"/>
        </div>
        <div className='r'>
            <h1 className='book-title'>{book.Title}</h1>
            <a href="javascript: void 0" onClick={toggleIntro}>{book.showIntro ? '隐藏简介' : '显示简介'}</a>
            <div style={{display: book.showIntro ? 'block' : 'none'}}>
                <p className='subTitle'>{book.SubTitle}</p>
            </div>
        </div>
    </li>
)

const LoadMore = ({page, pageSize, total, load}) => {

    const hasMore = page * pageSize < total;

    if(!hasMore) return null;

    return <p type='button' className='LoadMore' onClick={load}>加载更多</p>
}

const QueryTime = ({time}) => {
    if(!time) return null;
    return <p className='query-time'>本次查询耗时{time}秒</p>
}

const Empty = ({show}) => {
    if(!show) return null;
    return <p className='empty'>查询不到结果~</p>
}

const Header = ({children}) => <header className='header'>{children}</header>;

const SubHeader = ({children}) => <div className='sub-header'>{children}</div>;
    
const SearchBar = ({submit}) => {
    let _input = null;
    const handleSubmit = (e) => {
        _input.blur();
        submit && submit(e);
    };
    return <form className='search-form' onSubmit={handleSubmit}>
        {/*<input type="search" name="search" onChange={e => this._handleSearchChange(e)} placeholder='输入书名进行搜索'/>*/}
        <input className='search-input' ref={ref => _input = ref} type="search" name="search" placeholder='输入书名进行搜索' autoComplete='off'/>
        <button type="submit">搜索</button>
    </form>
}

const Spin = ({show}) => {
    if(!show) return null;
    return <div className='spin'>
        <p className='spin-text'>搜索中...</p>
    </div>
}

const Scroller = ({children}) => {
    return <div className='scroller'>{children}</div>
}

const Filter = ({change, filter}) => {
    const titleMap = {
        'desc': '降序',
        'asc': '升序',
        'none': '点击排序'
    }

    const handleTitleFilter = () => {
        let key = '';
        if(filter.title === 'none') {
            key = 'desc';
        } else {
            key = filter.title === 'desc' ? 'asc' : 'desc';
        }
        change && change(key);
    }

    const titleTxt = titleMap[filter.title];
    console.log(titleTxt);
    return <div className='filter'>
        <button type="button" onClick={handleTitleFilter}>{titleTxt}</button>
    </div>
}   

const Wrapper = ({children}) => <div className='wrapper'>{children}</div>

export default class extends Component{
    constructor() {
        super();
        this.state = {
            books: [],
            time: 0,
            query: '',
            page: 1,
            total: 0,
            filter: {
                title: 'none'
            },
            searching: false
        }

    }

    componentDidMount() {
        this._wrapperElement = document.querySelector('.wrapper');
        this._subHeaderElement = document.querySelector('.sub-header');
        this._searchInput = document.querySelector('.search-input');
        this._updateWrapperTop();
        this._initScroller();       
    }

    componentWillUnmount() {
        this._scroller.destroy();
        this._scroller = null;
        document.removeEventListener('touchmove', this._preventTouchmoveDefault);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // this.state.filter === nextState.filter //false

        return true;
    }

    _initScroller() {
        document.addEventListener('touchmove', this._preventTouchmoveDefault, false);
        this._scroller = new IScroll(this._wrapperElement);
        this._scroller.on('beforeScrollStart', ::this._blurSearchInput)
    }

    _preventTouchmoveDefault(e) {
        e.preventDefault();
    }

    _blurSearchInput() {
        // console.log(this._searchInput);
        this._searchInput.blur();
    }

    _updateWrapperTop() {
        const subheaderHeight = this._caculateSubHeaderHeight();
        const headerHeight = 45;
        const height = subheaderHeight + headerHeight;
        console.log(height);
        this._wrapperElement.style.top = `${height}px`;
    }
    
    _caculateSubHeaderHeight() {
        const heightOriginal = window.getComputedStyle(this._subHeaderElement).getPropertyValue('height');
        const height = ~~heightOriginal.replace('px', '');
        return height;
    }
    

    _fetchData(query, page) {
        const url = `${API}/${query}/page/${page}`;
        return fetch(url).then(res => res.json()).then(data => {
            const {Books: books = [], Total: total, Time: time = 0} = data;
            const totalInt = parseInt(total, 10);
            return {books, total: totalInt, time};
        }).catch(e => {
            console.error(e)
        });
    }
    /**
     * @desc 加载更多
     */
    _loadMore() {
        const {page, query, filter: {title}} = this.state;
        const nextPage = page + 1;
        this._fetchData(query, nextPage).then(data => {
            const {books} = data;

            //使用新建引用的方式
            const oldBooks = this.state.books;
            const newBooks = Array.prototype.concat.apply(oldBooks, books);
            let newState =  {
                books: newBooks,
                page: nextPage
            }


            //使用immutable-helper的方式
            // let newState = update(this.state, {
            //     books: {$push: books},
            //     page: {$set: nextPage}
            // });
            // if(title !== 'none') {
            //     newState = update(newState, {
            //         books: {
            //             $apply: items => {
            //                 return items.sort(_compareByKey('Title', title));
            //             }
            //         }
            //     })
            // }
            this.setState(newState, this._refreshScroller);
        })
    }

    _handleSearchChange(e) {
        const newState = update(this.state, {query: {$set: e.target.value}});
        this.setState(newState);
    }

    _updateState(query) {
        const newState = update(this.state, {
            query: {$set: query},
            page: {$set: 1},
            total: {$set: 0},
            searching: {$set: true}
        });
        this.setState(newState);
    }

    _handleSearchFormSubmit(e) {
        e.preventDefault();
        console.log('submit');
        const form = e.target;
        const query = form.search.value;
        const {page, filter: {title}} = this.state;

        //虽然在react事件中调用多次setState，react会把这些new state合并后再setState，但是异步callback中的setState除外.
        this._updateState(form.search.value); //render 1次
        this._fetchData(query, page).then(data => { //异步请求 render 1次
            const {books, total, time} = data;
            let newState = update(this.state, 
                {
                    books: {$set: books},
                    total: {$set: total},
                    time: {$set: time},
                    searching: {$set: false}
                }
            );
            if(title !== 'none') {
                newState = update(newState, {
                    books: {$apply: books => books.sort(_compareByKey('Title', title))}
                })
            }
            this.setState(newState, this._refreshScroller);
        })
    }

    _refreshScroller() {
        setTimeout(() => {
            this._updateWrapperTop();
            this._scroller.refresh();
        }, 10)
    }

    _handleFilterChange(titleKey) { 
        const newState = update(this.state, {
            filter: {title: {$set: titleKey}},
            books: {$apply: (books) => {
                return books.sort(_compareByKey('Title', titleKey))
            }}
        })
        this.setState(newState);
    }

    _toggleIntro(index) {
        //1. use immutable-helper，but it seems there is no need to use it.
        const newState = update(this.state, {
            books: {$apply: books => {
                let target = books[index];
                const newTarget = update(target, {
                    showIntro: {$apply: showIntro => {
                        if(typeof showIntro === 'undefined') {   
                            return true;
                        } else {
                            return !showIntro;
                        }
                    }}
                })
                return [...books.slice(0, index), newTarget, ...books.slice(index + 1)];
            }}
        })

        //2. immutable-helper way version 2
        //  const newState = update(this.state, {
        //     books: {$apply: books => {
        //         let target = books[index];
        //         const showIntro = target.showIntro;
        //         target.showIntro = typeof showIntro === 'undefined' ? true : !showIntro;
                 
        //         return [...books.slice(0, index), target, ...books.slice(index + 1)];
        //     }}
        // })
        
        // 3. use es7 object spread property 
        // const {books} = this.state;
        // const target = books[index]; 
        // const showIntro = target.showIntro;
        // const newState = {
        //     ...this.state,
        //     books: [
        //         ...books.slice(0, index),
        //         Object.assign({}, target, {showIntro: typeof showIntro === 'undefined' ? true : !showIntro}),
        //         ...books.slice(index + 1)
        //     ]
        // }
        console.log('this.state', this.state);  //方式2修改了源数据this.state.books中某个book对象的字段
        console.log('newState', newState);
        this.setState(newState);
    }

    render() {
        console.count('render count');
        const {books = [], query, page, total, filter, time, searching} = this.state;
        // console.log(this.state);

        return <div>
            <p>immutable-helper + iscroll + react</p>
            <div id='immutable-helper'>
                <Header>
                    <SearchBar submit={e => this._handleSearchFormSubmit(e)}></SearchBar>
                </Header>
                <SubHeader>
                    <Filter change={(titleKey) => this._handleFilterChange(titleKey)} filter={filter}></Filter>
                    <QueryTime time={time}></QueryTime>
                </SubHeader>
                <Wrapper>
                    <Scroller>
                        <BookList books={books} toggleIntro={index => this._toggleIntro(index)}></BookList>
                        <Empty show={query && !searching && books.length === 0}></Empty>
                        <LoadMore page={page} pageSize={10} total={total} load={() => this._loadMore()}></LoadMore>
                    </Scroller>
                </Wrapper>
                <Spin show={searching}></Spin>
            </div>
        </div> 
    }
}