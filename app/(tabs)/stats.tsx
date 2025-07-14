import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

export default function Stats() {
  return (
    <View style={styles.container}>
      <Text>Stats</Text>
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
});
