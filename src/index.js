import Auth from '@aws-amplify/auth'
import Analytics from '@aws-amplify/analytics'



var utmSource = 'utm_source'
var utmMedium = 'utm_medium'
var utmCampaign = 'utm_campaign'
var utmTerm = 'utm_term' // running+shoes
var utmContent = 'utm_content'

var referer = document.referrer;

Auth.currentCredentials().then(creds => {

    Analytics.autoTrack('pageView', {
        // REQUIRED, turn on/off the auto tracking
        enable: true,
        // OPTIONAL, the event name, by default is 'pageView'
        eventName: 'pageView',
        // OPTIONAL, the attributes of the event, you can either pass an object or a function 
        // which allows you to define dynamic attributes
        attributes: {
            attr: 'attr'
        },
        // when using function
        // attributes: () => {
        //    const attr = somewhere();
        //    return {
        //        myAttr: attr
        //    }
        // },
        // OPTIONAL, by default is 'multiPageApp'
        // you need to change it to 'SPA' if your app is a single-page app like React
        type: 'multiPageApp',
        // OPTIONAL, the service provider, by default is the AWS Pinpoint
        provider: 'AWSPinpoint',
        // OPTIONAL, to get the current page url
        getUrl: () => {
            // the default function
            return window.location.origin + window.location.pathname;
        }
    });
    
    // TODO: other types of tracking
    Analytics.autoTrack('event', {
        // REQUIRED, turn on/off the auto tracking
        enable: true,
        // OPTIONAL, events you want to track, by default is 'click'
        events: ['click'],
        // OPTIONAL, the prefix of the selectors, by default is 'data-amplify-analytics-'
        // in order to avoid collision with the user agent, according to https://www.w3schools.com/tags/att_global_data.asp
        // always put 'data' as the first prefix
        selectorPrefix: 'data-amplify-analytics-',
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

