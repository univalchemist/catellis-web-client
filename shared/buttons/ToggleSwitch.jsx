import React, { Component } from "react";
import Switch from "react-switch";

class ToggleSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked },
    this.props.onChange(checked, this.props.passed_values, this.props.fieldName)
    );
  }

  render() {
    return (
      <label>
        <Switch
          onChange={this.handleChange}
          checked={this.state.checked}
          height={18}
          width={32}
          uncheckedIcon={false}
          checkedIcon={false} />
      </label>
    );
  }
}
export default ToggleSwitch
