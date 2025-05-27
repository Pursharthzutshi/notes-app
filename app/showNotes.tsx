import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import ColorPicker from "react-native-wheel-color-picker";

export default function ShowNotes() {
  const { title, color }: any = useLocalSearchParams();

  const [textFontSize, setTextFontSize] = useState("Font Size 🔍");
  const [textColor, setTextColor] = useState("#000000");
  const [showColorPickerModal, setShowColorPickerModal] = useState(false);

  const [notesText, setNotesText] = useState([]);

  const fontSizeData = [
    { label: "8", value: 8 },
    { label: "16", value: 16 },
    { label: "32", value: 32 },
    { label: "64", value: 64 },
    { label: "108", value: 108 },
    { label: "120", value: 120 },
    { label: "150", value: 150 },
  ];

  console.log(notesText);

  // const renderLabel = () => {
  //   if (value || isFocus) {
  //     return <Text style={[isFocus && { color: "blue" }]}>Dropdown label</Text>;
  //   }
  //   return null;
  // };

  const handleInputChange = (input: any) => {
    let value = input;

    if (typeof input === "object" && input?.value !== undefined) {
      value = String(input.value);
    }

    const numericText = value.replace(/[^0-9]/g, "");
    console.log(numericText);
    setTextFontSize(numericText);
  };

  const testText = notesText.map((val: any) => {
    return val;
  });

  return (
    <View style={styles.showNotesPage}>
      <View style={styles.headingContainer}>
        <View>
          <ScrollView>
            <TextInput
              style={[
                {
                  // backgroundColor: "red",

                  boxShadow: ".2px .2px 12px .2px whitesmoke",
                  color: color,
                  paddingLeft: 16,
                  borderLeftWidth: 4,
                  borderStyle: "solid",
                  borderLeftColor: color,
                  fontSize: 28,
                  fontFamily: "arial",
                  fontWeight: "500",
                },
              ]}
              value={title}
              placeholder="Heading"
            ></TextInput>
          </ScrollView>
        </View>
        <TextInput
          placeholder="Enter Notes"
          onChangeText={(text) => setNotesText(text.split("") as any)}
          scrollEnabled={true}
          multiline={true}
          style={[
            styles.notes,
            {
              fontSize: Number(textFontSize) || 20,
              color: textColor,
              lineHeight: 28,
              textAlignVertical: "top",
              paddingVertical: 8,
            },
          ]}
          underlineColorAndroid="transparent"
          textBreakStrategy="simple"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      {/* <Text
        style={{
          fontSize: Number(textFontSize) || 20,
          color: textColor,
        }}
      >
        {testText}
      </Text> */}

      <View style={styles.allColorOptionsContainer}>
        {
          <TouchableOpacity
            style={styles.chooseColorButton}
            onPress={() => {
              setShowColorPickerModal(true);
            }}
          >
            <Text style={{ fontSize: 25 }}> 🎨 </Text>
          </TouchableOpacity>

          // <Button
          //   onPress={() => {
          //     setShowColorPickerModal(true);
          //   }}
          //   title="🎨"
          // ></Button>
        }

        {showColorPickerModal ? (
          <View style={styles.colorPickerContainer}>
            <View style={styles.colorPickerContainerTopBar}>
              <Text style={{ textAlign: "center", fontSize: 16 }}>
                CHOOSE TEXT COLOR
              </Text>

              <Button
                onPress={() => {
                  setShowColorPickerModal(false);
                }}
                title="Close"
              ></Button>
            </View>

            <ColorPicker
              onColorChange={(color) => {
                setTextColor(color);
              }}
            />
          </View>
        ) : null}
        {/* <View style={[styles.notesTextOptionsContainer]}> */}
        <View>
          <ScrollView style={{ flex: 1 }}>
            <Dropdown
              style={{ flex: 1, minWidth: 150, borderWidth: 2, padding: 5 }}
              value={textFontSize}
              onChange={handleInputChange}
              data={fontSizeData}
              placeholder={textFontSize}
              search
              labelField="label"
              valueField="value"
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  colorPickerContainerTopBar: {
    flexDirection: "row",
    gap: 30,
  },
  chooseColorButton: {
    boxShadow: ".2px .2px 12px .2px lightgray",
    backgroundColor: "white",
    width: "12%",
    // padding: 30,
  },
  allColorOptionsContainer: {
    flexDirection: "row",
    gap: 8,
    // fontSize: 2,
    marginLeft: 10,
    marginTop: 20,
    height: "5%",
    // width: "30%",
  },
  notesTextOptionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },

  colorPickerContainer: {
    padding: 20,
    marginLeft: 10,
    zIndex: 1,
    boxShadow: "2px 2px 12px 2px lightgray",
    backgroundColor: "white",
    position: "absolute",
    left: "10%",
    bottom: "0%",
  },
  notesTextOptions: {
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 19,
    height: "100%",
    padding: 10,
    width: "50%",
  },
  notes: {
    borderColor: "gray",
    // boxShadow: "2px 2px 12px 2px lightgray",
    outline: "none",
    fontSize: 19,
    height: "77%",
    width: "100%",
    textAlignVertical: "top",
    // padding: 10,
    // flexWrap: "nowrap",
  },

  showNotesPage: {
    boxShadow: "2px 2px 12px 2px whitesmoke",
    height: "100%",
    width: "97%",
    backgroundColor: "white",
    marginLeft: 5,
  },

  headingContainer: {
    backgroundColor: "white",
    // boxShadow:"1px 1px 2px 1px whitesmoke",
    // padding: 20,
    marginTop: 5,
    // height:"40%",
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "space-between",
  },
});
