function asyncHandler(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (err) {
            next(err);  // transfer error to the errorMiddleware whuch handles errors.
        }
    }
}

module.exports = asyncHandler;

// asyncHandler(register);
// normal middleware: next()
// error middleware: next(err)