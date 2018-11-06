/*eslint "no-unused-vars": ["error", { "varsIgnorePattern": "Taro|minus|goToTheEnd" }],*/
/*eslint "taro/this-props-function": 0,*/
import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import './index.scss';
import { logout } from '../../store/actions/router';
import { View, Button } from '@tarojs/components';
import Avatar from '../../components/avatar';
import { UserStateInterface } from '../../store/reducers/user';
import { refreshUserInfoRequest } from '../../store/actions/user';

type PageStateProps = {
  user: UserStateInterface;
};

type PageDispatchProps = {
  logout: () => void;
  refreshUserInfoRequest: () => void;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ user }) => ({ user }),
  dispatch => ({
    logout() {
    dispatch(logout());
    },
    refreshUserInfoRequest() {
    dispatch(refreshUserInfoRequest());
    }
    })
)
class Index extends Component<IProps, PageState> {
  config: Config = {
    navigationBarTitleText: '语雀剪藏'
  };

  componentDidMount = () => {
    if (!this.props.user.userInfo) {
      this.props.refreshUserInfoRequest();
    }
  };

  logout = () => {
    this.props.logout(); /** eslint--disableline */
  };

  render() {
    return (
      <View className="user-page">
        <View className="user-info">
          <Avatar
            width={100}
            height={100}
            originalImage={this.props.user.userInfo!.avatar_url}
          />
          <View className="text">
            <View>{this.props.user.userInfo!.name}</View>
            <View className="description">
              {this.props.user.userInfo!.description}
            </View>
          </View>
        </View>
        <Button onClick={this.logout} className="logout_button">
          退出
        </Button>
      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
