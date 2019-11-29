import React from 'react';
import { Form, Button } from 'antd';
import HiVehiclePlateInput from './HiVehiclePlateInput';
import HiAuthWrapper from './HiAuthWrapper';
import { fetch } from 'dva';

/**
 *
 * @Author Abing
 * @Date 2019-11-14
 **/
class test extends React.Component {

  render() {
    const FormItem = Form.Item;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const authProps = {
      url: 'http://localhost:8001',
      fnAuth: (url) => {
        return new Promise(resolve => {
          fetch(url).then(data => setTimeout(() => {
            resolve(data.status === 200);
          }, 2000)).catch(e => console.log(e));
        });
      },
    };
    return (
      <div>
        <Form>
          <FormItem label="号牌号码">
            {getFieldDecorator('carNumber', { initialValue: '粤E12345' })(<HiVehiclePlateInput/>)}
          </FormItem>
        </Form>
        <HiAuthWrapper {...authProps}>
          <Button>权限按钮</Button>
        </HiAuthWrapper>
        <Button onClick={() => {
          console.log(form.getFieldsValue());
        }}>取值</Button>
      </div>
    );
  }
}

export default Form.create()(test);
