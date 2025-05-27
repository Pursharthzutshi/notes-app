import Home from "@/components/Home";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.body}>
      <Home />
      {/* <ShowNotes /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    height: "100%",
  },
});
