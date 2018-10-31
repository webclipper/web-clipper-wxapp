import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './index.scss';

class Index extends Component {

  config: Config = {
    navigationBarTitleText: '我的'
  }

  render() {
    return (
      <View>
        <Text>我的</Text>
      </View>
    );
  }
}

export default Index as ComponentClass;