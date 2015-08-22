import React, {addons} from 'react/addons';
import classNames from 'classnames';

const {PureRenderMixin} = addons;

export default React.createClass({
  mixins: [
    PureRenderMixin
  ],

  getDefaultProps() {
    return {className: ''}
  },

  render() {
    const {iconName, className, onClickHandler} = this.props;
    const iconClasses = "fa fa-" + iconName + " " + className;

    return (
      <i onClick={onClickHandler} className={iconClasses} />
    );
  }

});
