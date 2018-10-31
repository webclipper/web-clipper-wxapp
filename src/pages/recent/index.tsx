import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './index.scss';

class Index extends Component {

  config: Config = {
    navigationBarTitleText: '最新'
  }

  render() {
    return (
      <View>
        <Text>最新</Text>
      </View>
    );
  }
}

export default Index as ComponentClass;