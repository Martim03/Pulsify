import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

export default function Recommendations() {
  return (
    <View style={styles.container}>
      <Text>Recommendations</Text>
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
