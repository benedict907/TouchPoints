import {
  QUESTION_1_1,
  QUESTION_1_2,
  QUESTION_1_3,
  QUESTION_1_4,
  QUESTION_1_5,
  QUESTION_1_6,
  QUESTION_1_7,
  QUESTION_3_1,
  QUESTION_3_10,
  QUESTION_3_11,
  QUESTION_3_12,
  QUESTION_3_13,
  QUESTION_3_2,
  QUESTION_3_3,
  QUESTION_3_4,
  QUESTION_3_5,
  QUESTION_3_6,
  QUESTION_3_7,
  QUESTION_3_8,
  QUESTION_3_9,
  QUESTION_SUB_1,
  QUESTION_SUB_2,
  QUESTION_SUB_3,
  QUESTION_SUB_4,
  QUESTION_SUB_5,
} from '../constants/assets';

export const REFERENCE_WINDOW_DIMENSIONS = {height: 667, width: 375};
export const API_FAILURE = '0';
export const CURRENCY_INDIAN = '₹';
export const CURRENCY_UAE = 'AED';
export const API_KEY = 'AIzaSyDUGE5N3XI-Vx2tH1n39XFw2fvI9JR-vjg';
export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const profileList = [
  {
    index: 1,
    title: 'Logout',
  },
  {
    index: 2,
    title: 'My Orders',
  },
  {
    index: 3,
    title: 'Terms and Conditions',
  },
];

export const BUTTON_PRESS_DELAY = 200;

export const LOGIN_SCREEN = 'LOGIN_SCREEN';
export const HOME_STACK = 'HOME';
export const SUBSCRIBER_ID_SCREEN = 'SUBSCRIBER_ID_SCREEN';
export const IMAGE_PREVIEW_SCREEN = 'IMAGE_PREVIEW_SCREEN';
export const screenTypes = {
  language: 'LANGUAGE_SCREEN',
  serviceRegion: 'SERVICE_REGION',
  subscriber: 'SUBSCRIBER_ID_SCREEN',
  customerType: 'CUSTOMER_TYPE_SCREEN',
  questions: 'QUESTIONS_SCREEN',
  thankyouLayout: 'THANK_YOU',
};
export const API_URL = 'https://dev.s4touchpoints.com/api';

export const LanguageConstants = {en: 'English', tn: 'Tamil'};
export const API_SUCCESS = 200;

export const mduQuestions = [
  {
    id: 1,
    questionHeader: 'Please Capture The Photo Of Switch End 2mm',
    questionHeaderTamil: 'ஸ்விட்ச் என்ட் 2mm போட்டோவை ஷேர் செய்யவும்',
    image: QUESTION_1_1,
    capturedImage: '',
  },
  {
    id: 2,
    questionHeader: 'Please Capture The Photo Of Switch End Post',
    questionHeaderTamil:
      'ஸ்விட்ச் என்ட் போஸ்ட்(STB POST) போட்டோவை ஷேர் செய்யவும்',
    image: QUESTION_1_2,
    capturedImage: '',
  },
  {
    id: 3,
    questionHeader: 'Please Capture The Photo Of Switch End Tightening',
    questionHeaderTamil: 'ஸ்விட்ச் என்ட் டயிட்னஸ்  போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_1_3,
    capturedImage: '',
  },
  {
    id: 4,
    questionHeader: 'Please capture the photo of STB End Post',
    questionHeaderTamil:
      'செட் டாப் பாக்ஸ்  என்ட் போஸ்ட்(STB POST)   போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_1_4,
    capturedImage: '',
  },
  {
    id: 5,
    questionHeader: 'Please capture the photo of STB End 2mm',
    questionHeaderTamil: 'செட் டாப் பாக்ஸ்  என்ட் 2MM   போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_1_5,
    capturedImage: '',
  },
  {
    id: 6,
    questionHeader: 'Please capture the photo of STB End Tightening',
    questionHeaderTamil:
      'செட் டாப் பாக்ஸ்  என்ட்  டயிட்னஸ் போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_1_6,
    capturedImage: '',
  },
  {
    id: 7,
    questionHeader: 'Please capture the photo of Remote Pairing',
    questionHeaderTamil: 'ரிமோட் பேரிங்க் போட்டோவை ஷேர் செய்யவும்',
    image: QUESTION_1_7, // change image
    capturedImage: '',
  },
  {
    id: 8,
    questionHeader: 'Additional connector has been used?',
    questionHeaderTamil: 'கூடுதல் கனெக்ட்டர்  பயன்படுத்தப்பட்டதா?',
    image: '',
    capturedImage: '',
    isQuestion: true,
  },
];

