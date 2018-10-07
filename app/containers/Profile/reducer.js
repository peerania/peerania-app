/*
 *
 * Profile reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_PROFILE_INFORMATION,
  GET_PROFILE_INFORMATION_SUCCESS,
  GET_PROFILE_INFORMATION_ERROR,
  UPLOAD_IMAGE_FILE,
  UPLOAD_IMAGE_FILE_SUCCESS,
  UPLOAD_IMAGE_FILE_ERROR,
  CANCEL_IMAGE_CHANGES,
  SAVE_IMAGE_CHANGES,
  SAVE_PROFILE_ACTION,
  SAVE_PROFILE_ACTION_SUCCESS,
  SAVE_PROFILE_ACTION_ERROR,
  GET_LOCATION_LIST,
  GET_LOCATION_LIST_SUCCESS,
  GET_LOCATION_LIST_ERROR,
  LOCATION_FIELD,
  CHOICE_CITY_ACTION,
} from './constants';

export const initialState = fromJS({
  loadingProfile: false,
  loadingImage: false,
  loadingSaveProfile: false,
  loadingGetCitiesList: false,
  errorLoadProfile: '',
  errorUploadImage: '',
  errorSaveProfile: '',
  errorCitiesList: '',
  profile: {},
  userKey: '',
  locationSearch: '',
  blob: '',
  citiesList: [],
  cashedProfileImg: '',
  editingImgState: true,
});

function profileReducer(state = initialState, action) {
  const {
    type,
    profile,
    errorLoadProfile,
    errorUploadImage,
    errorSaveProfile,
    errorCitiesList,
    locationSearch,
    cityId,
    city,
    userKey,
    blob,
    citiesList,
    cashedProfileImg,
  } = action;

  switch (type) {
    case GET_PROFILE_INFORMATION:
      return state.set('loadingProfile', true).set('userKey', userKey);
    case GET_PROFILE_INFORMATION_SUCCESS:
      return state.set('loadingProfile', false).set('profile', profile);
    case GET_PROFILE_INFORMATION_ERROR:
      return state
        .set('loadingProfile', false)
        .set('errorLoadProfile', errorLoadProfile);
    case UPLOAD_IMAGE_FILE:
      return state.set('loadingImage', true);
    case UPLOAD_IMAGE_FILE_SUCCESS:
      return state
        .set('loadingImage', false)
        .set('editingImgState', false)
        .set('cashedProfileImg', cashedProfileImg);
    case UPLOAD_IMAGE_FILE_ERROR:
      return state
        .set('loadingImage', false)
        .set('errorUploadImage', errorUploadImage);
    case CANCEL_IMAGE_CHANGES:
      return state.set('editingImgState', true).set('cashedProfileImg', '');
    case SAVE_IMAGE_CHANGES:
      return state
        .set('editingImgState', true)
        .set('cashedProfileImg', cashedProfileImg)
        .set('blob', blob)
        .set('profile', {
          ...state.get('profile'),
          savedProfileImg: cashedProfileImg,
        });
    case SAVE_PROFILE_ACTION:
      return state.set('loadingSaveProfile', true);
    case SAVE_PROFILE_ACTION_SUCCESS:
      return state.set('loadingSaveProfile', false);
    case SAVE_PROFILE_ACTION_ERROR:
      return state
        .set('errorSaveProfile', errorSaveProfile)
        .set('loadingSaveProfile', false);
    case GET_LOCATION_LIST:
      return state.set('locationSearch', locationSearch).set('profile', {
        ...state.get('profile'),
        ipfs: {
          ...state.get('profile').ipfs,
          [LOCATION_FIELD]: {
            name: locationSearch,
          },
        },
      });
    case GET_LOCATION_LIST_SUCCESS:
      return state
        .set('citiesList', citiesList)
        .set('loadingGetCitiesList', false);
    case GET_LOCATION_LIST_ERROR:
      return state
        .set('loadingGetCitiesList', false)
        .set('errorCitiesList', errorCitiesList);
    case CHOICE_CITY_ACTION:
      return state.set('profile', {
        ...state.get('profile'),
        ipfs: {
          ...state.get('profile').ipfs,
          [LOCATION_FIELD]: {
            id: cityId,
            name: city,
          },
        },
      });
    default:
      return state;
  }
}

export default profileReducer;
