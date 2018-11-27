/*eslint "taro/this-props-function": 0,*/
import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Input, Text } from '@tarojs/components';
import { login, switchTab, scanEnter } from '../../store/actions/router';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';

import './index.scss';

const mapStateToProps = ({ user }: GlobalStateInterface) => {
  return { user };
};
type PageState = {
  token: string;
  q: string;
  inputClassName: string;
};
const useActions = {
  login,
  switchTab,
  scanEnter
};
type PageStateProps = ReturnType<typeof mapStateToProps>;
type PageDispatchProps = typeof useActions;
type PageOwnProps = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
const mapActionToProps = dispatch =>
  bindActionCreators<PageDispatchProps, PageDispatchProps>(
    useActions,
    dispatch
  );
@connect(
  mapStateToProps,
  mapActionToProps
)
class Index extends Component<IProps, PageState> {
  config: Config = { navigationBarTitleText: '语雀剪藏' };

  private inputDefaultClassName = 'login-page__input';
  private inputFocusClassName = 'login-page__input__focus';

  constructor() {
    super();
    this.state = {
      token: '',
      q: '',
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
    this.setState({ inputClassName: this.inputDefaultClassName });
  };
  handleInput = (e: any) => {
    this.setState({ token: e.detail.value });
  };

  handleSwitchTab = () => {
    this.props.login({
      token: this.state.token,
      q: this.state.q
    });
  };

  handleScanQrcode = () => {
    Taro.scanCode({ scanType: ['qrCode'] }).then(result => {
      const scanResult: string = result.result || '';
      console.log(scanResult);
      if (
        scanResult.startsWith('https://yuquewebclipper.diamondyuan.com/pro/')
      ) {
        this.props.scanEnter({ q: scanResult });
        return;
      }
      this.props.login({
        token: scanResult,
        q: this.state.q
      });
    });
  };

  handleReadClipboard = () => {
    Taro.getClipboardData().then(result => {
      this.props.login({
        token: result.data,
        q: this.state.q
      });
    });
  };

  componentDidMount = () => {
    if (this.$router.params.q) {
      const q = decodeURIComponent(this.$router.params.q);
      this.setState(
        { q },
        () => {
          this.props.scanEnter({ q });
        }
      );
    }
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
