/*eslint "no-unused-vars": ["error", { "varsIgnorePattern": "Taro|minus|goToTheEnd" }],*/
import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { Text, ScrollView } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import './index.scss';
import { DocStateInterface } from 'src/store/reducers/doc';
import { initCreatedDocListRequest } from '../../store/actions/doc';
import DocumentListNode from '../../components/document';

type PageStateProps = {
  doc: DocStateInterface;
};

type PageDispatchProps = {
  initCreatedDocListRequest: () => void;
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
    }
    })
)
class Index extends Component<IProps, PageState> {
  config: Config = {
    navigationBarTitleText: '最新'
  };

  componentDidMount = () => {
    this.props.initCreatedDocListRequest();
  };

  render() {
    const empty = this.props.doc.createdDocs.length === 0;

    return (
      <ScrollView scrollX={false} scrollY={true} className="view">
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
              />
            );
          })
        )}
      </ScrollView>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
