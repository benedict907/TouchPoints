/**
 * Fetch from the swapi API
 *
 * @param {string} type
 * @param {string} id
 * @returns {Promise<string>} JSON
 */
import AWS from 'aws-sdk';
import {getState} from '../redux';
import mime from 'mime';

export const uploadPhoto = async uri => {
  if (uri === '') {
    return;
  }
  const file = {
    uri: uri,
    name: uri.split('/').pop(),
    type: mime.getType(uri),
  };
  const {
    homeModel: {subscriberId},
  } = getState();

  const s3Client = new AWS.S3({
    endpoint: 'https://sgp1.digitaloceanspaces.com',
    region: 'sgp1',
    credentials: {
      accessKeyId: 'U7Y76LQLLELZKCCDYG7X',
      secretAccessKey: 'Fx1Mh0k1zwi5N44qQtBnqmvtUIbUUVqeOk44n2G7Vq8',
    },
  });
  try {
    fetch(uri)
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        s3Client.putObject(
          {
            Bucket: `s4touchpoint/S4touchpoint/${subscriberId}`,
            Key: file.name,
            Body: blob,
            ACL: 'public-read',
          },
          async res => {
            console.log('done', res);
            return uri.split('/').pop();
          },
        );
        // here the image is a blob
      })
      .catch(err => {
        console.log('bloberror', err);
      });

    //    })
    //.catch(err => doSomethingWith(err));
  } catch (err) {
    console.log('error', err);
  }
};
