import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

//재료박스 페이지
const IngredientsBasket = ({ clickedNames, setClickedNames, recommendedNames, setRecommendedNames }) => {

    // 검색으로 담은 데이터 삭제 이름으로 구별해서 삭제함
    const removeItem = (nameToRemove) => {
        setClickedNames(prevClickedNames => prevClickedNames.filter(name => name !== nameToRemove));
    }
    // 버튼으로 담은 데이터 삭제
    const removeButton = (buttonToRemove) => {
        setRecommendedNames(prevClickedNames => prevClickedNames.filter(name => name !== buttonToRemove));
    }

    // clickedNames와 recommendedNames를 합친 배열
    const allNames = [...clickedNames, ...recommendedNames];

    return (
        <>
            <View>
                <Text style={styles.titleText}>재료 바구니</Text>
                <View style={styles.ingreBox}>
                    {/* 검색으로 담은건지 버튼으로 담은건지 구별하고 맞는거에 따라 삭제함수 실행함 */}
                    {clickedNames.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => {
                            if (clickedNames.includes(item)) {
                                removeItem(item);
                            } else if (recommendedNames.includes(item)) {
                                removeButton(item);
                            }
                        }}>
                            <View style={styles.ingreItems}>
                                <Text style={styles.listMargin}>{item.DESC_KOR}</Text>
                                <Ionicons name="close-outline" style={styles.close}/>
                            </View>
                            
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.oneBorderLine}></View>
        </>
        
    );
}

export default IngredientsBasket;

const styles = StyleSheet.create({
    listMargin: {
        marginBottom: 7,
        color: 'white',
    },
    titleText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 10,
    },
    ingreBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    oneBorderLine: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
        opacity: 0.5,
        width: '100%',
        height: 1,
    },
    close: {
        fontSize: 30,
        color: 'white',
        position: 'absolute',
        right: -30,
        bottom: -2,
    },
    ingreItems: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 7,
    }
})