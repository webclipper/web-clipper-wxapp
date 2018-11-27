/*eslint "taro/this-props-function": 0,*/
import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import './detail.scss';
import { bindActionCreators } from 'redux';
import {
  fetchDocumentDetailRequest,
  deleteDocumentRequest
} from '../../store/actions/doc';
import { detailRouterBack } from '../../store/actions/router';
import { Text, View, Image } from '@tarojs/components';
import {
  deleteIcon,
  back,
  notFound,
  networkError
} from '../../static/svg/index';

const mapStateToProps = ({ doc, page }: GlobalStateInterface) => {
  return {
    doc,
    page
  };
};
type PageState = {
  id: number;
  repoId: number;
  showToolBar: boolean;
};
const useActions = {
  deleteDocumentRequest,
  detailRouterBack,
  fetchDocumentDetailRequest
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
    navigationBarTitleText: '语雀剪藏',
    usingComponents: { wemark: '../../components/wemark/wemark' }
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
    this.setState({ showToolBar: !this.state.showToolBar });
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
