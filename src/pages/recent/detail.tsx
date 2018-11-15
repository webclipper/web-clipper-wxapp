/*eslint "no-unused-vars": ["error", { "varsIgnorePattern": "Taro|minus|goToTheEnd" }],*/
/*eslint "taro/this-props-function": 0,*/
import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import './detail.scss';
import { fetchDocumentDetailRequest } from '../../store/actions/doc';
import { navigateTo } from '../../store/actions/router';
import Markdown from '../../components/markdown';
import { Text, View } from '@tarojs/components';

type PageStateProps = {
  doc: DocStateInterface;
};

type PageDispatchProps = {
  fetchDocumentDetailRequest: (redpId: number, id: number) => void;
  navigateTo: (param: Taro.navigateTo.Param) => void;
};

type PageOwnProps = {};

type PageState = {
  id: number;
  repoId: number;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ doc }) => ({
    doc
    }),
  dispatch => ({
    fetchDocumentDetailRequest(redpId: number, id: number) {
    dispatch(fetchDocumentDetailRequest(redpId, id));
    },
    navigateTo(param: Taro.navigateTo.Param) {
    dispatch(navigateTo(param));
    }
    })
)
class Index extends Component<IProps, PageState> {
  config: Config = {
    navigationBarTitleText: '语雀剪藏'
  };
  constructor() {
    super();
    const id = this.$router.params.id;
    const repoId = this.$router.params.repo_id;
    this.state = {
      id,
      repoId
    };
  }

  componentDidMount = () => {
    this.props.fetchDocumentDetailRequest(this.state.repoId, this.state.id);
  };

  render() {
    const data = this.props.doc.docDetailMap[this.state.id];
    return (
      <View className="document-detail">
        <Text className="document-detail_title">{data.title}</Text>
        <View className="document-detail_content">
          <Markdown md={data && data.body.replace(/<a name.*a>/g, '')} />
        </View>
      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
