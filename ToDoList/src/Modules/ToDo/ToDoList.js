import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Text, Platform, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Metrics } from '../../StylingConstants';
import { useThemedValues } from '../Theming';


import Icon from '../../Components/Icon';
import { Svgs } from '../../StylingConstants';

import getStyles from './Styles/ToDoScreenStyles';

import { useLocalization, texts } from '../Localization';
import { deleteItem, updateNote, subscribeToNoteData} from './API/Firebase';
import { useNavigation } from '@react-navigation/core';



const ToDoList = props => {
    const [noteList, setNoteList] = useState(null);
    const [isDeleteModeOn, setIsDeleteModeOn] = useState(false);
    const [isDoneList, setIsDoneList] = useState(false);

    const loc = useLocalization();
    const { styles } = useThemedValues(getStyles);

    useEffect(() => {
        const off = subscribeToNoteData(noteList => {
            setNoteList(noteList)
        });
        return () => off();
            
        
    }, []);
    const navigation = useNavigation();

    const _onPress_Edit = item => {
        //Burada yaptığımız işlem AddNoteScreen'e item'in Id'sini göndermek.
        {
            isDeleteModeOn ? setIsDeleteModeOn(false) : 
            navigation.navigate("addnote-screen",{ itemKey: item.key})
        }
    }
    
    // Silmek için bu fonksiyonu kullanıyoruz.
    const _onPress_Delete = (item) => {
        // deleteItem firebase'den geliyor.
            deleteItem(item.key)
    }

    const _onLongPress_Delete = () => {
        setIsDeleteModeOn(true)
    }
    
    const _onPress_Done = (item) => {
        item.isComplated = true
        updateNote(item)
    }

    const _onPress_Undone = (item) => {
        item.isComplated = false
        updateNote(item)
    }
    
    const getNoteList = (isComplated) => {
        if (noteList === null) {
            return null
        }
        const resultList = [];
        for (let index = 0; index < noteList.length; index++) {
            const noteItem = noteList[index];
            if (isComplated === noteItem.isComplated) {
                resultList.push(noteItem)
            }
        }
        return resultList;
    }

    const _renderToDoItem = ({ item }) => {

        return (
            <View style={styles.todoBox}>
                <TouchableOpacity style={styles.checkIconContainer} onPress = {() => _onPress_Done(item)}>
                    <Icon iconStyle={styles.checkIcon} svg={Svgs.Checkbox} />
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.titleContainer} 
                onLongPress={() => _onLongPress_Delete()}
                onPress={() => _onPress_Edit(item)}>
                    <Text style={styles.messageText}>{item.taskname}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteIconContainer} onPress={() => _onPress_Delete(item)} >
                    {
                        isDeleteModeOn ? <Icon iconStyle={styles.deleteIcon} svg={Svgs.DeleteIcon} /> : null
                    }
                </TouchableOpacity>
            </View>
        )
    };

    const _renderDoneItem = ({ item }) => {
        return (
                <View style={styles.doneBox}>
                <TouchableOpacity style={styles.checkedIconContainer} onPress = {() => _onPress_Undone(item)} >
                    <Icon iconStyle={styles.checkedIcon} svg={Svgs.Checkedbox} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.doneTitleContainer}
                onLongPress={() => _onLongPress_Delete()}
                onPress={() => _onPress_Edit(item)}
                >
                    <Text style={styles.doneMessageText}>{item.taskname}</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.deleteIconContainer} onPress={() => _onPress_Delete(item)} >
                    {
                        isDeleteModeOn ? <Icon iconStyle={styles.deleteIcon} svg={Svgs.DeleteIcon} /> : null
                    }
                </TouchableOpacity>
                </View>
        )
    }
    
    return (
        <>
        
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Metrics.navBarHeight * 1.6}
            >
                <View style={styles.flatListContainer}>
                    <View style={styles.todoBoxContainer}>
                        <FlatList
                            style={{ flexGrow: 0 }}
                            data={getNoteList(false)}
                            renderItem={_renderToDoItem}
                            keyExtractor={item => item.key}
                        />
                    </View>
                </View>
                <View style={styles.completedTextContainer}>
                    <Text style={styles.completedText}>
                        {loc.t(texts.completed)}
                    </Text>
                </View>
                <View style={styles.flatListDoneContainer}>
                    <View style={styles.todoBoxContainer}>
                        <FlatList
                            style={{ flexGrow: 0 }}
                            data={getNoteList(true)}
                            renderItem={_renderDoneItem}
                            keyExtractor={item => item.key}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </>
    )
};

export default ToDoList;
