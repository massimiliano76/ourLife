import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../styles/globalStyles";

export const Chat = () => {
  return (
    <SafeAreaView style={globalStyles.androidSafeArea}>
      <View style={globalStyles.container}>
        <TouchableOpacity>
          <Text style={globalStyles.titleText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