export const oduQuestions = [
  {
    id: 1,
    questionHeader: 'Please Capture The Photo Of Mast X Axis',
    questionHeaderTamil: 'மாஸ்ட் X- ஆக்ஸிஸ்  போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_1,
    capturedImage: '',
  },
  {
    id: 2,
    questionHeader: 'Please Capture The Photo Of Mast Y Axis',
    questionHeaderTamil: 'மாஸ்ட் Y- ஆக்ஸிஸ்  போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_2,
    capturedImage: '',
  },
  {
    id: 3,
    questionHeader:
      'Please Capture The Photo Of Signal Peaking – GSAT30 / TP20 / 11510/H/32720',
    questionHeaderTamil:
      'சிக்னல் பீக்கிங் GSAT30 / TP20 / 11510/H/32720 போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_3,
    capturedImage: '',
  },
  {
    id: 4,
    questionHeader:
      'Please Capture The Photo Of Signal Peaking – P & C/N (MER)',
    questionHeaderTamil:
      'சிக்னல் பீக்கிங் P & C/N (MER) போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_4,
    capturedImage: '',
  },
  {
    id: 5,
    questionHeader: 'Please Capture The Photo Of Connector At LNBF- Post',
    questionHeaderTamil: 'LNBF என்ட் 2mm போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_5,
    capturedImage: '',
  },
  {
    id: 6,
    questionHeader: 'Please Capture The Photo Of Connector At LNBF – 2mm',
    questionHeaderTamil: 'LNBF என்ட் போஸ்ட்(STB POST) போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_6,
    capturedImage: '',
  },
  {
    id: 7,
    questionHeader: 'Please Capture The Photo Of Tightness At LNBF',
    questionHeaderTamil: 'LNBF என்ட் டயிட்னஸ்  போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_7,
    capturedImage: '',
  },
  {
    id: 8,
    questionHeader: 'Please Capture The Photo Of SKEW Angle',
    questionHeaderTamil: 'ஸ்கிவ் ஆங்கிள் போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_8,
    capturedImage: '',
  },
  {
    id: 9,
    questionHeader: 'Please Capture The Photo Of Dish Marking',
    questionHeaderTamil: 'டிஷ் மார்க்கிங் போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_9,
    capturedImage: '',
  },
  {
    id: 10,
    questionHeader: 'Please Capture The Photo Of Connector At STB – Post',
    questionHeaderTamil:
      'செட் டாப் பாக்ஸ்  என்ட் போஸ்ட்(STB POST)   போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_10,
    capturedImage: '',
  },
  {
    id: 11,
    questionHeader: 'Please Capture The Photo Of Connector At STB – 2mm',
    questionHeaderTamil: 'செட் டாப் பாக்ஸ்  என்ட் 2MM   போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_11,
    capturedImage: '',
  },
  {
    id: 12,
    questionHeader: 'Please Capture The Photo Of Tightness At STB',
    questionHeaderTamil:
      'செட் டாப் பாக்ஸ்  என்ட்  டயிட்னஸ் போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_12,
    capturedImage: '',
  },
  {
    id: 13,
    questionHeader: 'Please Capture The Photo Of Remote Pairing',
    questionHeaderTamil: 'ரிமோட் பேரிங்க் போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_13,
    capturedImage: '',
  },
  {
    id: 14,
    questionHeader: 'Additional connector has been used?',
    questionHeaderTamil: 'கூடுதல் கனெக்ட்டர்  பயன்படுத்தப்பட்டதா?',
    image: '',
    capturedImage: '',
    isQuestion: true,
  },
];

