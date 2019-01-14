import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View, Text, Image, Vibration } from "react-native";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import { Icon } from "react-native-elements";

const styles = {
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  content: {
    flex: 1,
    flexDirection: "row"
  },
  iconApp: {
    marginTop: 10,
    marginLeft: 20,
    resizeMode: "contain",
    width: 24,
    height: 24,
    borderRadius: 5
  },
  icon: {
    marginTop: 10,
    marginLeft: 10,
    resizeMode: "contain",
    width: 48,
    height: 48
  },
  textContainer: {
    alignSelf: "center",
    marginLeft: 20,
    flex: 1
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10
  },
  footer: {
    backgroundColor: "#696969",
    borderRadius: 5,
    alignSelf: "center",
    height: 5,
    width: 35,
    margin: 5
  }
};

class DefaultNotificationBody extends React.Component {
  constructor() {
    super();

    this.onNotificationPress = this.onNotificationPress.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
  }

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
    const { SWIPE_UP } = swipeDirections;

    if (direction === SWIPE_UP) {
      this.props.onClose();
    }
  }

  renderIcon() {
    const { iconApp, icon } = this.props;

    if (icon) {
      return <Image source={icon} style={styles.icon} />;
    } else if (iconApp) {
      return <Image source={iconApp} style={styles.iconApp} />;
    }

    return null;
  }

  renderFooter() {
    const { iosFooter } = this.props;
    if (!iosFooter) return null;
    return <View style={styles.footer} />;
  }

  render() {
    const { title, message, titleStyle, messageStyle } = this.props;

    return (
      <GestureRecognizer onSwipe={this.onSwipe} style={styles.container}>
        <View
          style={styles.content}

          // onPress={this.onNotificationPress}
        >
          {this.renderIcon()}
          <View style={styles.textContainer}>
            <Text
              numberOfLines={1}
              style={[titleStyle, { fontWeight: "bold" }]}
            >
              {title}
            </Text>
            <Text numberOfLines={1} style={[messageStyle, { marginTop: 5 }]}>
              {message}
            </Text>
          </View>
          <View style={styles.inner}>
            <TouchableOpacity
              onPress={this.onNotificationPress}
              activeOpacity={0.3}
              underlayColor="transparent"
            >
              <Icon name="close" type="material-community" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        {this.renderFooter()}
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
  iconApp: Image.propTypes.source,
  icon: Image.propTypes.source
};

DefaultNotificationBody.defaultProps = {
  title: "Notification",
  message: "This is a test notification",
  // vibrate: true,
  isOpen: false,
  iconApp: null,
  icon: null,
  onPress: () => null,
  onClose: () => null
};

export default DefaultNotificationBody;
