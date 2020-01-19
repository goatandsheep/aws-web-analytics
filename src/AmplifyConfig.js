import Amplify from '@aws-amplify/core'
export default class AmplifyConfig {
  /**
   * Defaults configuration for Bitmovin Players
   * @param {String} key
   * @param {Boolean} [cast]
   */
  constructor(pinpointId, fedpool, region='us-east-1') {
    Amplify.configure({
      Auth: {
        region,
        identityPoolId: fedpool
      },
      Analytics: {
        AWSPinpoint: {
          appId: pinpointId,
          region: region,
          mandatorySignIn: false
        }
      }
    })
  }
}