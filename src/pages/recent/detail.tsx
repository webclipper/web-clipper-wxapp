/*eslint "no-unused-vars": ["error", { "varsIgnorePattern": "Taro|minus|goToTheEnd" }],*/
/*eslint "taro/this-props-function": 0,*/
import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import './detail.scss';
import {
  fetchDocumentDetailRequest,
  deleteDocumentRequest
} from '../../store/actions/doc';
import { navigateTo } from '../../store/actions/router';
import Markdown from '../../components/markdown';
import { Text, View, Image } from '@tarojs/components';
import { deleteIcon } from '../../static/svg/index';

type PageStateProps = {
  doc: DocStateInterface;
};

type PageDispatchProps = {
  deleteDocumentRequest: (
    { repoId, id }: { repoId: number; id: number }
  ) => void;
  fetchDocumentDetailRequest: (
    { repoId, id }: { repoId: number; id: number }
  ) => void;
  navigateTo: (param: Taro.navigateTo.Param) => void;
};

type PageOwnProps = {};

type PageState = {
  id: number;
  repoId: number;
  showToolBar: boolean;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ doc }) => ({
    doc
    }),
  dispatch => ({
    deleteDocumentRequest({ repoId, id }: { repoId: number; id: number }) {
    dispatch(deleteDocumentRequest({ repoId, id }));
    },
    fetchDocumentDetailRequest({ repoId, id }: { repoId: number; id: number }) {
    dispatch(fetchDocumentDetailRequest({ repoId, id }));
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
    const id = Number.parseInt(this.$router.params.id, 10);
    const repoId = Number.parseInt(this.$router.params.repo_id, 10);
    this.state = {
      id,
      repoId,
      showToolBar: true
    };
  }

  componentDidMount = () => {
    this.props.fetchDocumentDetailRequest({
      id: this.state.id,
      repoId: this.state.repoId
    });
  };

  handleDelete = () => {
    Taro.showModal({
      title: '提示',
      content: '是否要删除本文档'
    }).then(re => {
      if (re.confirm) {
        this.props.deleteDocumentRequest({
          id: this.state.id,
          repoId: this.state.repoId
        });
      }
    });
  };

  onPageScroll = () => {
    this.setState({
      showToolBar: false
    });
  };

  toggleToolBar = () => {
    this.setState({
      showToolBar: !this.state.showToolBar
    });
  };

  render() {
    const data = this.props.doc.docDetailMap[this.state.id];
    return (
      <View className="document-detail">
        <Text className="document-detail_title">{data.title}</Text>
        <View className="document-detail_content" onClick={this.toggleToolBar}>
          <Markdown md={data && data.body.replace(/<a name.*a>/g, '')} />
        </View>
        {this.state.showToolBar && (
          <View className="document-detail-tool">
            <View className="document-detail-tool-icon">
              <Image src={deleteIcon} onClick={this.handleDelete} />
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
