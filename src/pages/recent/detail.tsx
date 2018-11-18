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
import { navigateTo, detailRouterBack } from '../../store/actions/router';
import { Text, View, Image } from '@tarojs/components';
import {
  deleteIcon,
  back,
  notFound,
  networkError
} from '../../static/svg/index';

type PageStateProps = {
  doc: DocStateInterface;
  page: PageStateInterface;
};

type PageDispatchProps = {
  detailRouterBack: () => void;
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
  ({ doc, page }) => ({
    doc,
    page
    }),
  dispatch => ({
    deleteDocumentRequest({ repoId, id }: { repoId: number; id: number }) {
    dispatch(deleteDocumentRequest({ repoId, id }));
    },
    detailRouterBack() {
    dispatch(detailRouterBack());
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
    navigationBarTitleText: '语雀剪藏',
    usingComponents: {
      wemark: '../../components/wemark/wemark'
    }
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

  handlePageBack = () => {
    this.props.detailRouterBack();
  };

  toggleToolBar = () => {
    this.setState({
      showToolBar: !this.state.showToolBar
    });
  };

  render() {
    const data = this.props.doc.docDetailMap[this.state.id];
    const loading = this.props.page.documentDetailInit.loading;
    const error = this.props.page.documentDetailInit.error;

    if (error && error.statusCode === 404) {
      return (
        <View className="document-detail__error">
          <Image src={notFound} />
          <View onClick={this.handlePageBack}>返回文档列表</View>
        </View>
      );
    }
    if (error) {
      return (
        <View className="document-detail__error">
          <Image src={networkError} />
          <View style={{ color: 'black', marginBottom: '10px' }}>
            获取文档失败
          </View>
          <View onClick={this.handlePageBack}>返回文档列表</View>
        </View>
      );
    }
    return (
      <View className="document-detail">
        <Text className="document-detail_title">{data.data.title}</Text>
        <View className="document-detail_content" onClick={this.toggleToolBar}>
          <wemark md={data.data.body} link highlight type="wemark" />
        </View>
        {this.state.showToolBar && !loading && (
          <View className="document-detail-tool">
            <View className="document-detail-tool-icon">
              <Image src={back} onClick={this.handlePageBack} />
            </View>
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
