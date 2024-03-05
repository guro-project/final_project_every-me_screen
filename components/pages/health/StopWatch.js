import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stopwatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(null);

    const startStopwatch = async () => {
        if (isRunning) {
            clearInterval(intervalRef.current);
        } else {
            const startTime = Date.now() - currentTime;

            intervalRef.current = setInterval(() => {
                setCurrentTime(Date.now() - startTime);
            }, 100);
        }
        setIsRunning(!isRunning);

        // AsyncStorage에 상태 저장
        await AsyncStorage.setItem('stopwatchTime', currentTime.toString());
        await AsyncStorage.setItem('isRunning', isRunning.toString());
        await AsyncStorage.setItem('stopwatchLaps', JSON.stringify(laps));
    };

    const resetStopwatch = async () => {
        clearInterval(intervalRef.current);
        setCurrentTime(0);
        setIsRunning(false);
        setLaps([]);

        // AsyncStorage 데이터 제거
        await AsyncStorage.removeItem('stopwatchTime');
        await AsyncStorage.removeItem('isRunning');
        await AsyncStorage.removeItem('stopwatchLaps');
    };

    const addLap = async () => {
        setLaps([...laps, currentTime]);
        await AsyncStorage.setItem('stopwatchLaps', JSON.stringify(laps));
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = ((time % 60000) / 1000).toFixed(1);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        const loadStopwatchData = async () => {
            const savedTime = await AsyncStorage.getItem('stopwatchTime');
            const savedIsRunning = await AsyncStorage.getItem('isRunning');
            const savedLaps = await AsyncStorage.getItem('stopwatchLaps');

            if (savedTime) {
                setCurrentTime(parseInt(savedTime, 10));
            }
            if (savedIsRunning) {
                setIsRunning(savedIsRunning === 'true'); // 문자열 boolean으로 변환
            }
            if (savedLaps) {
                setLaps(JSON.parse(savedLaps));
            }
        };
        loadStopwatchData();

        // 페이지 이동/뒤로가기 시 currentTime 0으로 초기화
        return () => {
            setCurrentTime(0);
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.centerContent}>
                <Text style={styles.time}>{formatTime(currentTime)}</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={startStopwatch}>
                        <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={addLap}>
                        <Text style={styles.buttonText}>Lap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={resetStopwatch}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.lapsContainer}>
                {laps.map((time, index) => (
                    <Text key={index} style={styles.lap}>{index + 1} Lap {formatTime(time)}</Text>
                ))}
                </ScrollView>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    centerContent: {
        alignItems: 'center',
        marginBottom: 20,
    },
    time: {
        fontSize: 80,
        fontWeight: 'bold',
        color: 'white',
    },
    lapsContainer: {
        width: '100%',
        maxHeight: 300,
        paddingHorizontal: 20,
    },
    lap: {
        fontSize: 25,
        color: 'white',
        marginBottom: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    button: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginVertical: 20,
        backgroundColor: '#03C75A',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default Stopwatch;
