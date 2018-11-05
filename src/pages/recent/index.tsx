/*eslint "no-unused-vars": ["error", { "varsIgnorePattern": "Taro|minus|goToTheEnd" }],*/
import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import './index.scss';
import { DocStateInterface } from 'src/store/reducers/doc';
import { initCreatedDocListRequest } from '../../store/actions/doc';
import { navigateTo } from '../../store/actions/router';

import DocumentListNode from '../../components/document';

type PageStateProps = {
  doc: DocStateInterface;
};

type PageDispatchProps = {
  initCreatedDocListRequest: () => void;
  navigateTo: (param: Taro.navigateTo.Param) => void;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ doc }) => ({
    doc
    }),
  dispatch => ({
    initCreatedDocListRequest() {
    dispatch(initCreatedDocListRequest());
    },
    navigateTo(param: Taro.navigateTo.Param) {
    dispatch(navigateTo(param));
    }
    })
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
    //Todo 下拉刷新
  };

  render() {
    const empty = this.props.doc.createdDocs.length === 0;
    return (
      <View>
        {empty ? (
          <Text>加载中</Text>
        ) : (
          this.props.doc.createdDocs.map(o => {
            return (
              <DocumentListNode
                key={o.id}
                title={o.title}
                description={o.description}
                created_at={o.created_at}
                onclick={this.handleClickNode.bind(this, o)}
              />
            );
          })
        )}
      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
