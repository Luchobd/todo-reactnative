import { FlatList, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { stylesGlobal } from "../theme/global";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../context/auth/Context";
import { deleteTask, getTasks } from "../api/task";
import { TaskItem } from "../components/TaskItem";
import Ionicons from "@expo/vector-icons/Ionicons";

export const HomeScreen = () => {
  const isFocused = useIsFocused();
  const navigation: any = useNavigation();
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const onDelete = async(id: string) => {
    await deleteTask(id);
    loadTasks();
  }

  useEffect(() => {
    tokenLogin(getToken!);
  }, [isFocused]);

  useEffect(() => {
    loadTasks();
  }, [isFocused]);


  const { getToken, tokenLogin } = useContext(AuthContext);

  return (
    <SafeAreaView style={stylesGlobal.globalBackground}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate("CreateScreen")}
      >
        <Ionicons name="add" size={60} color="#fff" style={styles.addIcon} />
      </TouchableOpacity>
      <FlatList
        style={{ width: "100%" }}
        data={tasks}
        renderItem={({ item }) => <TaskItem tasksItem={item} handleDelete={onDelete} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={["#fff"]}
            progressBackgroundColor={"#0a3d62"}
            refreshing={false ? true : false}
            onRefresh={loadTasks}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    marginVertical: 20,
    textAlign: "right",
  },
});
