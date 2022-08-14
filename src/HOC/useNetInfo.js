import NetInfo from '@react-native-community/netinfo';

const isNetworkAvailable = async () => {
  try {
    const isConnected = await fetch('https://www.google.com/');
    return true;
  } catch (error) {
    return false;
  }
};
export default isNetworkAvailable;
