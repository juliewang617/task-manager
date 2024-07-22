import { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native"

export default function TaskItem({taskDetails, isCompleted}){

    const [completionStatus, setCompletionStatus] = useState(false); 

    return(
        <View style={styles.container}>
            <Text style={styles.taskDetails}>{taskDetails}</Text>
            <Text>{isCompleted.toString()}</Text>
        </View>
    )

}

// Contains CSS styling information. 
const styles = StyleSheet.create({
    container: {
        margin: 'auto', 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 20, 
        borderRadius: 10, 
        marginVertical: 10, 
        width: "90%", 
        backgroundColor: '#fff'
    }, 
    taskDetails: {
        fontWeight: 'bold', 
    }
}); 