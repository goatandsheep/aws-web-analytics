import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';
import AmplifyConfig from './AmplifyConfig';
(() => {
    const main = () => {
        window.LOG_LEVEL = 'DEBUG';
        const el = document.querySelector('#aws-web-analytics');
        const idPool = el.getAttribute('data-id-pool');
        const pinpoint = el.getAttribute('data-pinpoint-id');
        const pageType = document.location.hash ? 'SPA' : 'multiPageApp';
        const referer = document.referrer;
        const utm_source = 'utm_source';
        const utm_medium = 'utm_medium';
        const utm_campaign = 'utm_campaign';
        const utm_term = 'utm_term';
        const utm_content = 'utm_content';
        new AmplifyConfig(pinpoint, idPool);
        Auth
            .currentCredentials()
            .then((creds) => {
            Analytics
                .autoTrack('pageView', {
                enable: true,
                eventName: 'pageView',
                type: pageType,
                provider: 'AWSPinpoint',
                getUrl: () => {
                    return window.location.origin + window.location.pathname;
                },
                attributes: () => {
                    let queryString = window.location.search.slice(1);
                    let queryStrings = queryString.split('&');
                    let query = { referer: referer };
                    queryStrings
                        .forEach((val) => {
                        const entry = val.split('=');
                        query[entry[0]] = entry[1];
                    });
                    return query;
                }
            });
            Analytics
                .autoTrack('event', {
                enable: true,
                events: ['click'],
                selectorPrefix: 'data-amplify-analytics-',
                provider: 'AWSPinpoint',
                attributes: { attr: 'attr' }
            });
        });
    };
    main();
})();
