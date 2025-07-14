import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

export default function Timeline() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Timeline</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.sblack,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.slightgrey,
    fontSize: 16,
  },
});
