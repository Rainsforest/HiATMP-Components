import React from 'react';
import { Icon } from 'antd';
import CloseImg from '../../assets/close.svg';

/**
 *
 * @Author Abing
 * @Date 2019-12-24
 **/
export default class index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scale: 1.0,
      translateX: 0,
      translateY: 0,
      cursor: 'auto',
      fullScreen: false,
      fullScreenScale: 1.0,
      fullScreenTranslateX: 0,
      fullScreenTranslateY: 0,
      _hiImageClientX: 0,
      _hiImageClientY: 0,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { src } = prevProps;
    if (src !== this.props.src) {
      this.handleReset();
    }
  }

  /**
   * 鼠标滚轮放大缩小
   * @param e
   */
  handleWheel(e) {
    const { ratio = 0.2 } = this.props;
    const { deltaY } = e;
    let { fullScreen } = this.state;
    let scale;
    let key = 'scale';
    if (fullScreen) {
      scale = this.state.fullScreenScale;
      key = 'fullScreenScale';
    } else {
      scale = this.state.scale;
    }
    if (deltaY < 0) {
      scale = scale * (1 + ratio);
    } else {
      scale = scale / (1 + ratio);
    }
    const newState = {};
    newState[key] = scale;
    this.setState({ ...newState });
  }

  /**
   * 按下鼠标键改变光标样式
   */
  handleMouseDown(e) {
    this.setState({ cursor: 'move', _hiImageClientX: e.clientX, _hiImageClientY: e.clientY });
  }

  /**
   * 移动实现图片平移效果
   * @param e
   */
  handleMouseMove(e) {
    // 不要跟mouseDown和mouseUp一起放在img上,会导致mouseUp失效
    if (this.state.cursor !== 'move') {
      return;
    }
    const { nativeEvent } = e;
    let { movementX, movementY } = nativeEvent;
    let { _hiImageClientX, _hiImageClientY } = this.state;
    if (movementX === undefined || movementX === null) {
      movementX = e.clientX - _hiImageClientX;
      movementY = e.clientY - _hiImageClientY;
    }
    _hiImageClientX = e.clientX;
    _hiImageClientY = e.clientY;
    let { translateX, translateY, fullScreenTranslateX, fullScreenTranslateY, fullScreen } = this.state;
    if (fullScreen) {
      fullScreenTranslateX += movementX;
      fullScreenTranslateY += movementY;
    } else {
      translateX += movementX;
      translateY += movementY;
    }
    this.setState({
      translateX,
      translateY,
      fullScreenTranslateX,
      fullScreenTranslateY,
      _hiImageClientX,
      _hiImageClientY,
    });
  }

  /**
   * 弹起鼠标键还原光标样式
   */
  handleMouseUp() {
    this.setState({ cursor: 'auto' });
  }

  /**
   * 双击全屏查看
   * @param e
   */
  handleDbClick(e) {
    e.stopPropagation();
    this.setState({ fullScreen: true });
  }

  /**
   * 点击img容器div空白处重置放大和平移效果
   */
  handleReset() {
    this.setState({ scale: 1.0, translateX: 0, translateY: 0, cursor: 'auto' });
  }

  render() {
    const { src, className } = this.props;
    const { scale, translateX, translateY, cursor, fullScreen, fullScreenScale, fullScreenTranslateX, fullScreenTranslateY } = this.state;

    const style = {
      transform: `scale(${scale})translate(${translateX}px,${translateY}px)`,
      cursor,
      margin: 'auto',
    };
    const fullScreenImgStyle = {
      transform: `scale(${fullScreenScale})translate(${fullScreenTranslateX}px,${fullScreenTranslateY}px)`,
      cursor,
      margin: 'auto',
      height: '100%',
    };
    const fullScreenStyle = {
      top: 0,
      left: 0,
      position: 'fixed',
      zIndex: 999999,
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      backgroundColor: 'rgba(170,170,170,0.6)',
      overflow: 'hidden',
    };
    const cstyle = fullScreen ? fullScreenStyle : { overflow: 'hidden' };
    const istyle = fullScreen ? fullScreenImgStyle : style;
    return (
      <div className={className} style={cstyle}
           onMouseMove={this.handleMouseMove.bind(this)}
           onDoubleClick={this.handleReset.bind(this)}>
        <img src={src} style={istyle} draggable='false' alt=''
             onWheel={this.handleWheel.bind(this)}
             onMouseDown={this.handleMouseDown.bind(this)}
             onMouseUp={this.handleMouseUp.bind(this)}
             onDoubleClick={this.handleDbClick.bind(this)}/>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50px',
          height: '50px',
          display: `${fullScreen ? 'flex' : 'none'}`,
          cursor: 'pointer',
        }} onClick={() => this.setState({
          fullScreen: false,
          fullScreenScale: 1.0,
          fullScreenTranslateX: 0,
          fullScreenTranslateY: 0,
        })}>
          <Icon component={() => <CloseImg/>} style={{ margin: 'auto' }}/>
        </div>
      </div>
    );
  }
}
