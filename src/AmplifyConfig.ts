
import Amplify from '@aws-amplify/core'


export default class AmplifyConfig {

  /**
   * Defaults configuration for Bitmovin Players
   * @param {String} key
   * @param {Boolean} [cast]
   */

  constructor(

    pinpointId:any,
    fedpool:any,
    region:any='us-east-1'

    ) {

    Amplify
      .configure({
        
        Auth: {

          region,
          identityPoolId:       fedpool

        },

        Analytics: {
          AWSPinpoint: {

            appId:              pinpointId,
            region:             region,
            mandatorySignIn:    false

          }

      }
    })
  }
}