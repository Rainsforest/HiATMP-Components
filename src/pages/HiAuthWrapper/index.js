import React from 'react';

/**
 *
 * @Author Abing
 * @Date 2019-11-14
 **/
class index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      valid: false,
    };
  }

  componentDidMount() {
    const { url, fnAuth } = this.props;
    if (url && fnAuth) {
      fnAuth(url).then(valid => this.setState({ valid })).catch(e => console.error(e));
    }
  }

  render() {
    const { children, ifFailedReplacement } = this.props;
    return (
      <span>{this.state.valid ? children : ifFailedReplacement}</span>
    );
  }
}

export default index;
