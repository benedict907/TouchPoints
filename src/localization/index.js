import {getState} from '../redux';

export const getLanguage = text => {
  const {
    homeModel: {appLanguage},
  } = getState();
  return languages[text][appLanguage];
};
const languages = {
  nextText: {
    en: 'Next',
    tn: 'அடுத்தது',
  },
  takeSnapShot: {
    en: 'Take Snapshot',
    tn: 'ஸ்னாப்ஷாட் எடுக்கவும்',
  },
  takeVideo: {
    en: 'Take Video',
    tn: 'வீடியோ எடு',
  },
  enterSubscriberID: {
    en: ' Please Enter The Customer Subscriber ID',
    tn: 'வாடிக்கையாளர் சந்தாதாரர் ஐடியை உள்ளிடவும்',
  },
  customerIdPlaceHolder: {
    en: 'Enter the customer subscriber ID',
    tn: 'வாடிக்கையாளர் சந்தாதாரர் ஐடியை உள்ளிடவும்',
  },
  subscriptionIdError: {
    en: 'Subscription id length is 10',
    tn: 'சந்தா ஐடி நீளம் 10',
  },
  selectCustomerType: {
    en: 'Please Select Customer Type',
    tn: 'வாடிக்கையாளர் வகையைத் தேர்ந்தெடுக்கவும்',
  },
  enterServiceRegion: {
    en: 'Please enter your service region',
    tn: 'உங்கள் சேவைப் பகுதியை உள்ளிடவும்',
  },
  thankyouForSubmission: {
    en: 'Thank you for your submission',
    tn: 'விண்ணப்பம் செய்ததற்கு நன்றி',
  },
  goHome: {
    en: 'Go Home',
    tn: 'வீட்டிற்கு செல்',
  },
  retryText: {
    en: 'Retry',
    tn: 'மீண்டும் முயற்சிக்கவும்',
  },
  yesText: {
    en: 'Yes',
    tn: 'ஆம்',
  },
  noText: {
    en: 'No',
    tn: 'இல்லை',
  },
  selectAuditType: {
    en: 'Select Audit Type',
    tn: 'தணிக்கை வகையைத் தேர்ந்தெடுக்கவும்',
  },
  pleaseWaitText: {
    en: 'Data is being uploaded to the server.Please wait....',
    tn: 'சர்வரில் தரவு பதிவேற்றப்படுகிறது. தயவுசெய்து காத்திருக்கவும்....',
  },
  videoCompressingText: {
    en: 'please wait...',
    tn: 'தயவுசெய்து காத்திருங்கள்...',
  },
};
