import {fork} from 'redux-saga/effects';

import watchFetchBook from './Beginning';

export default function* root() {
    yield [
        fork(watchFetchBook)
    ]
}