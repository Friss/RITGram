import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

export default React.createClass({
  mixins: [
    PureRenderMixin
  ],

  propTypes: {
    iconName: PropTypes.string.isRequired
  },

  render() {
    const {iconName, className, onClickHandler} = this.props;
    const iconClasses = classNames(
      "fa",
      "fa-" + iconName,
      className
    )

    return (
      <i onClick={onClickHandler} className={iconClasses} />
    );
  }

});
