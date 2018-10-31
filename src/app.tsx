import Taro, { Component, Config } from '@tarojs/taro';
import '@tarojs/async-await';
import { Provider } from '@tarojs/redux';

import Index from './pages/index';

import configStore from './store';

import './app.scss';

const store = configStore();

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/repo/index',
      'pages/user/index',
      'pages/recent/index'
    ],
    tabBar: {
      selectedColor: '#70CB90',
      borderStyle: 'white',
      backgroundColor: '#fff',
      list: [{
        selectedIconPath: 'static/icon-news-select.png',
        iconPath: 'static/icon-news.png',
        pagePath: 'pages/recent/index',
        text: '最新'
      },
      {
        selectedIconPath: 'static/icon-books-select.png',
        iconPath: 'static/icon-books.png',
        pagePath: 'pages/repo/index',
        text: '文件夹'
      },
      {
        selectedIconPath: 'static/icon-user-select.png',
        iconPath: 'static/icon-user.png',
        pagePath: 'pages/user/index',
        text: '我的'
      }]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
