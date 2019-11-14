import React from 'react';
import { Icon } from 'antd';
import style from './index.less';
import YUE from '../../assets/yue.svg';

const sfArray = [
  ['京', '津', '沪', '渝', '苏', '浙', '皖', '赣'],
  ['冀', '晋', '鲁', '豫', '蒙', '辽', '吉', '黑'],
  ['鄂', '湘', '粤', '桂', '闽', '琼', '川', '贵'],
  ['云', '藏', '新', '陕', '甘', '青', '宁', ''],
  ['警', '学', '挂', '使', '领', '港', '澳', ''],
];
const reg2 = new RegExp(/[警学挂使领港澳台]/);

/**
 *
 * @Author yangbingbing
 * @Date 2019-11-06
 **/
class index extends React.Component {

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return { value: nextProps.value || '' };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      showPlateSelectPanel: false,
      value: '',
    };
  }

  render() {
    const { sf = '粤' } = this.props;
    return (
      <div className={style.normal}>
        <span className={style.plateGroup}>
          <span className={style.plateWrapper}>
            <input className={style.plateNumInput} maxLength={8} autoComplete="off"
                   value={this.state.value}
                   ref={instance => this.input = instance}
                   onChange={e => {
                     const val = e.target.value;
                     this.setState({ value: val });
                     this.triggerChange(val.toUpperCase());
                   }}
                   onBlur={() => {
                     if (this.state.showPlateSelectPanel) {
                       window._hiVPI = setTimeout(() => this.setState({ showPlateSelectPanel: false }), 200);
                     }
                   }}
            />
            <span className={style.plateSelectBtn} onClick={() => {
              this.setState({ showPlateSelectPanel: !this.state.showPlateSelectPanel });
              this.input.focus();
              clearTimeout(window._hiVPI);
            }}>
              <Icon component={() => <YUE width="2em" height="2em"/>}/>
            </span>
          </span>
        </span>
        {
          this.state.showPlateSelectPanel ?
            <div className={style.plateSelectPanel}>
              <table width={'100%'} cellPadding={0} cellSpacing={1}>
                <tbody>
                {
                  sfArray.map((sfRow, i) => {
                    return (<tr key={i}>
                      {
                        sfRow.map(curr => {
                          return (<td key={curr}
                                      valign='middle'
                                      className={`${sf === curr ? style.sfd : reg2.test(curr) ? style.sf2 : style.sf1}`}
                                      onClick={this.selectSf.bind(this, curr, reg2.test(curr) ? 2 : 1)}>{curr}</td>);
                        })
                      }
                    </tr>);
                  })
                }
                </tbody>
              </table>
            </div>
            : null
        }
      </div>
    );
  }

  /**
   * AntDesign自定义表单控件实现,使可以和Form一起使用
   * @param changedValue
   */
  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      // 当值变化时触发onChange事件
      onChange(changedValue);
    }
  };

  /**
   * 设置号牌号码中头或尾的省份简称等汉字
   * @param concat 选择的值
   * @param flag 1:头,2:尾
   */
  selectSf(concat, flag) {
    let { value = '' } = this.state;
    const reg = new RegExp(/[^a-zA-Z0-9]/);
    if (flag === 2) {
      value = value.replace(reg2, '') + concat;
      if ((concat === '港' || concat === '澳') && value.length > 1) {
        if (reg.test(value.substr(0, 1))) {
          value = value.substring(1);
        }
        value = '粤' + value;
      }
    } else {
      if (value.length) {
        const firstChar = value.substr(0, 1);
        if (reg.test(firstChar) && concat.length) {
          value = concat + value.substring(1);
        } else {
          value = concat + value;
        }
      } else {
        value = concat + value;
      }
    }
    this.setState({ value, showPlateSelectPanel: false }, () => this.triggerChange(value));
  }
}

export default index;
