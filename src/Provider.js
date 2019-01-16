import React, { Children } from "react";
import PropTypes from "prop-types";

import Context from "./Context";
import Notification from "./Notification";

class Provider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.showNotification = this.showNotification.bind(this);
  }

  lastAction = { notificationOptions: undefined, timestamp: 0 };

  checkLastAction = notificationOptions => {
    if (
      Date.now() - this.lastAction.timestamp < 8000 &&
      _.isEqual(notificationOptions, this.lastAction.notificationOptions)
    ) {
      return false;
    } else {
      this.lastAction = { notificationOptions, timestamp: Date.now() };
      return true;
    }
  };

  showNotification(notificationOptions) {
    if (this.notification) {
      if (
        !this.checkLastAction({
          title: notificationOptions.title,
          message: notificationOptions.message
        })
      ) {
        return null;
      } else {
        this.notification.show(notificationOptions);
      }
    }
  }

  render() {
    return (
      <Context.Provider value={this.showNotification}>
        {Children.only(this.props.children)}
        <Notification
          ref={ref => {
            this.notification = ref;
          }}
          {...this.props}
        />
      </Context.Provider>
    );
  }
}

Provider.propTypes = {
  ...Notification.propTypes,
  children: PropTypes.element.isRequired
};

export default Provider;
