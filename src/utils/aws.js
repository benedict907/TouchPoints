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

export const uploadPhoto = async (uri, callback) => {
  if (uri === '') {
    return;
  }

  const {
    homeModel: {subscriberId, credentials},
  } = getState();
  const file = {
    uri: uri,
    name: uri.split('/').pop(),
    type: mime.getType(uri),
  };
  const {
    DO_SPACES_BUCKET,
    DO_SPACES_ENDPOINT,
    DO_SPACES_KEY,
    DO_SPACES_SECRET,
  } = credentials;

  const options = {
    keyPrefix: `${DO_SPACES_BUCKET}/${subscriberId}/`,
    bucket: 's4touchpoint',
    region: 'us-east-1',
    accessKey: DO_SPACES_KEY,
    secretKey: DO_SPACES_SECRET,
    awsUrl: DO_SPACES_ENDPOINT,
    successActionStatus: 201,
  };
  try {
    console.log('awsresss', file);
    const response = await RNS3.put(file, options);
    return response.body.postResponse.location;
  } catch (error) {
    console.log('awseror', error);
    return error;
  }
};
