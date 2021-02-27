module.exports = function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await model.countDocuments()){
            results.next = {
                page : page + 1,
                limit : limit
            }
        }

        if (startIndex > 0){
            results.previous = {
                page : page - 1,
                limit: limit
            }
        }

        try {
            results.result = await model.find().limit(limit).skip(startIndex)
            res.paginatedResults = results
            next()
        } catch (error) {
            res.json({ message: "Error while querying from the Database." });
        }
    }
};