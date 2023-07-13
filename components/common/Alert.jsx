import { Component } from "react";
import {
  Modal,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  TouchableHighlight,
} from "react-native";

import { Context } from "../../stores/Context";

class Alert extends Component {
  static _instance;
  static contextType = Context;
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      text: "This is an alert",
      heading: "Alert",
      fn: () => {},
    };
    Alert._instance = this;
  }
  static alert(text, heading = "Alert", fn = () => {}) {
    Alert._instance._alert(text, heading, fn);
  }
  _alert(text, heading, fn) {
    this.setState({ visible: true, text: text, heading: heading, fn: fn });
  }
  render() {
    const styles = this.context.styles;

    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={this.state.visible}
        onRequestClose={() => {
          this.state.fn();
          this.setState({
            visible: false,
            text: "This is an alert",
            heading: "Alert",
            fn: () => {},
          });
        }}
        style={{
          paddingTop: 100,
        }}
      >
        <SafeAreaView style={stl.modal}>
          <TouchableOpacity
            onPress={() => {
                this.state.fn();
                this.setState({
                  visible: false,
                  text: "This is an alert",
                  heading: "Alert",
                  fn: () => {},
                });
            }}
            style={{
              flex: 1,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
          <View
            style={{
              ...stl.container,
              backgroundColor: styles.common.popUpBackground,
            }}
          >
            <View
              style={{
                paddingVertical: 15,
                gap: 20,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  color: styles.common.color,
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                {this.state.heading}
              </Text>
              <Text
                style={{
                  alignSelf: "center",
                  color: styles.common.color,
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                {this.state.text}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableHighlight
                underlayColor={styles.common.borderColor}
                style={{
                  ...stl.button,
                  borderColor: styles.common.borderColorLight,
                  borderBottomLeftRadius: 10,
                  //   borderRightWidth: 1,
                  flex: 1,
                }}
                onPress={() => {
                    this.state.fn();
                    this.setState({
                      visible: false,
                      text: "This is an alert",
                      heading: "Alert",
                      fn: () => {},
                    });
                }}
              >
                <View
                  style={{
                    borderRightWidth: 1,
                    borderColor: styles.common.borderColorLight,
                    top: -1,
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      color: styles.common.color,
                      marginVertical: 20,
                    }}
                  >
                    OK
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={styles.common.borderColor}
                style={{
                  ...stl.button,
                  borderColor: styles.common.borderColorLight,
                  //   borderWidth: 1,
                  borderBottomRightRadius: 10,
                  flex: 1,
                }}
                onPress={() => {
                    this.state.fn();
                    this.setState({
                      visible: false,
                      text: "This is an alert",
                      heading: "Alert",
                      fn: () => {},
                    });
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: styles.common.color,
                    marginVertical: 20,
                  }}
                >
                  Cancel
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const stl = StyleSheet.create({
  container: {
    borderRadius: 10,
    elevation: 100,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 300,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderTopWidth: 1,
  },
});

export default Alert;
