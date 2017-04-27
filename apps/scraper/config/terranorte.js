exports.login = {
    method: 'POST',
    uri: 'http://terranorte.esinergy.com:8020/terranorte/Track',
    qs: {
        lfid: 'default'
    },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache'
    },
    formData: {
        account: 'terranorte',
        user: 'terranorte',
        password: '123terranorte'
    }
};
exports.device = {
    method: 'GET',
    uri: 'http://terranorte.esinergy.com:8020/terranorte/Track',
    qs: {
        page: 'map.device',
        page_cmd: 'mapupd',
        date_tz: 'GMT-05:00',
        device: '',
        limit: '1',
        limType: 'last'
    },
    headers: {
        cookie: ''
    },
    agentOptions: {
        secureProtocol: 'SSLv3_method'
    }
};
exports.group = {
    method: 'GET',
    uri: 'http://terranorte.esinergy.com:8020/terranorte/Track',
    qs: {
        page: 'map.fleet',
        page_cmd: 'mapupd',
        date_tz: 'GMT-05:00',
        group: 'all',
        limType: 'last'
    },
    headers: {
        cookie: ''
    },
    agentOptions: {
        secureProtocol: 'SSLv3_method'
    }
};