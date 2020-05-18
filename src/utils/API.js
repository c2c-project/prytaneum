export default function API(url) {
    this.controller = new AbortController();
    this.url = url;
    this.options = {
        method: '',
        body: '',
        headers: {
            'Content-Type': 'application/json',
        },
        signal: this.controller.signal,
    };
    this._onSuccess = () => {};
    this._onFailure = () => {};
    this.timeLimit = 4000;
    this.statusMap = {};
}

API.mock = false;
API.resolve = false;
API.resolveWith = null;
API.failWith = null;
API.fail = false;

API.prototype.body = function (body) {
    this.options.body = JSON.stringify(body);
    return this;
};

API.prototype.method = function (method) {
    this.options.method = method;
    return this;
};

API.prototype.get = function () {
    this.options.method = 'GET';
    return this;
};

API.prototype.post = function () {
    this.otpions.method = 'POST';
    return this;
};

API.prototype.header = function (key, value) {
    this.options.headers = { ...this.options.headers, [key]: value };
    return this;
};

API.prototype.onSuccess = function (fn) {
    this._onSuccess = fn;
    return this;
};

API.prototype.onFailure = function (fn) {
    this._onFailure = fn;
    return this;
};

API.prototype.onStatus = function (status, fn) {
    this.statusMap[status] = fn;
    return this;
};

API.prototype._parseStatus = function (response) {
    if (this.statusMap[response.status]) {
        this.statusMap[response.status](response);
    } else if (this.statusMap._) {
        this.statusMap._(response);
    }
    return response;
};

API.prototype.send = function (body = undefined) {
    if (body) {
        this.body(body);
    }
    if (API.mock) {
        return new Promise((resolve, reject) => {
            if (API.resolveWith !== null) {
                resolve(API.resolveWith);
            } else {
                reject(API.failWith);
            }
        })
            .then((res) => this._parseStatus(res))
            .catch((e) => this._onFailure(e));
    }
    const promise = fetch(this.url, this.options);
    setTimeout(() => this.controller.abort(), this.timeLimit);
    return promise
        .then((res) => this._parseStatus(res))
        .catch((e) => this._onFailure(e));
};
