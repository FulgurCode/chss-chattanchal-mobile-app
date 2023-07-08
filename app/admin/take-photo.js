import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  AppState,
  Modal,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType } from "expo-camera";
import { useRef, useState, useEffect } from "react";

import * as ImageManipulator from "expo-image-manipulator";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

import { useContext } from "react";
import { Context } from "../../stores/Context";
import Alert from "../../components/common/Alert";

import { Svg, Defs, Mask, Rect, Path } from "react-native-svg";

let data;

let Screen = Dimensions.get("window");

export default function TakePhoto(props) {
  const { styles, webSocketURL } = useContext(Context);

  const [type, setType] = useState(CameraType.back);
  const [imageData, setImageData] = useState();
  const [imgBase64, setImageBase64] = useState();
  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [scanData, setScanData] = useState();
  const [focus, setFocus] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [sending, setSending] = useState(false);
  const [webSocket, setWebSocket] = useState();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [error, setError] = useState();

  const cameraRef = useRef(null);

  const router = useRouter();

  // Check Websocket connections
  if (webSocket) {
    webSocket.onerror = (event) => {
      setError("Server connection error ");
    };
    webSocket.onopen = (event) => {
      setError();
    };
  }

  // toggle the Focus State & connnect to websocket when focused
  useFocusEffect(
    React.useCallback(() => {
      setFocus(true);
      if (webSocket) {
        setWebSocket(new WebSocket(webSocketURL));
      }
      return () => {
        setFocus(false);
      };
    }, [])
  );

  // toggle App State
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);

  // useEffect(() => {
  //   AdminCheckLogin(setLoading, router.replace, (link = "/login"));
  // }, []);

  // connect to websocket when window is Active
  useEffect(() => {
    if (appState.current == "active" && focus) {
      setWebSocket(new WebSocket(webSocketURL));
    }
    return () => {};
  }, [focus, appStateVisible]);

  // close connection when navigating to Home page
  useEffect(() => {
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [webSocket]);

  // closing Websocket connections
  if (appState.current == "background" && focus && webSocket) {
    webSocket.close();
    setWebSocket(false);
  }
  if (webSocket && !focus) {
    webSocket.close();
    setWebSocket(false);
  }

  // Send image data to socket server
  async function sendData() {
    setSending(true);
    const data = {
      targetId: scanData,
      name: "image",
      data: imgBase64,
    };

    await webSocket.send(JSON.stringify(data));
    setSending(false);

    Alert.alert("Photo send successfully!", "Alert", () => {
      setScanData(undefined);
      setImageData(null);
      props.setVisible(false);
    });
  }

  // Toggle Back and Front Camera
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  // Toggle Flash
  function toggleFlashMode() {
    setFlash((current) =>
      current === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  }

  // Ask for Camera Permissions
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  // Take Picture when button is clicked
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImageData(data);
        cropImage(data);
        setFlash(Camera.Constants.FlashMode.off);
        setType(CameraType.back);
      } catch (e) {
        setError(e);
      }
    }
  };

  // Display message if Camera permission is not given
  if (!hasPermission === null) {
    return <Text>Please grant camera permission!</Text>;
  }

  // Crop and scale image to 1:1 ratio
  async function cropImage(imageData) {
    setProcessing(true);
    const { base64, uri } = await ImageManipulator.manipulateAsync(
      imageData.uri,
      [
        {
          crop: {
            originX: 0,
            originY: 0,
            width: imageData.width,
            height: imageData.width,
          },
        },
        { resize: { width: 320 } },
      ],
      { compress: 1, format: "png", base64: true }
    );

    data = uri;
    setImageBase64(base64);
    setProcessing(false);
  }

  // Open camera when QRCode is scanned
  function handleBarCodeScanned({ type, data }) {
    try {
      setScanData(data);
    } catch (e) {
      setError("Invalid QR Code,Try again!");
    }
  }

  return (
    <Modal {...props}>
      <View style={{ backgroundColor: styles.common.backgroundColor, flex: 1 }}>
        {/* <View
          styles={{
            flex: 1,
            backgroundColor: "red"
          }}
        >
          <Text style={{color:"white"}}>hello</Text>
        </View> */}
        {/*Shows QRCode scanner*/}
        {scanData && (
          <View
            style={{
              flex: 1,
              minHeight: 90,
              maxHeight: 90,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 20,
              paddingHorizontal: 50,
              backgroundColor: styles.common.backgroundColor,
            }}
          >
            {!imageData ? (
              <>
                <TouchableOpacity onPress={toggleCameraType}>
                  <MaterialCommunityIcons
                    name="camera-flip"
                    size={30}
                    color="#555"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleFlashMode}>
                  <Ionicons name="flash" size={30} color="#555" />
                </TouchableOpacity>
              </>
            ) : (
              ""
            )}
          </View>
        )}

        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              width: Screen.width,
              maxHeight: Screen.width,
              overflow: scanData ? "hidden" : "visible",
              minHeight: Screen.width,
            }}
          >
            {!imageData && hasPermission ? (
              focus && (
                <Camera
                  ratio={scanData ? "4:3" : "16:9"}
                  style={{
                    flex: 1,
                    width: scanData ? Screen.width : Screen.width + 50,
                    maxHeight: scanData
                      ? (Screen.width / 3) * 4
                      : (Screen.width / 9) * 16 + 150,
                    minHeight: scanData
                      ? (Screen.width / 3) * 4
                      : (Screen.width / 9) * 16 + 150,
                  }}
                  type={type}
                  ref={cameraRef}
                  flashMode={flash}
                  onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
                  barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                  }}
                />
              )
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: styles.common.backgroundColor,
                }}
              >
                <ActivityIndicator
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                  }}
                  size={"large"}
                  color="gray"
                  animating={processing}
                />
                <Image
                  source={{ uri: data }}
                  width={Screen.width}
                  height={(Screen.width / 3) * 4}
                  style={{
                    flex: 1,
                    width: 320,
                    maxHeight: 320,
                    minHeight: 320,
                    borderRadius: 20,
                  }}
                />
              </View>
            )}
          </View>
          {scanData &&
            (!imageData ? (
              <>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flex: 1,
                    paddingTop: Screen.height / 10,
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={takePicture}
                    style={{
                      backgroundColor: styles.common.inputBackground,
                      borderColor: styles.common.borderColor,
                      borderWidth: 5,
                      width: 80,
                      minHeight: 80,
                      borderRadius: 1000,
                    }}
                  ></TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (flash == Camera.Constants.FlashMode.torch) {
                        setFlash(Camera.Constants.FlashMode.off);
                      } else {
                        setScanData(undefined);
                        setFlash(Camera.Constants.FlashMode.off);
                        setType(CameraType.back);
                      }
                    }}
                    style={{
                      backgroundColor: styles.common.borderColor,
                      minHeight: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Text
                      style={{ color: "white", fontWeight: 600, fontSize: 17 }}
                    >
                      Scan Again?
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={{ backgroundColor: styles.common.backgroundColor }}>
                <View
                  style={{
                    marginTop: Screen.height / 10,
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setImageData(null);
                      data = null;
                    }}
                    style={{
                      width: Screen.width / 5,
                      height: Screen.width / 5,
                      backgroundColor: styles.common.inputBackground,
                      borderRadius: 1000,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="camera-retake"
                      size={40}
                      color="#555"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={sendData}
                    style={{
                      width: Screen.width / 5,
                      height: Screen.width / 5,
                      backgroundColor: styles.common.inputBackground,
                      borderRadius: 1000,
                      justifyContent: "center",
                      paddingLeft: 26,
                    }}
                  >
                    <Ionicons name="send" size={35} color="#555" />
                    <ActivityIndicator
                      animating={sending}
                      color="#555"
                      style={{
                        position: "absolute",
                        alignSelf: "center",
                        transform: [{ scaleX: 2.8 }, { scaleY: 2.8 }],
                      }}
                      size="large"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={{ margin: 20, alignSelf: "center", color: "red" }}>
                  {error}
                </Text>
              </View>
            ))}

          {!scanData && (
            <>
              <View
                style={{
                  width: Screen.width,
                  height: Screen.height,
                  position: "absolute",
                  flex: 1,
                  zIndex: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Svg height="100%" width="100%">
                  <Defs>
                    <Mask id="mask" x="0" y="0" height="100%" width="100%">
                      <Rect
                        x={Screen.width / 2 - 300 / 2}
                        y={Screen.height / 2 - 300 / 2}
                        rx="50"
                        ry="50"
                        width={300}
                        height={300}
                        stroke="white"
                        strokeWidth="10"
                        fill-opacity="0"
                        strokeDasharray={"28  ,140,140,  140, 140,  140,140,  140, 140     ,140,140"}
                      />
                    </Mask>
                  </Defs>
                  <Rect
                    height="100%"
                    width="100%"
                    mask="url(#mask)"
                    fill="white"
                  />
                </Svg>

                <View
                  style={{
                    position: "absolute",
                    bottom: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 40,
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: "#0009",
                      borderRadius: 1000,

                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={toggleFlashMode}
                  >
                    <Ionicons name="flash" size={30} color="#ccc" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: "#0009",
                      borderRadius: 1000,

                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      props.setVisible(false);
                    }}
                  >
                    <Entypo name="cross" size={45} color="#ccc" />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  position: "absolute",
                  padding: 30,
                  backgroundColor: "black",
                  opacity: 0.6,
                  borderRadius: 20,
                  alignSelf: "center",
                  margin: 20,
                }}
              >
                <Text style={{ color: "white", fontWeight: 500, fontSize: 15 }}>
                  Scan QR Code
                </Text>
              </View>

              {/* <TouchableOpacity onPress={toggleFlashMode}>
              <Ionicons
                name="flash"
                size={30}
                color="#fff"
                style={{ position: "absolute", top: Screen.height/3 }}
              />
            </TouchableOpacity> */}
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
