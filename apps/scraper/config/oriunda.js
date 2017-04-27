exports.login = {
    method: 'POST',
    uri: 'http://oriunda.esinergy.com:8020/oriunda/Track',
    qs: {
        lfid: 'default'
    },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache'
    },
    formData: {
        account: 'oriunda',
        user: 'oriunda',
        password: '123oriunda'
    }
};
exports.device = {
    method: 'GET',
    uri: 'http://oriunda.esinergy.com:8020/oriunda/Track',
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
    uri: 'http://oriunda.esinergy.com:8020/oriunda/Track',
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