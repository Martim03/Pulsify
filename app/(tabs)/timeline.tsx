import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Timeline() {
  return (
    <View style={styles.container}>
      <Text>Timeline</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
