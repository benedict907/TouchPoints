import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import CustomButton from '../../components/common/CustomButton';
import CustomerTypeComponent from '../../components/CustomerTypeComponent';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import QuestionComponent from '../../components/QuestionComponent';
import ServiceRegionComponent from '../../components/ServiceRegionComponent';
import SubscriberComponent from '../../components/SubscriberComponent';
import {API_KEY, screenTypes} from '../../constants';
import {ARROW_BACK} from '../../constants/assets';
import {getLanguage} from '../../localization';
import styles from './styles';
import AuditTypeComponent from '../../components/AuditTypeComponent';
let watchID = '';
const Home = ({
  setCurrentLayout,
  setAppLanguage,
  currentLayout,
  resetData,
  setAddress,
  subscriberId,
  refNumber,
}) => {
  const {
    language,
    serviceRegion,
    subscriber,
    auditType,
    customerType,
    questions,
    thankyouLayout,
  } = screenTypes;

  const getAddress = (latitude, longitude) => {
    Geocoder.from({
      latitude: latitude,
      longitude: longitude,
    })
      .then(json => {
        var location = json.results[0].formatted_address;
        setAddress(location);
      })
      .catch(error => console.warn(error));
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {
          coords: {latitude, longitude},
        } = position;

        getAddress(latitude, longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    watchID = Geolocation.watchPosition(position => {
      const {
        coords: {latitude, longitude},
      } = position;
      getAddress(latitude, longitude);
      // this.setState({ lastPosition });
    });
  };
  useEffect(() => {
    Geocoder.init(API_KEY);
    requestLocationPermission();

    () => Geolocation.clearWatch(watchID);
  }, [setAddress]);

  const onBackPressed = () => {
    switch (currentLayout) {
      case subscriber:
        setCurrentLayout(language);
        break;
      case serviceRegion: //not used
        setCurrentLayout(language);
        break;
      case auditType:
        setCurrentLayout(subscriber);
        break;
      case customerType:
        setCurrentLayout(auditType);
        break;
      case questions:
        setCurrentLayout(customerType);
        break;
      default:
        setCurrentLayout(language);
        break;
    }
  };
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        getLocation();
      } else {
        console.log('location permission denied');
        Alert.alert('', 'Permisison is denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const loadLayout = ({}) => {
    switch (currentLayout) {
      case language:
        return (
          <View style={styles.container}>
            <Text style={styles.headerText}>
              Choose your preffered language
            </Text>
            <CustomButton
              title="English"
              onPress={() => setAppLanguage('en')}
            />
            <CustomButton title="Tamil" onPress={() => setAppLanguage('tn')} />
          </View>
        );
      case serviceRegion:
        return <ServiceRegionComponent />;
      case subscriber:
        return <SubscriberComponent />;
      case customerType:
        return <CustomerTypeComponent />;
      case questions:
        return <QuestionComponent />;
      case auditType:
        return <AuditTypeComponent />;
      case thankyouLayout:
        return (
          <View style={{alignItems: 'center'}}>
            <Text style={styles.headerText}>
              {`${getLanguage(
                'thankyouForSubmission',
              )} ${subscriberId} (${refNumber})`}
            </Text>
            <CustomButton
              title={getLanguage('goHome')}
              onPress={() => {
                setCurrentLayout(language);
                resetData();
              }}
            />
          </View>
        );
      default:
        <View />;
    }
  };
  return (
    <>
      <View style={{backgroundColor: 'black', paddingTop: 10}}>
        {currentLayout === subscriber || currentLayout === serviceRegion ? (
          <TouchableOpacity onPress={() => onBackPressed()}>
            <ARROW_BACK />
          </TouchableOpacity>
        ) : null}
      </View>
      <ScrollView
        style={{flexGrow: 1}}
        contentContainerStyle={[
          styles.mainContainer,
          currentLayout === serviceRegion ? {justifyContent: undefined} : null,
        ]}>
        {loadLayout({currentLayout})}
      </ScrollView>
    </>
  );
};

const mapStateToProps = ({
  homeModel: {currentLayout, appLanguage, subscriberId, refNumber},
}) => ({
  appLanguage,
  subscriberId,
  currentLayout,
  refNumber,
});

const mapDispatchToProps = ({
  homeModel: {setAppLanguage, setCurrentLayout, resetData, setAddress},
}) => ({
  setAppLanguage,
  setCurrentLayout,
  resetData,
  setAddress,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
