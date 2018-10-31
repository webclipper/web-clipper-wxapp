/*eslint "no-unused-vars": ["error", { "varsIgnorePattern": "Taro|minus|goToTheEnd" }],*/
import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';

import { connect } from '@tarojs/redux';
import { add, minus, addAsync } from '../../store/actions/counter';
import { switchTab } from '../../store/actions/router';

import './index.scss';

type PageStateProps = {
  counter: {
    count: number;
  };
};
type PageDispatchProps = {
  add: () => void;
  minus: () => void;
  addAsync: () => void;
  switchTab: (url: string) => void;
};

type PageOwnProps = {};

type PageState = {
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ counter }) => ({
    counter
    }),
  (dispatch) => ({
    add() { dispatch(add()) },
    minus() { dispatch(minus()) },
    addAsync() { dispatch(addAsync()) },
    switchTab(url) { dispatch(switchTab(url)) }
    }))
class Index extends Component<IProps, PageState> {

  config: Config = {
    navigationBarTitleText: '语雀剪藏'
  }

  handleSwitchTab = () => {
    this.props.switchTab('/pages/recent/index');
  }

  render() {
    return (
      <View>
        <View style={{ textAlign: 'center' }}>{this.props.counter.count}</View>
        <Button onClick={this.props.add}>加</Button>
        <Button onClick={this.props.minus}> 减</Button>
        <Button onClick={this.props.addAsync}>异步加</Button>
        <Button onClick={this.handleSwitchTab}>进入主页</Button>
      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
