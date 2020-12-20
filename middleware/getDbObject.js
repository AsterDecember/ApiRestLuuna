const  getDbObject = (Model) => {
    return async (req, res, next) => {
        let modelDb;
        try {
            modelDb = await Model.findById(req.params.id);
            if (modelDb == null) {
                return res.status(404).json({ message: "Cannot find object on db" });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
        res.dbObject = modelDb;
        next();
    }
}

module.exports = {
    getDbObject
}