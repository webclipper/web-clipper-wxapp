/*eslint "taro/this-props-function": 0,*/
import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import './index.scss';
import { bindActionCreators } from 'redux';
import { logout } from '../../store/actions/router';
import { View, Button } from '@tarojs/components';
import Avatar from '../../components/avatar';
import { refreshUserInfoRequest } from '../../store/actions/user';

const useActions = { refreshUserInfoRequest, logout };

const mapStateToProps = ({ user }: GlobalStateInterface) => {
  return { user };
};
type PageState = {
  id: number;
  repoId: number;
  showToolBar: boolean;
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

  componentDidMount = () => {
    if (!this.props.user.userInfo) {
      this.props.refreshUserInfoRequest();
    }
  };

  logout = () => {
    this.props.logout();
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
