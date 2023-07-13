import DropDownPicker from "react-native-dropdown-picker";
import { useContext } from "react";
import { Context } from "../../stores/Context";
import { MaterialIcons } from "@expo/vector-icons";


export default function DropDownPickerComponent(props) {
  const {styles} = useContext(Context);
  return (
    <DropDownPicker
      {...props}
      listMode="SCROLLVIEW"
      style={styles.components.dropDown.basicStyle}
      selectedItemContainerStyle={
        styles.components.dropDown.selectedItemContainerStyle
      }
      dropDownContainerStyle={styles.components.dropDown.dropDownContainerStyle}
      textStyle={styles.components.dropDown.textStyle}
      showTickIcon={false}
      arrowIconStyle={{
        ...styles.components.dropDown.textStyle,
        width: 20,
        height: 20,
      }}
      ArrowDownIconComponent={({ style }) => (
        <MaterialIcons
          name="keyboard-arrow-down"
          size={style[1].height}
          color={style[1].color}
        />
      )}
      ArrowUpIconComponent={({ style }) => (
        <MaterialIcons
          name="keyboard-arrow-up"
          size={style[1].height}
          color={style[1].color}
        />
      )}
    />
  );
}
