import {API_FAILURE, API_SUCCESS} from '../../constants';
import API from '../../utils/API';

export const productModel = {
  state: {
    productSubCategories: [],
    productsList: [],
    images: [],
    productDetails: {},
    selectedColor: {},
    selectedSize: {},
  },
  reducers: {
    setProductData: (state, payload) => {
      const {product_categories, products} = payload;

      return {
        ...state,
        productSubCategories: product_categories,
        productsList: products,
      };
    },
    setProductDetails: (state, payload) => {
      return {
        ...state,
        images: payload.gallery_images,
        productDetails: payload,
        selectedColor: payload?.colors[0],
        selectedSize: payload?.colors[0].sizes[0],
      };
    },

    setProductSize: (state, payload) => {
      return {
        ...state,
        selectedSize: payload,
      };
    },
    setProductColor: (state, payload) => {
      return {
        ...state,
        selectedColor: payload,
        selectedSize: payload?.sizes[0],
      };
    },
  },
  effects: (dispatch) => ({
    getProducts: async (requestBody) => {
      try {
        const response = await API.post('/products', requestBody);
        const {
          data: {data = null, message = null, status = null},
        } = response;
        if (status === API_SUCCESS) {
          return data;
          // dispatch.productModel.setProductData(data);
        } else if (status === API_FAILURE) {
          return {products: []};
        }
      } catch (error) {
        console.log(error);
      }
    },
    getSubCategories: async (requestBody) => {
      try {
        const response = await API.post('/productWithCategories', requestBody);
        const {
          data: {data = null, message = null, status = null},
        } = response;
        if (status === API_SUCCESS) {
          return data;
          // dispatch.productModel.setProductData(data);
        } else if (status === API_FAILURE) {
        }
      } catch (error) {
        console.log(error);
      }
    },
    getProductDetails: async (requestBody) => {
      try {
        const response = await API.post('/getProduct', requestBody);
        const {
          data: {data = null, message = null, status = null},
        } = response;
        if (status === API_SUCCESS) {
          dispatch.productModel.setProductDetails(data);
        } else if (status === API_FAILURE) {
          dispatch.alertModel.showFailureAlert({
            contentText: message,
            alertName: undefined,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  }),
};
