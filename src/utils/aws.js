/**
 * Fetch from the swapi API
 *
 * @param {string} type
 * @param {string} id
 * @returns {Promise<string>} JSON
 */

import {getState} from '../redux';
import mime from 'mime';
import {RNS3} from 'react-native-aws3';

export const uploadPhoto = async uri => {
  if (uri === '') {
    return;
  }

  // const {
  //   homeModel: {subscriberId, credentials},
  // } = getState();
  const file = {
    uri: uri,
    name: uri.split('/').pop(),
    type: mime.getType(uri),
  };

  return file;
  // const {
  //   DO_SPACES_BUCKET,
  //   DO_SPACES_ENDPOINT,
  //   DO_SPACES_KEY,
  //   DO_SPACES_SECRET,
  // } = credentials;

  // // {"data": {"DO_SPACES_BUCKET": "S4touchpoint", "DO_SPACES_ENDPOINT": "https://s4touchpoint.sgp1.digitaloceanspaces.com", "DO_SPACES_KEY": "U7Y76LQLLELZKCCDYG7X", "DO_SPACES_REGION": "sgp1", "DO_SPACES_SECRET": "Fx1Mh0k1zwi5N44qQtBnqmvtUIbUUVqeOk44n2G7Vq8", "OFF_LINE_SUBSCRIPTION": false}, "errors": [], "response_code": 1}

  // const options = {
  //   keyPrefix: `${DO_SPACES_BUCKET}/${subscriberId}/`,
  //   bucket: 's4touchpoint',
  //   region: 'us-east-1',
  //   accessKey: DO_SPACES_KEY,
  //   secretKey: DO_SPACES_SECRET,
  //   awsUrl: DO_SPACES_ENDPOINT,
  //   successActionStatus: 201,
  // };
  // try {
  //   const response = await RNS3.put(file, options);
  //   console.log('awsresss', response);
  //   return response.body.postResponse.location;
  // } catch (error) {
  //   console.log('awseror', error);
  //   return error;
  // }
};
