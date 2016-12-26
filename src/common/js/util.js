export default ((window, document) => {

    return {
        API: '',
        openweatherApiHost: 'http://api.openweathermap.org/data/2.5',
        openweatherApiKey: '2c36facc61cd4ec7543be24d6a7d0509',

        getImgNaturalSize: (imageElement) => {
            const img = document.createElement('img');
            const size = { width: '', height: '' };
            if (typeof img.naturalWidth !== 'undefined') {
                size.width = imageElement.naturalWidth;
                size.height = imageElement.naturalHeight;
            } else {
                img.src = imageElement.src;
                size.width = img.width;
                size.height = img.height;
            }
            return size;
        },

        setTitle: (title) => {
            document.title = title || __TITLE__
        },

        needReLogin: () => {

        },

        getTransitionEvent: () => {
            const el = document.createElement('test');
            const transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            }

            for (let t in transitions) {
                if (typeof el.style[t] !== 'undefined') {
                    return transitions[t];
                }
            }
        },

        makeActionCreator: (type, ...propertykeys) => {
            return (...propertyValues) => {
                let action = { type };
                propertykeys.forEach((el, index) => {
                    action[propertykeys[index]] = propertyValues[index];
                });
                return action;
            };
        },

        makeCancelable(promise) {
            let hasCanceled_ = false;

            const wrappedPromise = new Promise((resolve, reject) => {
                promise.then((val) =>
                    hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)
                );
                promise.catch((error) =>
                    hasCanceled_ ? reject({ isCanceled: true }) : reject(error)
                );
            });

            return {
                promise: wrappedPromise,
                cancel() {
                    hasCanceled_ = true;
                },
            };
        },

        getImgFilesizeByUrl(url) {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.responseType = "arraybuffer";
                xhr.onreadystatechange = function() {
                    if(this.status === 200) {
                        resolve(this.response.byteLength);
                    } else {
                        reject('获取图片文件大小失败')
                    }
                };
                xhr.send(null);
            })
        }
    }
})(window, document);