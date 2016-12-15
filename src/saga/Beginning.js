import {call, put} from 'redux-saga/effects';
import {takeEvery, takeLatest} from 'redux-saga'

//api service
const api = 'http://it-ebooks-api.info/v1';

const service = {};

service.fetchBook = function ({query, page}) {
    const url = `${api}/search/${query}/page/${page}`;
    return fetch(url).then(res => res.json());
}

function* fetchBook(action) {
    try {
        const result = yield call(service.fetchBook, action.payload);
        yield put({type: 'BOOK_FETCH_SUCCEEDED', result});
    } catch(e) {
        yield put({type: 'BOOK_FETCH_FAILED', message: e.message});
    }
}

function* watchFetchBook() {
    yield takeEvery('BOOK_FETCH_REQUESTED', fetchBook);
}

function* watchFetchBook() {
    yield takeLatest('BOOK_FETCH_REQUESTED', fetchBook);
}

export default watchFetchBook;