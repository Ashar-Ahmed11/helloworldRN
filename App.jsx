
import React from 'react';
import { useEffect } from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,

  View,
} from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function App() {

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

    const currentDate = new Date()
    settodo([...todo, { value: inputValue, date: currentDate.getDate().toLocaleString() }])
    setinputValue("")
 
    Keyboard.dismiss()

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
    <View style={{ flex: 1 }}>
      <Modal animationType="fade" transparent={true} visible={editMode}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              value={editInputValue}
              onChangeText={(text) => setEditInputValue(text)}
              style={styles.modalTextInput}
              placeholder='Edit'
            />
            <View style={styles.modalButtonContainer}>
              <View style={{paddingRight:5}}>
              <Button onPress={editTodo}  color={'royalblue'} title='Edit' />
              </View>
              <View style={{paddingLeft:5}}>
              <Button onPress={() => seteditMode(false)} title='Cancel' />
             </View>

            </View>
          </View>
        </View>
      </Modal>
      <Text style={styles.heading}>TODO APP</Text>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput value={inputValue} onChangeText={(text) => setinputValue(text)} style={{ borderWidth: 1, borderRadius: 20, padding: 10, flex: 8, margin: 5 }} placeholder='Write Your Task' />
          <TouchableOpacity onPress={() => { createTodo() }} style={{ borderWidth: 1, borderRadius: 20, padding: 10, flex: 1, margin: 5 }}>
            <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{  ...styles.shadow,margin: 20, flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding:10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>

          {todo && todo.map((e, i) => {
            return <View key={i} style={{ ...styles.shadow, margin: 5, padding: 10 ,flexShrink:1,width:'47%'}}>
              <Text style={{padding:10 ,flexShrink:1}}>{e.value}</Text>
  
              <View style={{ flexDirection: 'row'}}>
                <View style={{ padding: 5 }}>
                  <Button color={'royalblue'} onPress={() => openModal(i)} title='edit' />
                </View>
                <View style={{ padding: 5 }}>
                  <Button onPress={() => removeTodo(i)} title='remove' />
                </View>
              </View>
            </View>
          })}



        </ScrollView>
      </View>
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

export default App;
