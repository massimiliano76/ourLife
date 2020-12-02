import React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { globalStyles, colors } from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";

export const Chat = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={globalStyles.androidSafeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <MaterialIcons name="arrow-back" size={30} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.heading}>
          <Text style={globalStyles.pageTitleText}>CHAT</Text>
          <Image
            source={require("../assets/unicorn.png")}
            style={{ width: 30, height: 60 }}
          />
        </View>
        <TouchableOpacity>
          <MaterialIcons name="phone" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //header
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  title: {
    color: colors.white,
  },

  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
  },
});
