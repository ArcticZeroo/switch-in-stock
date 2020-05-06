export default class RequestUtil {
    public static paramsToUrl(params: object) {
        return Object.keys(params)
            .reduce((arr, key) => {
                arr.push(`${key}=${params[key]}`);
                return arr;
            }, [])
            .join('&');
    }
}