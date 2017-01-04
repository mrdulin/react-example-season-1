import update from 'immutability-helper';
import 'whatwg-fetch';

const {PureComponent} = React;
const API = 'http://it-ebooks-api.info/v1/search';

 const _compare = (prop) => (a, b) => {
    const valA = a[prop];
    const valB = b[prop];
    if(val1 < val2) return -1;
    if(val1 > val2) return 1;
    return 0;
}

const _compareByKey = (prop, sortKey) => (a, b) => {
    return sortKey === 'desc' ? a[prop] > b[prop] : a[prop] < b[prop];
}

const BookList = ({children}) => (
    <ul>{children}</ul>
)   

const BookItem = ({book}) => (
    <li>{book.Title}</li>
)

const LoadMore = ({page, pageSize, total, load}) => {

    const hasMore = page * pageSize < total;

    return <button style={{display: hasMore ? 'block': 'none'}} type='button' onClick={load}>加载更多</button>
}
    
const SearchBar = ({submit}) => (
    <form onSubmit={submit}>
        {/*<input type="search" name="search" onChange={e => this._handleSearchChange(e)} placeholder='输入书名进行搜索'/>*/}
        <input type="search" name="search" placeholder='输入书名进行搜索' autoComplete='off'/>
    </form>
)

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
    return <div>
        <button type="button" onClick={handleTitleFilter}>{titleTxt}</button>
    </div>
}   

export default class extends PureComponent{
    constructor() {
        super();
        this.state = {
            books: [],
            query: '',
            page: 1,
            total: 0,
            filter: {
                title: 'none'
            }
        }
    }

    _fetchData(query, page) {
        const url = `${API}/${query}/page/${page}`;
        return fetch(url).then(res => res.json()).then(data => {
            const {Books: books, Total: total} = data;
            const totalInt = parseInt(total, 10);
            return {books, total: totalInt};
        }).catch(console.error);
    }

    _loadMore() {
        const {page, query, filter: {title}} = this.state;
        const nextPage = page + 1;
        this._fetchData(query, nextPage).then(data => {
            const {books} = data;
            let newState = update(this.state, {
                books: {$push: books},
                page: {$set: nextPage}
            });
            if(title !== 'none') {
                newState = update(newState, {
                    books: {
                        $apply: items => {
                            return items.sort(_compareByKey('Title', title));
                        }
                    }
                })
            }
            this.setState(newState);
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
            total: {$set: 0}
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
            const {books, total} = data;
            let newState = update(this.state, 
                {
                    books: {$set: books},
                    total: {$set: total}
                }
            );
            if(title !== 'none') {
                newState = update(newState, {
                    books: {$apply: books => books.sort(_compareByKey('Title', title))}
                })
            }
            this.setState(newState);
        })
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

    render() {
        console.count('render count');
        const {books, query, page, total, filter} = this.state;

        console.log(this.state);

        return <div id='immutable-helper'>
            <SearchBar submit={e => this._handleSearchFormSubmit(e)}></SearchBar>
            <Filter change={(titleKey) => this._handleFilterChange(titleKey)} filter={filter}></Filter>
            <BookList>
            {
                books.map((book, index) => <BookItem key={index} book={book}></BookItem>)
            }
            </BookList>
            <LoadMore page={page} pageSize={10} total={total} load={() => this._loadMore()}></LoadMore>
        </div>
    }
}