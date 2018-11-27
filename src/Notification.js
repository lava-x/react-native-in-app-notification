import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated, StyleSheet, Image } from "react-native";
import { getStatusBarHeight, isIphoneX } from "react-native-iphone-x-helper";

import DefaultNotificationBody from "./DefaultNotificationBody";

const styles = StyleSheet.create({
  notification: {
    position: "absolute",
    width: "100%"
  }
});

class Notification extends Component {
  constructor() {
    super();

    this.heightOffset = isIphoneX() ? getStatusBarHeight() : 0;

    this.show = this.show.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.closeNotification = this.closeNotification.bind(this);

    this.state = {
      animatedValue: new Animated.Value(0),
      isOpen: false
    };
  }

  show(
    {
      title,
      message,
      closeInterval,
      containerStyle,
      titleStyle,
      messageStyle,
      iosFooter,
      onPress,
      icon,
      vibrate
    } = {
      title: "",
      message: "",
      closeInterval: "",
      containerStyle: "",
      titleStyle: "",
      messageStyle: "",
      iosFooter: "true",
      onPress: null,
      icon: null,
      vibrate: true
    }
  ) {
    const { isOpen } = this.state;

    // Clear any currently showing notification timeouts so the new one doesn't get prematurely
    // closed
    clearTimeout(this.currentNotificationInterval);

    const showNotificationWithStateChanges = () => {
      this.setState(
        {
          isOpen: true,
          title,
          message,
          containerStyle,
          titleStyle,
          messageStyle,
          iosFooter,
          onPress,
          icon,
          vibrate
        },
        () =>
          this.showNotification(() => {
            this.currentNotificationInterval = setTimeout(() => {
              this.setState(
                {
                  isOpen: false,
                  title: "",
                  message: "",
                  containerStyle,
                  titleStyle: "",
                  messageStyle: "",
                  iosFooter: "false",
                  onPress: null,
                  icon: null,
                  vibrate: true
                },
                this.closeNotification
              );
            }, closeInterval);
          })
      );
    };

    if (isOpen) {
      this.setState({ isOpen: false }, () => {
        this.closeNotification(showNotificationWithStateChanges);
      });
    } else {
      showNotificationWithStateChanges();
    }
  }

  showNotification(done) {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: this.props.openCloseDuration,
      useNativeDriver: true
    }).start(done);
  }

  closeNotification(done) {
    Animated.timing(this.state.animatedValue, {
      toValue: 0,
      duration: this.props.openCloseDuration,
      useNativeDriver: true
    }).start(done);
  }

  render() {
    const {
      height: baseHeight,
      topOffset,
      iconApp,
      notificationBodyComponent: NotificationBody
    } = this.props;

    const {
      animatedValue,
      title,
      message,
      containerStyle,
      titleStyle,
      messageStyle,
      iosFooter,
      onPress,
      isOpen,
      icon,
      vibrate
    } = this.state;

    const height = baseHeight + this.heightOffset;

    return (
      <Animated.View
        style={[
          styles.notification,
          {
            height,
            backgroundColor: containerStyle
              ? containerStyle["backgroundColor"]
              : "white"
          },
          {
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-height + topOffset, 0]
                })
              }
            ]
          }
        ]}
      >
        <NotificationBody
          title={title}
          message={message}
          containerStyle={containerStyle}
          titleStyle={titleStyle}
          messageStyle={messageStyle}
          iosFooter={iosFooter}
          onPress={onPress}
          isOpen={isOpen}
          iconApp={iconApp}
          icon={icon}
          vibrate={vibrate}
          onClose={() =>
            this.setState({ isOpen: false }, this.closeNotification)
          }
        />
      </Animated.View>
    );
  }
}

Notification.propTypes = {
  openCloseDuration: PropTypes.number,
  height: PropTypes.number,
  topOffset: PropTypes.number,
  notificationBodyComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  iconApp: Image.propTypes.source
};

Notification.defaultProps = {
  openCloseDuration: 200,
  height: 80,
  topOffset: 0,
  notificationBodyComponent: DefaultNotificationBody,
  iconApp: null
};

export default Notification;
