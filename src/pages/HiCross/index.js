import React from 'react';
import styles from './index.less';

/**
 * 利用css画叉
 * @Author Abing
 * @Date 2019-12-24
 **/
class index extends React.Component {

  constructor(props) {
    super(props);
    this._HiCrossId = 'hiCross_' + Math.random().toString().substr(2);
  }

  componentWillUnmount() {
    const oldStyle = document.getElementById(this._HiCrossId + '_style');
    if (oldStyle) {
      document.head.removeChild(oldStyle);
    }
  }

  componentDidMount() {
    let {
      width, crossLineThickness = 6, crossLineColor = 'rgba(0, 0, 0, 1)', crossLineBorderRadius = '20px',
    } = this.props;
    width = this.widthToNum(width);
    const top = (width - crossLineThickness) / 2;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = this._HiCrossId + '_style';
    const styleText = `
      #${this._HiCrossId}::before,#${this._HiCrossId}::after {
      height: ${crossLineThickness}px;
      top: ${top}px;
      background-color: ${crossLineColor};
      border-radius: ${crossLineBorderRadius};
    }`;
    style.appendChild(document.createTextNode(styleText));
    document.head.appendChild(style);
  }

  widthToNum(width) {
    let num = width;
    if (isNaN(num)) {
      num = num.replace('px');
      if (isNaN(num)) {
        num = 40;
      }
    }
    return num;
  }

  render() {
    // width和crossLineThickness建议为整数,为2的倍数
    let {
      width, bgColor = 'rgba(255, 255, 255, 0)', borderRadius = 0,
    } = this.props;
    width = this.widthToNum(width);
    const style = {
      width: width + 'px',
      height: width + 'px',
      backgroundColor: bgColor,
      borderRadius,
    };
    return (
      <span id={this._HiCrossId} className={styles.hiCross} style={style}/>
    );
  }
}

export default index;
