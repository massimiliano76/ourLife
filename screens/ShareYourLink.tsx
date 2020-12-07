import React, { useEffect, useState } from "react";
import { Text, View, Share, StyleSheet, TextInput, Alert } from "react-native";
import { colors } from "../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from "../styles/globalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";

import { MaterialIcons } from "@expo/vector-icons";
import { DismissKeyboard } from "../Components/DismissKeyboard";
import { loggedOut } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { LoadingIndicator } from "../Components/LoadingIndicator";

export const ShareYourLink = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const appInfo = useSelector((state: any) => state);
  const userInfo = useSelector((state: any) => state.user);
  const [connectorsCode, setConnectorsCode] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (connectorsCode.length <= 5) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }

    return () => {
      isMounted = false;
    };
  }, [connectorsCode]);

  const handleOnShare = async () => {
    try {
      await Share.share({
        message: `${userInfo.halfId}`,
      });
    } catch (err) {
      Alert.alert("UH OH", err.message);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.black}>
        {appInfo.loadingState && <LoadingIndicator />}
        <View style={styles.background}>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.heading}>Connect with someone</Text>
            <Text
              style={{
                ...styles.littleText,
                textAlign: "center",
                width: 350,
                marginTop: 25,
              }}
            >
              You can share your code with one other person or enter their
              Connect Code below.
            </Text>
          </View>

          <TouchableOpacity
            style={{ width: "100%", marginTop: 30 }}
            onPress={handleOnShare}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                height: 180,
              }}
            >
              <Text style={styles.littleText}>Your Connect code is:</Text>
              <LinearGradient
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 1, y: 0.0 }}
                locations={[0, 1]}
                colors={["#1E89CC", "#9C14C490"]}
                style={{
                  ...globalStyles.btnContainer,
                  borderStyle: "dotted",
                  borderWidth: 2,
                  borderColor: colors.white,
                }}
              >
                <View style={styles.code}>
                  <Text
                    style={{
                      ...styles.heading,
                      letterSpacing: 10,
                      fontSize: 25,
                    }}
                  >
                    {userInfo.halfId}
                  </Text>
                </View>
              </LinearGradient>
              <LinearGradient
                start={{ x: 0.0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.9]}
                colors={["#282C31", "#22262B"]}
                style={{ ...globalStyles.btnContainer, width: 200 }}
              >
                <TouchableOpacity
                  style={{
                    ...globalStyles.mainBtns,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      ...globalStyles.titleText,
                      width: 130,
                    }}
                  >
                    SHARE
                  </Text>
                  <MaterialIcons name="share" size={36} color={colors.white} />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              height: 200,
              marginTop: 25,
            }}
          >
            <Text style={styles.heading}>OR</Text>
            <Text style={styles.littleText}>Enter their Connect Code</Text>
            <LinearGradient
              start={{ x: 0.0, y: 0.25 }}
              end={{ x: 1, y: 1.0 }}
              locations={[0, 1]}
              colors={["#2C333A", "#2C333A"]}
              style={globalStyles.inputContainer}
            >
              <TextInput
                placeholder="Enter Connect Code"
                placeholderTextColor="#FFFFFF75"
                style={globalStyles.input}
                onChangeText={(text) => setConnectorsCode(text)}
              />
            </LinearGradient>
            <LinearGradient
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1, y: 1.0 }}
              locations={[0, 1]}
              colors={["#1E89CC", "#9C14C4"]}
              style={
                !enableSubmit
                  ? {
                      ...globalStyles.btnContainer,
                      width: 200,
                      opacity: 1,
                    }
                  : {
                      ...globalStyles.btnContainer,
                      width: 200,
                      opacity: 0.4,
                    }
              }
            >
              <TouchableOpacity
                style={{ ...globalStyles.mainBtns, paddingVertical: 5 }}
                disabled={enableSubmit}
                onPress={() => navigation.navigate("Dashboard")}
              >
                <Text style={globalStyles.titleText}>connect</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() =>
              firebase
                .auth()
                .signOut()
                .then(() => {
                  dispatch(loggedOut());
                })
                .then(() => navigation.navigate("Login"))
            }
          >
            <Text style={styles.littleButton}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  black: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    height: "85%",
    minHeight: 550,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black,
    marginTop: 45,
    marginHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  smallText: {
    color: colors.white,
    fontFamily: "montserrat-bold",
    textAlign: "center",
    fontSize: 18,
  },
  heading: {
    color: colors.white,
    fontFamily: "montserrat-alternates",
    textAlign: "center",
    fontSize: 22,
  },

  bottom: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
    alignItems: "center",
    paddingTop: 25,
  },
  littleButton: {
    color: colors.white,
    fontFamily: "montserrat-regular",
    opacity: 0.8,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 5000,
  },
  littleText: {
    color: colors.white,
    textAlign: "left",
    paddingHorizontal: 20,
    fontSize: 16,
    lineHeight: 25,
    width: "100%",
  },

  code: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});