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
let watchID = '';
const Home = ({
  setCurrentLayout,
  setAppLanguage,
  currentLayout,
  getServiceRegions,
  resetData,
  setAddress,
}) => {
  const {
    language,
    serviceRegion,
    subscriber,
    customerType,
    questions,
    thankyouLayout,
  } = screenTypes;

  useEffect(() => {
    // console.log('sdfsdf', getConvertedDate(new Date()));
    getServiceRegions();
  }, [getServiceRegions]);

  const getAddress = (latitude, longitude) => {
    Geocoder.from({
      latitude: latitude,
      longitude: longitude,
    })
      .then(json => {
        var location = json.results[0].formatted_address;
        setAddress(location);
        console.log('locationnnn', location);
        // Alert.alert('sdf', location);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAddress]);

  const onBackPressed = () => {
    switch (currentLayout) {
      case subscriber:
        setCurrentLayout(serviceRegion);
        break;
      case serviceRegion:
        setCurrentLayout(language);
        break;
      case customerType:
        setCurrentLayout(subscriber);
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
      case thankyouLayout:
        return (
          <View style={{alignItems: 'center'}}>
            <Text style={styles.headerText}>
              {getLanguage('thankyouForSubmission')}
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
  homeModel: {currentLayout, appLanguage, subscriberId},
}) => ({
  appLanguage,
  subscriberId,
  currentLayout,
});

const mapDispatchToProps = ({
  homeModel: {
    setAppLanguage,
    setCurrentLayout,
    getServiceRegions,
    resetData,
    setAddress,
  },
}) => ({
  setAppLanguage,
  setCurrentLayout,
  getServiceRegions,
  resetData,
  setAddress,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
