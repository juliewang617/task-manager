import { Text, StyleSheet, Pressable } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


/**
 * @param {string} taskDetails - the task item's details
 * @param {boolean} isCompleted - true if the task is checked, false otherwise 
 * @param {integer} index - an integer representing the task item's index in the 
 * larger taskData array. 
 * @param {function} checkTaskItem - the check event handler (trigerred by 
 * pressing the checkbox icon)
 * @param {function} deleteTaskItem - the delete event handler (triggered by 
 * long press)
 * @returns {JSX.Element} The rendered Task Item component 
 */
export default function TaskItem({taskDetails, isCompleted, index, checkTaskItem, deleteTaskItem}){
    return(
        <Pressable
        style={[{backgroundColor: isCompleted ? '#CAE2D9' : '#fff'}, styles.container]}
        onLongPress={() => (deleteTaskItem(index))}
        >
            <Text style={[{color: isCompleted ? '#388186' : '#737373'}, styles.taskDetails]}>{taskDetails}</Text>
            <Pressable
            onPress={()=>(checkTaskItem(index))}>
                {isCompleted ? <Ionicons name="checkbox" size={24} color="#57B09B" />
                : <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="#737373" />}
            </Pressable>
        </Pressable>
    )

}

// Contains CSS styling information. 
const styles = StyleSheet.create({
    container: {
        margin: 'auto', 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: 20, 
        borderRadius: 10, 
        marginVertical: 10, 
        width: "90%", 
    }, 
    taskDetails: {
        fontWeight: 'bold', 
    }
}); 