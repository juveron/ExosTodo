/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const App: () => Node = () => {
  const light = '#fff';
  const dark = '#888';

  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const addTask = () => {
    if (task && task.length > 0) {
      setTaskList([...taskList, {id: Math.random().toString(), text: task}]);
      setTask(null);
    }
  };

  const removeTask = index => {
    const tmpArray = [...taskList];
    tmpArray.splice(index, 1);
    setTaskList(tmpArray);
  };

  const Task = item => {
    return (
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 6,
          marginVertical: 10,
          backgroundColor: !isEnabled ? light : dark,
          justifyContent: 'center',
          flex: 1,
          width: '100%',
        }}
        onPress={() => removeTask(item.id)}>
        <Text style={{color: 'black', textAlign: 'center', padding: 10}}>
          {item.item.text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.centerView,
          backgroundColor: !isEnabled ? light : dark,
        }}>
        <View style={{padding: 10}}>
          <Switch
            trackColor={{false: '#767577', true: '#0085f2'}}
            thumbColor={isEnabled ? '#8a5df2' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <TextInput
          textAlign={'center'}
          textAlignVertical={'center'}
          style={{
            width: 200,
            borderRadius: 6,
            borderWidth: 1,
            backgroundColor: !isEnabled ? light : dark,
            paddingVertical: 5,
            paddingHorizontal: 10,
            alignSelf: 'center',
            marginVertical: 10,
          }}
          value={task}
          multiline={true}
          placeholder={'Tape here'}
          onChangeText={value => setTask(value)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 10,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: !isEnabled ? light : dark,
              borderRadius: 6,
              borderWidth: 1,
            }}
            onPress={addTask}>
            <Text style={{color: 'black', textAlign: 'center', padding: 10}}>
              Add new task
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: !isEnabled ? light : dark,
              borderRadius: 6,
              borderWidth: 1,
            }}
            onPress={() => setTaskList([])}>
            <Text style={{color: 'black', textAlign: 'center', padding: 10}}>
              Remove All tasks
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{alignSelf: 'center', marginHorizontal: 10}}
          contentContainerStyle={{
            justifyContent: 'center',
            paddingBottom: 10,
            marginVertical: 10,
          }}
          keyExtractor={item => item.id}
          data={taskList}
          renderItem={Task}
        />
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142542',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  centerView: {
    width: windowWidth * 0.9,
    maxHeight: '80%',
    borderRadius: 6,
  },
});

export default App;
