const initState = {
  books: [],
  page: 1,
  total: 0,
  layout: 'list'
};

export const ReduxSagaBeginning = (state = initState, action) => {
  switch (action.type) {
    case 'BOOK_FETCH_SUCCEEDED':
      let {Books: books, Page: page, Total: total} = action.result;
      const {page: currentPage, books: currentBooks} = state;
      if (currentPage < page) {
        books = currentBooks.concat(books);
      }
      return Object.assign({}, state, {books, page, total});
    case 'BOOK_FETCH_FAILED':
      return state;
    case 'SWITCH_BOOK_LIST_LAYOUT':
      const layout = state.layout === 'list' ? 'grid' : 'list';
      return Object.assign({}, state, {layout});
    default:
      return state;
  }
}