export const nonOduQuestions = [
  {
    id: 1,
    questionHeader: 'Please Capture The Photo Of Mast X Axis',
    questionHeaderTamil: 'மாஸ்ட் X- ஆக்ஸிஸ்  போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_1,
    capturedImage: '',
  },
  {
    id: 2,
    questionHeader: 'Please Capture The Photo Of Mast Y Axis',
    questionHeaderTamil: 'மாஸ்ட் Y- ஆக்ஸிஸ்  போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_2,
    capturedImage: '',
  },
  {
    id: 3,
    questionHeader:
      'Please Capture The Photo Of Signal Peaking – GSAT30 / TP20 / 11510/H/32720',
    questionHeaderTamil:
      'சிக்னல் பீக்கிங் GSAT30 / TP20 / 11510/H/32720 போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_3,
    capturedImage: '',
  },
  {
    id: 4,
    questionHeader:
      'Please Capture The Photo Of Signal Peaking – P & C/N (MER)',
    questionHeaderTamil:
      'சிக்னல் பீக்கிங் P & C/N (MER) போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_4,
    capturedImage: '',
  },
  {
    id: 5,
    questionHeader: 'Please Capture The Photo Of Connector At LNBF- Post',
    questionHeaderTamil: 'LNBF என்ட் 2mm போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_5,
    capturedImage: '',
  },
  {
    id: 6,
    questionHeader: 'Please Capture The Photo Of Connector At LNBF – 2mm',
    questionHeaderTamil: 'LNBF என்ட் போஸ்ட்(STB POST) போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_6,
    capturedImage: '',
  },
  {
    id: 7,
    questionHeader: 'Please Capture The Photo Of Tightness At LNBF',
    questionHeaderTamil: 'LNBF என்ட் டயிட்னஸ்  போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_7,
    capturedImage: '',
  },
  {
    id: 8,
    questionHeader: 'Please Capture The Photo Of SKEW Angle',
    questionHeaderTamil: 'ஸ்கிவ் ஆங்கிள் போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_8,
    capturedImage: '',
  },
  {
    id: 9,
    questionHeader: 'Please Capture The Photo Of Dish Marking',
    questionHeaderTamil: 'டிஷ் மார்க்கிங் போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_9,
    capturedImage: '',
  },
  {
    id: 10,
    questionHeader: 'Please Capture The Photo Of Connector At STB – Post',
    questionHeaderTamil:
      'செட் டாப் பாக்ஸ்  என்ட் போஸ்ட்(STB POST)   போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_10,
    capturedImage: '',
  },
  {
    id: 11,
    questionHeader: 'Please Capture The Photo Of Connector At STB – 2mm',
    questionHeaderTamil: 'செட் டாப் பாக்ஸ்  என்ட் 2MM   போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_11,
    capturedImage: '',
  },
  {
    id: 12,
    questionHeader: 'Please Capture The Photo Of Tightness At STB',
    questionHeaderTamil:
      'செட் டாப் பாக்ஸ்  என்ட்  டயிட்னஸ் போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_12,
    capturedImage: '',
  },
  {
    id: 13,
    questionHeader: 'Please Capture The Photo Of Remote Pairing',
    questionHeaderTamil: 'ரிமோட் பேரிங்க் போட்டோவை ஷேர் செய்யவும',
    image: QUESTION_3_13,
    capturedImage: '',
  },
  {
    id: 14,
    questionHeader: 'Additional connector has been used?',
    questionHeaderTamil: 'கூடுதல் கனெக்ட்டர்  பயன்படுத்தப்பட்டதா?',
    image: QUESTION_3_1,
    capturedImage: '',
    isQuestion: true,
  },
];

