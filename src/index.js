import Auth from '@aws-amplify/auth'
import Analytics from '@aws-amplify/analytics'
import AmplifyConfig from './AmplifyConfig'

(function () {

    function main() {

        const el = document.querySelector('#aws-web-analytics')

        const idPool = el.getAttribute('data-id-pool')
        const pinpoint = el.getAttribute('data-pinpoint-id')

        const pageType = document.location.hash ? 'SPA' : 'multiPageApp'

        if (process.env.NODE_ENV !== 'production') {
            window.LOG_LEVEL='DEBUG'
        }

        var utm_source = 'utm_source'
        var utm_medium = 'utm_medium'
        var utm_campaign = 'utm_campaign'
        var utm_term = 'utm_term' // running+shoes
        var utm_content = 'utm_content'

        var referer = document.referrer;

        new AmplifyConfig(pinpoint, idPool)

        Auth.currentCredentials().then(creds => {

            Analytics.autoTrack('pageView', {
                // REQUIRED, turn on/off the auto tracking
                enable: true,
                // OPTIONAL, the event name, by default is 'pageView'
                eventName: 'pageView',
                // OPTIONAL, the attributes of the event, you can either pass an object or a function 
                // which allows you to define dynamic attributes
                attributes: () => {

                    let queryString = window.location.search.slice(1)
                    let queryStrings = queryString.split('&')

                    let query = {
                        referer: referer
                    }

                    queryStrings.forEach(val => {
                        const entry = val.split('=')
                        query[entry[0]] = entry[1]
                    })

                    return query
                },
                type: pageType,
                provider: 'AWSPinpoint',
                // OPTIONAL, to get the current page url
                getUrl: () => {
                    // the default function
                    return window.location.origin + window.location.pathname;
                }
            });

            Analytics.autoTrack('event', {
                // REQUIRED, turn on/off the auto tracking
                enable: true,
                // OPTIONAL, events you want to track, by default is 'click'
                events: ['click'],
                // OPTIONAL, the prefix of the selectors, by default is 'data-amplify-analytics-'
                // in order to avoid collision with the user agent, according to https://www.w3schools.com/tags/att_global_data.asp
                // always put 'data' as the first prefix
                selectorPrefix: 'data-aws-analytics-',
                // OPTIONAL, the service provider, by default is the AWS Pinpoint
                provider: 'AWSPinpoint',
                // OPTIONAL, the default attributes of the event, you can either pass an object or a function 
                // which allows you to define dynamic attributes
                attributes: {
                    attr: 'attr'
                }
                // when using function
                // attributes: () => {
                //    const attr = somewhere();
                //    return {
                //        myAttr: attr
                //    }
                // }
            });

        })


    }
    main()
})()
