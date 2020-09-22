// PinPoint API:        https://docs.aws.amazon.com/pinpoint/latest/apireference/welcome.html
// Amplify:             https://docs.amplify.aws/lib/auth/getting-started/q/platform/js
// Amplify Analytics:   https://docs.amplify.aws/lib/analytics/getting-started/q/platform/js

// Goal #1: Recieve AWS Credentials
// Goal #2: Decode URL
// Goal #3: Support all AWS features

import Auth from '@aws-amplify/auth'
import Analytics from '@aws-amplify/analytics'
import AmplifyConfig from './AmplifyConfig'

declare global {
    interface Window { LOG_LEVEL: any; }
} 

( () => {

   const main = () => {

        window.LOG_LEVEL = 'DEBUG';                                                         // Create Global Debug

        const el            :any    = document.querySelector('#aws-web-analytics');            // Select Document
        const idPool        :string = el.getAttribute('data-id-pool');                         // Get ID Pool
        const pinpoint      :string = el.getAttribute('data-pinpoint-id');                     // Get ID PinPoint
        const pageType      :string = document.location.hash ? 'SPA' : 'multiPageApp';         // Get URL Hash -- PageType
        const referer       :string = document.referrer;                                       // Get URL referrer
        const utm_source    :string = 'utm_source';                                            // Get URL Source
        const utm_medium    :string = 'utm_medium';                                            // Get URL Medium
        const utm_campaign  :string = 'utm_campaign';                                          // Get URL Campaign
        const utm_term      :string = 'utm_term';                                              // Get URL Terms
        const utm_content   :string = 'utm_content';                                           // Get URL Content
        
        new AmplifyConfig(pinpoint, idPool);                                                // Initiate Amazon Services

        Auth
          .currentCredentials()
          .then( (creds:any) => {                                                 // Recieve Credentials

            // Initial Tracking
            Analytics
              .autoTrack( 'pageView', {

                enable:       true,                                               // REQUIRED, turn on/off the auto tracking
                eventName:    'pageView',                                         // OPTIONAL, the event name, by default is 'pageView'
                type:         pageType,
                provider:     'AWSPinpoint',
                getUrl:       () => {
                  return window.location.origin + window.location.pathname;       // OPTIONAL, to get the current page url
                },
                attributes:   () => {                                             // OPTIONAL, the default attributes of the event, you can either pass an object or a function which allows you to define dynamic attributes

                    let queryString     :any = window.location.search.slice(1)        // Get URL Search
                    let queryStrings    :any = queryString.split('&')                 // Split URL on '&'
                    let query           :any = { referer: referer }                   // Refferer

                    queryStrings
                      .forEach( (val:any) => {

                        const entry :any = val.split('=');                            // Split URL on '='

                        query[entry[0]] = entry[1];                                   // querry attribute ?

                      })

                    return query
                }

            });

            // More Tracking
            Analytics
              .autoTrack('event', {
                enable:             true,                         // REQUIRED, turn on/off the auto tracking
                events:             ['click'],                    // OPTIONAL, events you want to track, by default is 'click'
                selectorPrefix:     'data-amplify-analytics-',    // OPTIONAL, the prefix of the selectors, by default is 'data-amplify-analytics-'
                provider:           'AWSPinpoint',                // OPTIONAL, the service provider, by default is the AWS Pinpoint
                attributes:         { attr: 'attr' }              // OPTIONAL, the default attributes of the event, you can either pass an object or a function which allows you to define dynamic attributes

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