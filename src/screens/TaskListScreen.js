import { Text, SafeAreaView, View, StyleSheet, Pressable, TextInput } from "react-native"
import { FlatList } from "react-native";
import { useState } from "react";
import TaskItem from "../components/TaskItem";
import { AntDesign } from '@expo/vector-icons';

export default function TaskListScreen(){

    const [taskData, setTaskData] = useState([]); 

    const [newTask, setNewTask] = useState(""); 

    const addTask = () => {

        if (newTask != ""){
            setTaskData((prevData) => ([
                ...prevData, 
                {details: newTask, isCompleted: false}
            ]))
            setNewTask(""); 
        }
    }

    const addTaskItemBtn = () => {
        return(
            <View style={styles.textInput}>
                <TextInput
                onChangeText={setNewTask}
                value={newTask} 
                placeholder={"Add a new task..."}
                multiline={false}
                maxLength={100}/>
                <AntDesign name="plussquare" style={styles.addTaskBtn} onPress={addTask} size={35} color="#102D79" />
            </View>
        )

    }
    
    return(

        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.header}>My Tasks</Text>
                <Text style={styles.date}>{new Date().toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"}) }</Text>
                <View style={styles.taskListContainer}>
                    <FlatList 
                    data={taskData}
                    renderItem={(item) => (<TaskItem taskDetails={item.item.details} isCompleted={item.item.isCompleted}/>)}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={addTaskItemBtn}/>

                </View>
            </View>
        </SafeAreaView>
    )

}

// Contains CSS styling information. 
const styles = StyleSheet.create({
    container: {
        width: 'auto',
        flex: 1, 
        backgroundColor: '#102D79',
        overflow: 'hidden', 
    },
    header: {
        color: '#fff',
        fontWeight: 'bold', 
        fontSize: 32,
        marginHorizontal: 'auto',
        marginTop: 20, 
        marginBottom: 8, 
    }, 
    date: {
        color: '#989898', 
        margin: 'auto', 
        marginBottom: 20, 
    },
    taskListContainer: {
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15, 
        width: 'auto',
        height: 520, 
        backgroundColor: "#F2F2F2", 
    }, 
    textInput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff', 
        width: '90%',  
        borderRadius: 10, 
        padding: 20, 
        margin: 'auto',
        marginTop: 10, 
    },
    addTaskBtn: {
        alignSelf: 'center'
    }, 
}); 