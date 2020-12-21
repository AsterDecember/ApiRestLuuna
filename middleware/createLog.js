const Log = require('../models/Logs')
const createDbLog = async (req, res, next) => {
    let log = new Log({
        path: req.url.substr(1),
        payload: JSON.stringify(req.body),
        userType: req.headers['token'] ? 1 : 0
    })
    let newLog = null
    try {
        newLog = await log.save()
    } catch (err) {
        console.log(err)
    }
    res.newLog = newLog
    next();
}

module.exports = {
    createDbLog
}