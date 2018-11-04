/*eslint "no-unused-vars": ["error", { "varsIgnorePattern": "Taro|minus|goToTheEnd" }],*/
import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Input } from '@tarojs/components';
import { login, switchTab } from '../../store/actions/router';
import { connect } from '@tarojs/redux';

import './index.scss';

type PageStateProps = {
  counter: {
    count: number;
  };
};
type PageDispatchProps = {
  switchTab: (url: string) => void;
  login: (token: string) => void;
};

type PageOwnProps = {};

type PageState = {
  token: string;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ counter }) => ({
    counter
    }),
  dispatch => ({
    login(token) {
    dispatch(login(token));
    },
    switchTab(url) {
    dispatch(switchTab(url));
    }
    })
)
class Index extends Component<IProps, PageState> {
  config: Config = {
    navigationBarTitleText: '语雀剪藏'
  };

  constructor() {
    super();
    this.state = {
      token: ''
    };
  }

  handleInput = (e: any) => {
    this.setState({
      token: e.detail.value
    });
  };

  handleSwitchTab = () => {
    this.props.login(this.state.token);
  };

  render() {
    return (
      <View>
        <Input placeholder="请输入token" onInput={this.handleInput} />
        <Button onClick={this.handleSwitchTab}>进入主页</Button>
      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
