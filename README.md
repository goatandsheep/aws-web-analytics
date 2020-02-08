# AWS Web Analytics

Tracking tag library for AWS Pinpoint as an alternative to Google Analytics. 

## Philosophy

Please see [Why you need to move off Google Analytics](https://dev.to/goatandsheep/stop-donating-your-customers-data-to-google-analytics-191)

## Initialize your account

1. Create an AWS account
2. Create your Pinpoint account and Cognito Federated user pool (optional)

```html
<script
    data-id-pool="us-east-1:abcd1234-abcd-1234-5678-abcd12345678"
    data-pinpoint-id="1234abcd5678abcd7890abcd1234"
    id="aws-web-analytics"
    src="https://goatandsheep.github.io/aws-web-analytics/dist/aws-web-analytics.js"
    type="text/javascript"
></script>
```


https://ga-dev-tools.appspot.com/campaign-url-builder/

