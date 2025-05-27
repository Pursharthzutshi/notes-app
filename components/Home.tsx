import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
// import { ColorPicker } from 'react-native-color-picker';
import ShowNotes from "@/app/showNotes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export default function Home() {
  const [showNotesDialogBox, setShowNotesDialogBox] = React.useState(false);

  const [colorValue, setColorValue] = React.useState("");
  const [notesTitleValue, setNotesTitleValue] = React.useState("");
  const [notesDataArray, setNotesDataArray] = React.useState<
    { key: string; color: string; title: string; time: string }[]
  >([]);

  const [addedNotesTime, setAddedNotesTime] = React.useState("");

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedData = await AsyncStorage.getItem("notesDataArray");
        if (storedData !== null) {
          setNotesDataArray(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Failed to load notesDataArray:", error);
      }
    };

    loadNotes();
  }, []);

  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem(
          "notesDataArray",
          JSON.stringify(notesDataArray)
        );
      } catch (error) {
        console.error("Failed to save notesDataArray:", error);
      }
    };

    saveNotes();
  }, [notesDataArray]);
  const removeNote = (keyToRemove: string) => {
    const updatedNotes = notesDataArray.filter(
      (note) => note.key !== keyToRemove
    );
    setNotesDataArray(updatedNotes);
  };

  const addNotes = () => {
    const now = new Date();
    const timeString = now.toLocaleDateString();
    setAddedNotesTime(timeString);
    setShowNotesDialogBox(false);
    return setNotesDataArray((prev) => [
      ...prev,
      {
        key: uuid.v4(),
        color: colorValue,
        title: notesTitleValue,
        time: addedNotesTime,
      },
    ]);
  };

  return (
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.pageHeading}>Saved Notes</Text>
        <Button
          onPress={() => setShowNotesDialogBox(true)}
          title="Add"
        ></Button>
      </View>
      {showNotesDialogBox ? (
        <View>
          <ShowNotes />
          <Button
            onPress={() => setShowNotesDialogBox(false)}
            title="Delete"
          ></Button>
        </View>
      ) : (
        // <View
        //   style={[
        //     styles.notesBoxes,
        //     {
        //       backgroundColor: colorValue,
        //       borderStyle: "solid",
        //       borderLeftWidth: 4,
        //     },
        //   ]}
        // >
        //   <Button
        //     onPress={() => setShowNotesDialogBox(false)}
        //     title="Delete"
        //   ></Button>
        //   <TextInput
        //     style={styles.input}
        //     onChangeText={(text) => {
        //       setNotesTitleValue(text);
        //     }}
        //     value={notesTitleValue}
        //   />
        //   <TextInput
        //     style={styles.input}
        //     onChangeText={(text) => {
        //       setColorValue(text);
        //     }}
        //     value={colorValue}
        //   />
        //   <Button onPress={() => addNotes()} title="Add New Note"></Button>
        // </View>
        <ScrollView>
          <View style={styles.homeScreenContainer}>
            {notesDataArray.map((val, key) => {
              return (
                <View
                  key={val.key}
                  style={[
                    styles.notesBoxes,
                    {
                      backgroundColor: val.color,
                      borderStyle: "solid",
                      borderLeftWidth: 4,
                    },
                  ]}
                >
                  <Link
                    href={{
                      pathname: "/showNotes",
                      params: { key: key, title: val.title, color: val.color },
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      Title: {val.title}
                      {"\n"}
                      {"\n"}
                      Date: {val.time}
                    </Text>
                  </Link>
                  <Button
                    onPress={() => removeNote(val.key)}
                    title="Delete Note"
                  ></Button>
                </View>
              );
            })}
          </View>

          <View>
            <Link
              href={{
                pathname: "/showNotes",
                params: { title: "title", content: "Color" },
              }}
            >
              <Text>Text</Text>
            </Link>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  addNotesDialogBox: {
    position: "absolute",
    zIndex: 2,
    boxShadow: "2px 2px 12px 2px lightgray",
    left: "2%",
    top: "40%",
    width: "95%",
    height: "40%",
    animationDuration: "2s",
  },
  homeScreenContainer: {
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    marginTop: 28,
    gap: 12,
    marginLeft: 14,
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
  },

  headingContainer: {
    backgroundColor: "white",
    boxShadow: "1px 1px 2px 1px whitesmoke",
    padding: 20,
    marginTop: 5,
    height: "14%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  pageHeading: {
    marginTop: 30,
    marginLeft: 1,
    fontSize: 25,
  },

  notesBoxes: {
    boxShadow: "1px 1px 2px 1px lightgray",
    padding: 43,
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  addButton: {
    width: 10,
  },
});
{
  /* <Stack>
        <Stack.Screen name="showNotes" component={showNotes} />
        </Stack> */
}

{
  /* <Link href="/../components/Home" > */
}
{
  /* <Link to={{ screen: 'showNotes', params: { title: 'Title 1', content: 'Note 1 content' } }}> */
}
