/*eslint "no-unused-vars": ["error", { "varsIgnorePattern": "Taro|minus|goToTheEnd" }],*/
/*eslint "taro/this-props-function": 0,*/
import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Input, Text } from '@tarojs/components';
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
  inputClassName: string;
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

  private inputDefaultClassName = 'login-page__input';
  private inputFocusClassName = 'login-page__input__focus';

  constructor() {
    super();
    this.state = {
      token: '',
      inputClassName: this.inputDefaultClassName
    };
  }

  handleInputFocus = () => {
    this.setState({
      inputClassName: `${this.inputDefaultClassName} ${
        this.inputFocusClassName
      }`
    });
  };
  handleInputBlur = () => {
    this.setState({
      inputClassName: this.inputDefaultClassName
    });
  };

  handleInput = (e: any) => {
    this.setState({
      token: e.detail.value
    });
  };

  handleSwitchTab = () => {
    this.props.login(this.state.token);
  };
  handleScanQrcode = () => {
    Taro.scanCode({
      scanType: ['qrCode']
    }).then(result => {
      this.props.login(result.result);
    });
  };
  handleReadClipboard = () => {
    Taro.getClipboardData().then(result => {
      this.props.login(result.data);
    });
  };

  render() {
    return (
      <View className="login-page">
        <View className="login-page__slogon">
          <View className="login-page__slogon-main">欢迎使用语雀剪藏</View>
          <View className="login-page__slogon-subhead">不错过每一份精彩</View>
        </View>
        <Input
          onBlur={this.handleInputBlur}
          onClick={this.handleInputFocus}
          placeholder="请输入 Token"
          onInput={this.handleInput}
          className={this.state.inputClassName}
        />
        <Button onClick={this.handleSwitchTab} className="login-page__button">
          登录
        </Button>
        <View className="login-page__other-tool-box">
          <Text onClick={this.handleReadClipboard}>读取剪切板</Text>
          <Text onClick={this.handleScanQrcode}>扫描二维码</Text>
        </View>
      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
