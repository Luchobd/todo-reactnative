import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesGlobal } from "../theme/global";
import { FormInput } from "../components/FormInput";
import { useForm, Controller } from "react-hook-form";
import { getTask, updateTask } from "../api/task";

type FormData = {
  title: string;
  description: string;
  image: string;
};

type UpdateScreenParams = {
  id: string;
};

type UpdateScreenRouteProp = RouteProp<
  Record<string, UpdateScreenParams>,
  string
>;

export const UpdateScreen = () => {
  const navigation: any = useNavigation();

  useEffect(() => {
    const getTaskDetails = async () => {
      try {
        const response = await getTask(id);
        setValue("title", response.title);
        setValue("description", response.description);
        setValue("image", response.image);
      } catch (error) {
        console.error("Error getting task details:", error);
      }
    };
    getTaskDetails();
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const route = useRoute<UpdateScreenRouteProp>();
  const { id } = route.params;
  const onSubimit = async (data: FormData) => {
    if (!id) return;
    await updateTask(id, data);
    navigation.navigate("HomeScreen");
  };

  return (
    <SafeAreaView style={stylesGlobal.globalBackground}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ top: 20, width: 50, height: 50 }}
      >
        <Ionicons
          name="arrow-undo"
          size={40}
          color="#A448FF"
          style={{ position: "relative" }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.title}>Update Task</Text>
        <ScrollView>
          <View style={styles.inputContent}>
            <Controller
              control={control}
              name="title"
              rules={{
                required: "Title is required",
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  title="Title"
                  placeholder="Enter Title"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.title?.message && (
              <Text style={styles.errorText}>{errors.title.message}</Text>
            )}
          </View>
          <View style={styles.inputContent}>
            <Controller
              control={control}
              name="description"
              rules={{
                required: "Description is required",
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  title="Description"
                  placeholder="Enter description"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.description?.message && (
              <Text style={styles.errorText}>{errors.description.message}</Text>
            )}
          </View>
          <View style={styles.inputContent}>
            <Controller
              control={control}
              name="image"
              rules={{
                pattern: {
                  message: "Invalid image url",
                  value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
                },
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  title="Image"
                  placeholder="Enter image"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.image?.message && (
              <Text style={styles.errorText}>{errors.image.message}</Text>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonContent}
            onPress={handleSubmit(onSubimit)}
          >
            <Text style={styles.button}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 30,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContent: {
    marginBottom: 20,
  },
  buttonContent: {
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#A448FF",
    borderRadius: 8,
  },
  button: {
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    marginTop: 5,
    color: "#ff0000",
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
  },
});