export const subQuestions = [
  {
    id: 1,
    questionHeader:
      'Please capture the photo of additional connector 1 ENDPOST',
    questionHeaderTamil:
      'அடிஷ்னல் கனெக்ட்டர் 1 என்ட் போஸ்ட் போட்டோவை ஷேர் செய்யவும்',
    image: QUESTION_SUB_1,
    capturedImage: '',
    isSubQuestion: true,
  },
  {
    id: 2,
    questionHeader:
      'Please capture the photo of additional connector 1 END 2mm',
    questionHeaderTamil:
      'அடிஷ்னல் கனெக்ட்டர் 1 என்ட் 2mm போட்டோவை ஷேர் செய்யவும்',
    image: QUESTION_SUB_2,
    capturedImage: '',
    isSubQuestion: true,
  },
  {
    id: 3,
    questionHeader:
      'Please capture the photo of additional connector 2 END POST',
    questionHeaderTamil:
      'அடிஷ்னல் கனெக்ட்டர் 2 என்ட்  போஸ்ட் போட்டோவை ஷேர் செய்யவும்',
    image: QUESTION_SUB_3,
    capturedImage: '',
    isSubQuestion: true,
  },
  {
    id: 4,
    questionHeader:
      'Please capture the photo of additional connector 2 END 2mm',
    questionHeaderTamil:
      'அடிஷ்னல் கனெக்ட்டர் 2 என்ட்  2mm போட்டோவை ஷேர் செய்யவும்',
    image: QUESTION_SUB_4,
    capturedImage: '',
    isSubQuestion: true,
  },
  {
    id: 5,
    questionHeader:
      'Please capture the photo of additional connector 1&2 Tightness',
    questionHeaderTamil:
      'அடிஷ்னல் கனெக்ட்டர் 1&2 டயிட்னஸ் போட்டோவை ஷேர் செய்யவும்',
    image: QUESTION_SUB_5,
    capturedImage: '',
    isSubQuestion: true,
  },
];

export const opacityTypes = {
  100: 'FF',
  99: 'FC',
  98: 'FA',
  97: 'F7',
  96: 'F5',
  95: 'F2',
  94: 'F0',
  93: 'ED',
  92: 'EB',
  91: 'E8',
  90: 'E6',
  89: 'E3',
  88: 'E0',
  87: 'DE',
  86: 'DB',
  85: 'D9',
  84: 'D6',
  83: 'D4',
  82: 'D1',
  81: 'CF',
  80: 'CC',
  79: 'C9',
  78: 'C7',
  77: 'C4',
  76: 'C2',
  75: 'BF',
  74: 'BD',
  73: 'BA',
  72: 'B8',
  71: 'B5',
  70: 'B3',
  69: 'B0',
  68: 'AD',
  67: 'AB',
  66: 'A8',
  65: 'A6',
  64: 'A3',
  63: 'A1',
  62: '9E',
  61: '9C',
  60: '99',
  59: '96',
  58: '94',
  57: '91',
  56: '8F',
  55: '8C',
  54: '8A',
  53: '87',
  52: '85',
  51: '82',
  50: '80',
  49: '7D',
  48: '7A',
  47: '78',
  46: '75',
  45: '73',
  44: '70',
  43: '6E',
  42: '6B',
  41: '69',
  40: '66',
  39: '63',
  38: '61',
  37: '5E',
  36: '5C',
  35: '59',
  34: '57',
  33: '54',
  32: '52',
  31: '4F',
  30: '4D',
  29: '4A',
  28: '47',
  27: '45',
  26: '42',
  25: '40',
  24: '3D',
  23: '3B',
  22: '38',
  21: '36',
  20: '33',
  19: '30',
  18: '2E',
  17: '2B',
  16: '29',
  15: '26',
  14: '24',
  13: '21',
  12: '1F',
  11: '1C',
  10: '1A',
  9: '17',
  8: '14',
  7: '12',
  6: '0F',
  5: '0D',
  4: '0A',
  3: '08',
  2: '05',
  1: '03',
  0: '00',
};
