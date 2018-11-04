import Taro, { Component, Config } from '@tarojs/taro';
import '@tarojs/async-await';
import { Provider } from '@tarojs/redux';

import Index from './pages/recent';

import configStore from './store';

import './app.scss';

const store = configStore();

class App extends Component {
  config: Config = {
    pages: [
      'pages/recent/index',
      'pages/index/index',
      'pages/recent/detail',
      'pages/user/index'
    ],
    tabBar: {
      selectedColor: '#70CB90',
      borderStyle: 'white',
      backgroundColor: '#fff',
      list: [
        {
          selectedIconPath: 'static/icon-news-select.png',
          iconPath: 'static/icon-news.png',
          pagePath: 'pages/recent/index',
          text: '最新'
        },
        {
          selectedIconPath: 'static/icon-user-select.png',
          iconPath: 'static/icon-user.png',
          pagePath: 'pages/user/index',
          text: '我的'
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  };

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
