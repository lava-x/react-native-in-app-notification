import React from "react";
import PropTypes from "prop-types";
// import { TouchableOpacity, View, Text, Image, Vibration } from 'react-native';
import { TouchableOpacity, View, Text } from "react-native";

import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import { Icon } from "react-native-elements";

const styles = {
  content: {
    flex: 1,
    flexDirection: "row"
  },
  iconContainer: {
    width: 60,
    height: 70,
    marginTop: 5,
    marginLeft: 10
  },
  // icon: {
  //   resizeMode: 'contain',
  //   width: 60,
  //   height: 70,
  // },
  textContainer: {
    alignSelf: "center",
    marginLeft: 20,
    flex: 1
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10
  }
};

class DefaultNotificationBody extends React.Component {
  constructor() {
    super();

    this.onNotificationPress = this.onNotificationPress.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
  }

  // Disabled android vibration

  // componentDidUpdate(prevProps) {
  //   if (
  //     (prevProps.vibrate || this.props.vibrate) &&
  //     this.props.isOpen &&
  //     !prevProps.isOpen
  //   ) {
  //     Vibration.vibrate();
  //   }
  // }

  onNotificationPress() {
    const { onPress, onClose } = this.props;

    onClose();
    onPress();
  }

  onSwipe(direction) {
    const { onClose } = this.props;
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    if (direction === SWIPE_LEFT || direction === SWIPE_RIGHT) {
      onClose();
    }
  }

  render() {
    const {
      title,
      message,
      // iconApp,
      // icon,
      titleStyle,
      messageStyle
    } = this.props;

    return (
      <GestureRecognizer onSwipe={this.onSwipe} style={{ flex: 1 }}>
        <View
          style={styles.content}

          // onPress={this.onNotificationPress}
        >
          {/* <View style={styles.iconContainer}>
            {(icon || iconApp) && (
              <Image source={icon || iconApp} style={styles.icon} />
            )}
          </View> */}
          <View style={styles.textContainer}>
            <Text
              numberOfLines={1}
              style={[titleStyle, { fontWeight: "bold" }]}
            >
              {title}
            </Text>
            <Text numberOfLines={2} style={[messageStyle, { marginTop: 5 }]}>
              {message}
            </Text>
          </View>
          <View style={styles.inner}>
            <TouchableOpacity onPress={this.onNotificationPress}>
              <Icon name="close" type="material-community" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </GestureRecognizer>
    );
  }
}

DefaultNotificationBody.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  // vibrate: PropTypes.bool,
  isOpen: PropTypes.bool,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  // iconApp: Image.propTypes.source,
  // icon: Image.propTypes.source,
  additionalProps: PropTypes.object,
};

DefaultNotificationBody.defaultProps = {
  title: "Notification",
  message: "This is a test notification",
  // vibrate: true,
  isOpen: false,
  // iconApp: null,
  // icon: null,
  onPress: () => null,
  onClose: () => null,
  additionalProps: null,
};

export default DefaultNotificationBody;
