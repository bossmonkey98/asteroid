import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Asteroid from './Screens/Asteroid';
import Home from './Screens/Home';
import { s } from 'react-native-wind'

export type ScreenParamList = {
  Home: undefined;
  Asteroid: { AsteroidId: string | number | null | undefined }
}

export default function App() {
  const url: string = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY`
  const Stack = createNativeStackNavigator<ScreenParamList>()
  return (
    <NavigationContainer >
      <View style={s`h-full`}>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={Home} options={{ title: "Home" }} />
          <Stack.Screen name='Asteroid' component={Asteroid} options={{ title: "About Asteroid" }} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

