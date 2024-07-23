import { Text, SafeAreaView, View, StyleSheet, Pressable, TextInput, Alert } from "react-native"
import { FlatList } from "react-native";
import { useState, useEffect } from "react";
import TaskItem from "../components/TaskItem";
import { AntDesign } from '@expo/vector-icons';


/**
 *  @returns {JSX.Element} The rendered Task List Screen. 
 */
export default function TaskListScreen(){

    const [taskData, setTaskData] = useState([]); 

    const [filterMode, setFilterMode] = useState("all"); 

    const [filteredTaskData, setFilteredTaskData] = useState([]); 

    const [newTask, setNewTask] = useState(""); 

    /** 
     * Handles updating filteredTaskData depending on filterMode and taskData
     */
    useEffect(() => {
        const filterList = () => {
            setFilteredTaskData(
                filterMode === "all" ? taskData : 
                filterMode === "incomplete" ? taskData.filter(task => task.isCompleted === false) : 
                taskData.filter(task => task.isCompleted === true)
            )
        }
        filterList(); 
    }, [taskData, filterMode])


    /**
     * Handles addition of a new task item
     */
    const addTask = () => {
        if (newTask != ""){
            setTaskData((prevData) => ([
                ...prevData, 
                {details: newTask, isCompleted: false}
            ]))
            setNewTask("");
        }
    }

    /**
     * Handles checking/unchecking of a task item
     * @param {integer} index - the index of the task item to be updated
     */
    const checkTaskItem = (index) => {
        // // Copy taskData, update the item, update taskData
        let newArr = [...taskData]; 
        newArr[index].isCompleted = !newArr[index].isCompleted
        setTaskData(newArr); 
        console.log("Task item", taskData[index].details, "has been changed to", taskData[index].isCompleted);
    }

    /**
     * Handles deletion of a task item
     * @param {integer} index - the index of the task item to be deleted
     */
    const deleteTaskItem = (index) => {
        Alert.alert("Delete task?", "", [
            {
                text: 'Cancel', 
                onPress: () => console.log("Canceled"), 
                style: 'Delete task item canceled'
            },
            {
                text: 'Delete', 
                onPress: () => {
                    console.log("Task item", taskData[index].details, "has been deleted"); 
                    // Copy taskData, delete the item, update taskData
                    let newArr = [...taskData]; 
                    newArr.splice(index, 1); 
                    setTaskData(newArr); 
                }
            }
        ])
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.header}>My Tasks</Text>
                <Text style={styles.date}>{new Date().toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"}) }</Text>
            </View>
            <View style={styles.taskListContainer}>
                <View style={styles.filterButtonsContainer}>
                    <Pressable
                    style={styles.filterButton}
                    onPress={() => (console.log('Filter mode set to all'), setFilterMode("all"))}>
                        <Text style={filterMode === "all" ? {color: "#102D79", fontWeight: 'bold'} : {color: '#989898'}}>All</Text>
                    </Pressable>
                    <Pressable
                    style={styles.filterButton}
                    onPress={() => (console.log('Filter mode set to incomplete'), setFilterMode("incomplete"))}>
                        <Text style={filterMode === "incomplete" ? {color: "#102D79", fontWeight: 'bold'} : {color: '#989898'}}>Incomplete</Text>
                    </Pressable>
                    <Pressable
                    onPress={() => (console.log('Filter mode set to complete'), setFilterMode("complete"))}>
                        <Text style={filterMode === "complete" ? {color: "#102D79", fontWeight: 'bold'} : {color: '#989898'}}>Complete</Text>
                    </Pressable>
                </View>
                <FlatList 
                data={filteredTaskData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (<TaskItem taskDetails={item.details} isCompleted={item.isCompleted} index={index} checkTaskItem={checkTaskItem} deleteTaskItem={deleteTaskItem}/>)}
                ListFooterComponent={
                    <View style={styles.textInputContainer}>
                        <TextInput
                        onChangeText={setNewTask}
                        color='#737373'
                        value={newTask} 
                        placeholder={"Add a new task..."}
                        multiline={false}
                        maxLength={50}
                        style={styles.textInput}/>
                        <AntDesign name="plussquare" style={styles.addTaskBtn} onPress={addTask} size={35} color="#102D79" />
                    </View>
                }/>
            </View>
        </SafeAreaView>
    )

}

// Contains CSS styling information. 
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        flexDirection: 'column', 
        backgroundColor: '#102D79',
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
    filterButtonsContainer: {
        display: 'flex', 
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        marginVertical: 15,
    },
    taskListContainer: {
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15, 
        paddingTop: 10, 
        flex: 1,
        width: '100%',
        backgroundColor: "#F2F2F2", 
    }, 
    textInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff', 
        width: '90%',  
        borderRadius: 10, 
        padding: 20, 
        margin: 'auto',
        marginTop: 10, 
    },
    textInput: {
        flex: 1
    },
    addTaskBtn: {
        alignSelf: 'center'
    }, 
}); 