import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dt6k7emcz',
      api_key: '954273843166157',
      api_secret: 'UfYt1PNc3nH_mELsmz6aY54FviU',
    });
  },
};
