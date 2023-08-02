import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Tasks } from "../interfaces/tasks.interface";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

type Props = {
  tasksItem: Tasks;
  handleDelete: (id: string) => void;
};

export const TaskItem = ({ tasksItem, handleDelete }: Props) => {
  const navigation: any = useNavigation();

  return (
    <View key={tasksItem._id} style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>{tasksItem.title}</Text>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => handleDelete(tasksItem._id)}
        >
          <Ionicons name="close" size={30} color="#FF0000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>{tasksItem.description}</Text>
      <View style={styles.imageContent}>
        <Image source={{ uri: tasksItem.image }} style={styles.image} />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonContent}
        onPress={() =>
          navigation.navigate("UpdateScreen", { id: tasksItem._id })
        }
      >
        <Text style={styles.button}>Edit</Text>
        <Ionicons name="create" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
  },
  title: {
    marginBottom: 5,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 15,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
  },
  imageContent: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  buttonContent: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff681f",
    borderRadius: 10,
    padding: 10,
  },
  button: {
    marginRight: 7,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
