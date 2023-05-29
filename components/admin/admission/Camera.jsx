import { Camera, CameraType } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";


import * as ImageManipulator from "expo-image-manipulator";

let Screen = Dimensions.get("window");
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;

export default function CameraScreen({ imageUri, setImageUri, setCamera }) {
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const [imageData, setImageData] = useState();

  const cameraRef = useRef(null);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function toggleFlashMode() {
    setFlash((current) =>
      current === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  }

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

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
        console.log(e);
      }
    }
  };

  if (!hasPermission === null) {
    return <Text>Please grant camera permission!</Text>;
  }

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
      { compress: 0, format: "png", base64: true }
    );

    // data = uri;
    // setImageBase64(base64);
    setImageUri(uri);
    setProcessing(false);
  }

  return (
    <>
      {!imageData ? (
        <View
          style={{
            position: "absolute",
            flex: 1,
            backgroundColor: "white",
            zIndex: 5,
            width: "100%",
            height: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              position: "absolute",
              paddingTop: 40,
              paddingHorizontal: 50,
            }}
          >
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
          </View>

          <View
            style={{
              width: Screen.width,
              height: Screen.width,
              overflow: "hidden",
              marginTop: 90,
            }}
          >
            <Camera
              ref={cameraRef}
              style={{
                flex: 1,
                width: Screen.width,
                minHeight: (Screen.width / 3) * 4,
                maxHeight: (Screen.width / 3) * 4,
              }}
              ratio="4:3"
              type={type}
              flashMode={flash}

            ></Camera>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
              paddingTop: 70,
            }}
          >
            <TouchableOpacity
              onPress={takePicture}
              style={{
                backgroundColor: "#ddd",
                borderColor: "#bbb",
                borderWidth: 5,
                width: 80,
                minHeight: 80,
                borderRadius: 1000,
              }}
            ></TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            position: "absolute",
            flex: 1,
            backgroundColor: "white",
            zIndex: 5,
            width: "100%",
            height: "100%",
          }}
        >
          

          <View
            style={{
              width: Screen.width,
              height: Screen.width,
              overflow: "hidden",
              marginTop: 90,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: imageUri }}
              style={{
                flex: 1,
                width: 320,
                maxHeight: 320,
              }}
              // type={type}
            ></Image>
          </View>
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
                backgroundColor: "#ccc",
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
              onPress={()=>{setCamera(false)}}
              style={{
                width: Screen.width / 5,
                height: Screen.width / 5,
                backgroundColor: "#ccc",
                borderRadius: 1000,
                justifyContent: "center",
                paddingLeft: 26,
              }}
            >
              {/* <Ionicons name="send" size={35} color="#555" /> */}
              <FontAwesome5 name="check" size={35} color="#555" />
              {/* <ActivityIndicator
                animating={sending}
                color="#555"
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  transform: [{ scaleX: 2.8 }, { scaleY: 2.8 }],
                }}
                size="large"
              /> */}
            </TouchableOpacity>
          </View>
          <Text style={{ margin: 20, alignSelf: "center", color: "red" }}>
            {error}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
