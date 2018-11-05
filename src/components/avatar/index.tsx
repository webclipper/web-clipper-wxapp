import Taro, { Component } from '@tarojs/taro';
import { Image } from '@tarojs/components';

import './index.scss';

interface IPrors {
  originalImage: string;
  width: number;
  height: number;
}

interface IState {
  load: boolean;
  error: boolean;
}

export default class Avatar extends Component<IPrors, IState> {
  constructor() {
    super();

    this.state = {
      load: false,
      error: false
    };
  }

  style = () => {
    return {
      width: Taro.pxTransform(this.props.width),
      height: Taro.pxTransform(this.props.height),
      borderRadius: '50%'
    };
  };

  load = () => {
    this.setState({
      load: true
    });
  };

  error = () => {
    this.setState({
      error: true
    });
  };

  render() {
    const hidden = !this.state.load || this.state.error;
    return (
      <block>
        <Image
          hidden={hidden}
          src={this.props.originalImage}
          style={this.style()}
          onLoad={this.load}
          onError={this.error}
        />
        <Image
          hidden={!hidden}
          style={this.style()}
          src="https://gw.alipayobjects.com/zos/rmsportal/wYnHWSXDmBhiEmuwXsym.png?x-oss-process=image/resize,m_fill,w_192,h_192/format,png"
        />
      </block>
    );
  }
}
