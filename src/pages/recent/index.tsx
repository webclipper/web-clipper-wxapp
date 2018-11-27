/*eslint "taro/this-props-function": 0,*/
import { ComponentClass } from 'react';
import { bindActionCreators } from 'redux';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {
  initCreatedDocListRequest,
  createdDocumentPulldownRefreshRequest,
  fetchMoreDocRequest
} from '../../store/actions/doc';
import { navigateTo } from '../../store/actions/router';
import DocumentListNode from '../../components/document';
import * as svg from '../../static/svg/index';
import './index.scss';

const mapStateToProps = ({ doc, page }: GlobalStateInterface) => {
  return {
    doc,
    page
  };
};
type PageState = {};
const useActions = {
  navigateTo,
  initCreatedDocListRequest,
  createdDocumentPulldownRefreshRequest,
  fetchMoreDocRequest
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
  config: Config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: '最新',
    backgroundTextStyle: 'dark'
  };

  componentDidMount = () => {
    this.props.initCreatedDocListRequest();
  };

  handleClickNode = documentNode => {
    this.props.navigateTo({
      url: `/pages/recent/detail?id=${documentNode.id}&repo_id=${
        documentNode.book.id
      }`
    });
  };

  onPullDownRefresh = () => {
    this.props.createdDocumentPulldownRefreshRequest();
  };

  onReachBottom = () => {
    const loading = this.props.page.createdDocumentLoadingMore.loading;
    const noMoreDoc = this.props.page.createdDocumentLoadingMore.end;
    if (noMoreDoc || loading) {
      return;
    }
    this.props.fetchMoreDocRequest();
  };

  render() {
    const initStatus = this.props.page.createdDocumentPageInitStatus;
    const empty = this.props.doc.createdDocs.length === 0;
    const loadingMore = this.props.page.createdDocumentLoadingMore.loading;
    const noMoreDoc = this.props.page.createdDocumentLoadingMore.end;
    if (empty && initStatus.loading) {
      const tempArray = new Array(10);
      return (
        <View className="skeleton__page">
          <View>
            {tempArray.map((_, index) => {
              return (
                <View key={index} className="skeleton__node">
                  <View className="skeleton__content title" />
                  <View className="skeleton__content" />
                  <View className="skeleton__content" />
                  <View className="skeleton__content info" />
                </View>
              );
            })}
          </View>
        </View>
      );
    }
    if (empty && initStatus.error) {
      return (
        <View className="info-page">
          <Image src={svg.error} />
          <View>加载错误</View>
        </View>
      );
    }
    if (empty && !initStatus.loading && initStatus.startInit) {
      return (
        <View className="info-page">
          <Image src={svg.empty} />
          <View>还没有文档</View>
        </View>
      );
    }
    return (
      <View>
        {this.props.doc.createdDocs.map(o => {
          return (
            <DocumentListNode
              key={o.id}
              title={o.title}
              bookName={o.book.name}
              description={o.description}
              created_at={o.created_at}
              onclick={this.handleClickNode.bind(this, o)}
            />
          );
        })}
        {loadingMore && <View className="loading-footer">正在加载...</View>}
        {noMoreDoc && <View className="footer">我是有底线的</View>}
      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
