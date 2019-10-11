module.exports = {
    withCatch,
    filterObj
}

function withCatch(promise) {
    return promise
        .then(data => [null, data])
        .catch(err => [err])
}

function filterObj (predicateFn, o) {
    const newObj = {}
    
	Object.keys(o)
	.filter(key => predicateFn(key))
    .forEach(key => newObj[key] = o[key])
    
	return newObj
}