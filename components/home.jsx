
import React from 'react';
import { useEffect } from 'react';
import {

  Keyboard,
  StyleSheet,


  View,
} from 'react-native';
import { useState } from 'react';
import { Card, TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TouchableRipple } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { Alert } from 'react-native';
import {Appbar} from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import  {SafeAreaProvider} from 'react-native-safe-area-context';

// import { TouchableRipple } from 'react-native-paper';
function Home() {

  useEffect(() => {

    const localporcess = async () => {
      const todolist = await AsyncStorage.getItem('mytodo')
      console.log("dasdjsoajdoksajokdasjo")
      if (todolist) {
        const todo = await JSON.parse(todolist)
        settodo(todo)
        console.log("todo", todo)
      }
    }
    localporcess()
    console.log("I RAN")
  }, [])



  const [todo, settodo] = useState([])


  const [inputValue, setinputValue] = useState("")
  const [editInputValue, setEditInputValue] = useState("")
  const [todoIndex, settodoIndex] = useState(null)
  const createTodo = () => {

    if (inputValue == "") {
      Alert.alert(
        'Alert Title',
        'My Alert Msg'

      );
    }

    else {
      const currentDate = new Date()
      settodo([...todo, { value: inputValue, date: currentDate.getDate().toLocaleString() }])
      setinputValue("")

      Keyboard.dismiss()
    }
    // console.log(todo)
  }


  const removeTodo = (given) => {
    settodo(todo.filter((e, i) => { return i != given }))
  }

  const [editMode, seteditMode] = useState(false)

  const openModal = (i) => {
    settodoIndex(i)
    seteditMode(true)
    // console.log(i)
  }
  const editTodo = () => {
    const editedTodo = [...todo]
    editedTodo[todoIndex].value = editInputValue
    settodo(editedTodo)
    console.log(todo)
    seteditMode(false)
    setEditInputValue("")
    // console.log(todoIndex)
  }

  useEffect(() => {
    const saveData = async () => {
      try {
        const jsonValue = JSON.stringify(todo);
        await AsyncStorage.setItem('mytodo', jsonValue);
      } catch (e) {
        // saving error
      }
    };
    saveData();
    console.log("SUCCESS")
  }, [todo]);


  return (
    
   
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Modal animationType="fade" transparent={true} visible={editMode}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              value={editInputValue}
              onChangeText={(text) => setEditInputValue(text)}
              outlineStyle={{ borderRadius: 10 }}
              placeholder='Edit'
              mode='outlined'
            />
            <View style={styles.modalButtonContainer}>
              <View style={{ paddingRight: 5 }}>
                <Button style={{ backgroundColor: 'white' }} onPress={editTodo} mode="elevated" >
                  Edit
                </Button>
              </View>
              <View style={{ paddingLeft: 5 }}>

                <Button style={{ backgroundColor: 'white' }} mode='elevated' onPress={() => seteditMode(false)}>
                  Cancel
                </Button>
              </View>

            </View>
          </View>
        </View>
      </Modal>
     
      <Text variant='displayMedium' style={{ padding: 20, fontFamily: 'sans-serif-medium' }}>TODO APP</Text>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <TextInput style={{ flex: 9, marginRight: 10, backgroundColor: 'white' }} outlineStyle={{ borderRadius: 20, borderColor: 'lightgrey' }} value={inputValue} onChangeText={(text) => setinputValue(text)} mode='outlined' placeholder='Write Your Task' />

          {/* <TouchableOpacity onPress={() => { createTodo() }} style={{ borderWidth: 1, borderRadius: 20, padding: 10, flex: 1, margin: 5 }}>
            <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>
              Add
            </Text>
          </TouchableOpacity> */}

          <Button style={{ flex: 1, backgroundColor: 'white', borderRadius: 10 }} rippleColor="rgba(0, 0, 0, .32)" onPress={() => createTodo()} mode='elevated'>
            Add
          </Button>

        </View>
      </View>

      <Card style={{ backgroundColor: 'white', margin: 15, flex: 1, borderRadius: 20 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 10, flexDirection: 'row', paddingVertical: 10, flexWrap: 'wrap', justifyContent: "space-between" }}>

          {todo && todo.map((e, i) => {
            return <Card key={i} style={{ width: "48%", marginTop: 10, paddingVertical: 10, backgroundColor: 'white' }} >
              <View style={{ height: 180 }}>
                <View style={{ flex: 8 }}>
                  <ScrollView>
                    <Text variant='headlineSmall' style={{ padding: 10, fontFamily: 'sans-serif-light' }}>{e.value}</Text>
                  </ScrollView>
                </View>

                <View style={{ flex: 2, flexDirection: "row" }}>
                  <View style={{ flex: 1, paddingHorizontal: 7 }} >
                    <Button compact={true} style={{ borderRadius: 10, flex: 1, backgroundColor: 'white' }} onPress={() => openModal(i)} mode='elevated'>
                      Edit
                    </Button>
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 7 }}>

                    <Button compact={true} style={{ borderRadius: 10, flex: 1, backgroundColor: 'white' }} onPress={() => removeTodo(i)} mode='elevated' >

                      Remove

                    </Button>
                  </View>
                </View>

              </View>
            </Card>
          })}



        </ScrollView>
      </Card>
      </View>

  );

}
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjust the width as needed
    maxWidth: 400,
  },
  modalTextInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    borderColor: 'grey',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  shadow: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 20
  },
  heading: {
    fontSize: 30,
    color: 'black',
    paddingTop: 10,
    // flex:1,

    textAlign: 'center'

  },
  container: {
    // justifyContent:'center',
    flex: 1,
    // flexDirection:'row'
    padding: 10

  }
});

export default Home;
