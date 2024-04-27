import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import React from "react";
import { 
  ListFilm, 
  Login, 
} from "../pages";  
import Filter from "../pages/Filter";
import Sort from "../pages/Sort";
 
const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator> 
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FilterPage"
        component={Filter}
        options={{ title: "Edit Filter", headerShown: false }} 
      />
      <Stack.Screen
        name="SortPage"
        component={Sort}
        options={{ title: "Edit Sort", headerShown: false }} 
      />
      <Stack.Screen
        name="ListFilm"
        component={ListFilm}
        options={{ title: "Film", headerShown: false }}
      /> 
     
    </Stack.Navigator>
  );
};

export default Router;
