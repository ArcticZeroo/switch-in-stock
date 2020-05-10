import RequestUtil from '../util/RequestUtil';
export default {
    services: {
        geocode: 'geocode'
    },
    endpoints: {
        geocode: 'geocode'
    },
    params: {
        geocode: {
            query: 'q'
        }
    },
    url: (service, endpoint, params) => `https://${service}.search.hereapi.com/v1/${endpoint}?${RequestUtil.paramsToUrl(params)}`,
    headers: token => ({
        Authorization: `Bearer ${token}`
    }),
    authorization: {
        // doesn't matter that this is in git, it'll run on the client anyways
        token: '6YySH8tmgQ54iBkDyIzkGfrFnJ8ziM9agLVMPGVbHXg'
    }
};