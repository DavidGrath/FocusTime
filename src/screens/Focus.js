import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { RoundedButton } from "../components/RoundedButton";
import { spacing, fontSizes } from "../utils/styles";
import { colors } from "../utils/colors";

export const Focus = ({addSubject}) => {

  const [toDoItem, setToDoItem] = useState(null)

  return (
    <View style = {styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to do today?</Text>
        <View style={styles.inputContainer}>
        <TextInput style={{flex : 1, marginRight : 20}} 
          onSubmitEditing={({nativeEvent}) => {
              setToDoItem({
                title: nativeEvent.text,
              })
            }
          }/>
        <RoundedButton title="+" size={50} onPress={()=>addSubject(toDoItem)}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 0.5,
  },
  innerContainer : {
    flex : 1,
    padding : spacing.medium,
    justifyContent : "center"
  },
  title : {
    fontSize : fontSizes.large,
    color : "white",
    fontWeight : "bold"
  },
  inputContainer : {
    paddingTop : spacing.medium,
    flexDirection : "row",
    alignItems : "center"
  }
})