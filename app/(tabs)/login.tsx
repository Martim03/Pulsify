import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";
import { LoginViewModel } from "../viewModels/LoginViewModel";

export default function Login() {
  const viewModel = useRef(new LoginViewModel()).current;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Wrapper function to handle loading component
  // This function will set the loading state before and after the async operation
  const asyncLoadingWrapper = async (func: () => Promise<void>) => {
    setIsLoading(true);
    await func();
    setIsLoading(false);
  };

  useEffect(() => {
    asyncLoadingWrapper(async () => {
      const success = await viewModel.tryLoadValidToken();
      setIsLoggedIn(success);
    });
  }, []);

  // Wrapper function to handle login click
  const handleLogin = async () => {
    asyncLoadingWrapper(async () => {
      const success = await viewModel.login();
      setIsLoggedIn(success);
    });
  };

  // ! TODO - Handle login
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Pulsify</Text>

      {/* Logo */}
      <Image
        source={require("../../assets/images/react-logo.png")} // TODO - Replace with your real logo
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Login Button */}

      {isLoading ? (
        // ! TODO - Exchange for loading component
        <Text> Logged! </Text>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login with Spotify</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.sblack,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: Colors.sgreen,
    marginBottom: 20,
    fontWeight: "700",
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 60,
  },
  button: {
    backgroundColor: Colors.sgreen,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.sdarkgrey,
    fontSize: 18,
    fontWeight: "600",
  },
});
