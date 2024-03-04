import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Stopwatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(null);

    const startStopwatch = () => {
        if (isRunning) {
            clearInterval(intervalRef.current);
        } else {
            const startTime = Date.now() - currentTime;
            intervalRef.current = setInterval(() => {
                const now = Date.now();
                setCurrentTime(now - startTime);
            }, 100);
        }
        setIsRunning(!isRunning);
    };

    const resetStopwatch = () => {
        clearInterval(intervalRef.current);
        setCurrentTime(0);
        setIsRunning(false);
        setLaps([]); // Reset laps
    };

    const addLap = () => {
        setLaps([...laps, currentTime]); // Save current time to laps array
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = ((time % 60000) / 1000).toFixed(1);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

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
        </View>
        <ScrollView style={styles.lapsContainer}>
            {laps.map((time, index) => (
                <Text key={index} style={styles.lap}>{index + 1} Lap {formatTime(time)}</Text>
            ))}
        </ScrollView>
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
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
    },
    lapsContainer: {
        width: '100%',
        maxHeight: 150,
        marginTop: 10,
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#03C75A',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default Stopwatch;
