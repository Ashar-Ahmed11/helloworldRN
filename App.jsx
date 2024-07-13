
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './components/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, shadow, Text } from 'react-native-paper';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { RNDrawer } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState } from 'react';



function HeaderTitle() {
  return (
    <Text variant='displayMedium' style={{ padding: 20, fontFamily: 'sans-serif-medium' }}>TODO APP</Text>
  );
}



function App() {


  const [dividerToggler, setDividerToggler] = useState(false)
  const Stack = createNativeStackNavigator();

  return (

    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>


        <NavigationContainer>
          <Stack.Navigator>
        <Stack.Screen name="Home"  component={Home} options={{title:"Home",headerShadowVisible:false}} />
       
      </Stack.Navigator>
          {/* <Drawer.Navigator >
            <Drawer.Screen name="Home" component={Home} />

          </Drawer.Navigator> */}
        </NavigationContainer>



      </SafeAreaView>

    </SafeAreaProvider>


  );

}

export default App;
