import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task'

export default function App() {

  const[task, setTask] = useState();
  const[taskItems, setTaskItems] = useState([])

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style = {styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style = {styles.sectionTitle}>Today's tasks</Text>
        
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task  text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>

      </View>

      {/*Write a task*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={text => setTask(text)}
        />

        <TouchableOpacity onPress={() => handleAddTask()} >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E5',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#FFF9E5',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderColor: '#c0c0c0',
    borderRadius: 60,
    borderWidth: 1,
    width: 250
  },
  addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#c0c0c0',
    borderRadius: 60,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  addText:{

  }
});
