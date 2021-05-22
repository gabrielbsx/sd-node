const axios = require('axios');
exports.serverlist = async (req, res, next) => {
    try {
        const { server } = req.params;

        const serverlist = await axios.get('http://51.222.128.81/serv00.htm');

        return res.send(serverlist.data);
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
}