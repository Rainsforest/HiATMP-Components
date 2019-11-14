import React from 'react';
import { Form, Button } from 'antd';
import HiVehiclePlateInput from './HiVehiclePlateInput';

/**
 *
 * @Author yangbingbing
 * @Date 2019-11-14
 **/
class test extends React.Component {

  render() {
    const FormItem = Form.Item;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form>
          <FormItem label="号牌号码">
            {getFieldDecorator('carNumber', { initialValue: '粤E12345' })(<HiVehiclePlateInput/>)}
          </FormItem>
        </Form>
        <Button onClick={() => {
          console.log(form.getFieldsValue());
        }}>取值</Button>
      </div>
    );
  }
}

export default Form.create()(test);
