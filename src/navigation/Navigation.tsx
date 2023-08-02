import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screen/LoginScreen";
import { HomeScreen } from "../screen/HomeScreen";
import { RegisterScreen } from "../screen/RegisterScreen";
import { SendChangePassEmailScreen } from "../screen/SendChangePassEmailScreen";
import { ForgotScreen } from "../screen/ForgotScreen";
import { CreateScreen } from "../screen/CreateScreen";
import { UpdateScreen } from "../screen/UpdateScreen";

const Stack = createStackNavigator();

export const Navigation = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="SendChangePassEmailScreen"
        component={SendChangePassEmailScreen}
      />
      <Stack.Screen name="ForgotScreen" component={ForgotScreen} />

      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CreateScreen" component={CreateScreen} />
      <Stack.Screen
        name="UpdateScreen"
        component={UpdateScreen}
        // initialParams={{ params: id}}
      />
    </Stack.Navigator>
  );
};
