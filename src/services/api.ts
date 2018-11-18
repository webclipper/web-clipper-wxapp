import Taro from '@tarojs/taro';
import AuthService from './authService';

const requsetWithToken = async (param: Taro.request.Param<any> | string) => {
  const host = 'https://www.yuque.com/api/v2/';
  const token = AuthService.get();
  if (!token) {
    AuthService.logout();
  }
  let requestParam;
  if (typeof param === 'string') {
    requestParam = {
      header: {
        'X-Auth-Token': token
      },
      url: `${host}${param}`
    };
  } else {
    requestParam = Object.assign(param, {
      url: `${host}${param.url}`,
      header: {
        'X-Auth-Token': token
      }
    });
  }
  try {
    const result = await Taro.request(requestParam);
    if (result.statusCode === 200) {
      return result.data;
    }
    if (result.statusCode === 401) {
      AuthService.logout();
    }
    throw result;
  } catch (error) {
    throw error;
  }
};

const getUserDocs = ({
  offset
}: {
offset: number;
}): Promise<Taro.request.Promised<DocSerializer>> => {
  return requsetWithToken(`user/docs?offset=${offset}`);
};

const getUser = (): Promise<Taro.request.Promised<UserDetailSerializer>> => {
  return requsetWithToken('user');
};

const getDocDetail = (
  repoId: number,
  docuemntId: number
): Promise<Taro.request.Promised<any>> => {
  return requsetWithToken(`repos/${repoId}/docs/${docuemntId}?raw=1`);
};

const deleteDocument = (repoId: number, docuemntId: number): Promise<void> => {
  return requsetWithToken({
    method: 'DELETE',
    url: `repos/${repoId}/docs/${docuemntId}`
  });
};

export { getUserDocs, getUser, getDocDetail, deleteDocument };
