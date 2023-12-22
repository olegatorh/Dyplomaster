import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, Text, TextInput, View} from 'react-native';
import Modal from 'react-native-modal';
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import styles from "./style";
import {check_current_seats} from "../../../apiRequests/places";

const ParameterDialog = ({isVisible, onClose, onSave, token, place_id, seats}) => {
    const [peopleNumber, setPeopleNumber] = useState('1');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [bookingDate, setBookingDate] = useState(new Date());
    const [bookingTimeStart, setBookingTimeStart] = useState(new Date());
    const [bookingTimeEnd, setBookingTimeEnd] = useState(new Date());
    const [availableSeats, setAvailableSeats] = useState(null); // State for available seats

    useEffect(() => {
        // Define the calculate_seats function here (you need to implement this)
        // const calculate_seats = () => {
        //     // Calculate available seats based on bookingTimeStart, bookingDate, and bookingTimeEnd
        //     // For demonstration, I'm using a random number here. You should replace this with your actual logic.
        //     const randomSeats = Math.floor(Math.random() * 15); // Replace with your logic
        //     return randomSeats;
        // };
        check_current_seats({'token': token, 'date_time': bookingTimeStart, 'place': place_id}).then(
            (response) => {
                setAvailableSeats(seats - response.data.seats_taked)

                // setAvailableSeats(updatedSeats.length);
            })


    }, [bookingTimeStart, bookingDate, bookingTimeEnd]);


    const onChange = (event, selectedDate, timeType) => {
        if (timeType === 'dateStart') {
            setBookingDate(selectedDate);
        } else if (timeType === 'timeStart') {
            const newDateTime = new Date(bookingDate); // Create a new Date object
            newDateTime.setHours(selectedDate.getHours());
            newDateTime.setMinutes(selectedDate.getMinutes());
            setBookingTimeStart(newDateTime);
        } else if (timeType === 'timeEnd') {
            const newDateTime = new Date(bookingDate); // Create a new Date object
            newDateTime.setHours(selectedDate.getHours());
            newDateTime.setMinutes(selectedDate.getMinutes());
            setBookingTimeEnd(newDateTime);
        }
    };


    const currentDate = new Date();
    const maxDate = currentDate.setDate(currentDate.getDate() + 2);
    const minDate = currentDate.setDate(currentDate.getDate() - 2);

    const showMode = (currentMode, timeType) => {
        let timeValue;
        if (timeType === 'dateStart') {
            timeValue = bookingDate;
        } else if (timeType === 'timeStart') {
            timeValue = bookingTimeStart;
        } else if (timeType === 'timeEnd') {
            timeValue = bookingTimeEnd;
        }

        DateTimePickerAndroid.open({
            maximumDate: maxDate,
            minimumDate: minDate,
            display: 'spinner',
            value: timeValue,
            onChange: (event, selectedDate) => onChange(event, selectedDate, timeType),
            mode: currentMode,
            is24Hour: true,
        });
    };

    const handleIncrement = () => {
        setPeopleNumber(prevValue => String(parseInt(prevValue, 10) + 1));
    };
    
    const handleDecrement = () => {
        if (parseInt(peopleNumber, 10) > 0) {
            setPeopleNumber(prevValue => String(parseInt(prevValue, 10) - 1));
        }
    };
    
    const showDatepicker = () => {
        showMode('start', 'dateStart');
    };

    const showTimepickerStart = () => {
        showMode('time', 'timeStart');
    };

    const showTimepickerEnd = () => {
        showMode('time', 'timeEnd');
    };

    const handleSave = () => {
        // Validate and save the parameters
        if (bookingTimeStart && bookingTimeEnd && peopleNumber && additionalInfo) {
            onSave({bookingTimeStart, bookingTimeEnd, peopleNumber, additionalInfo});
        }
    };

    return (
        <Modal isVisible={isVisible} style={styles.modal}>
            <View style={styles.makeBcontainer}>
                <Text style={{fontSize: 20, textAlign: 'center', alignItems: 'center',}}>Введіть дані замовлення</Text>
                <SafeAreaView style={styles.buttons}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{margin: 5}}>
                            <Button onPress={showDatepicker} title="Оберіть дату"/>
                        </View>
                        <View style={{margin: 5}}>
                            <Button onPress={showTimepickerStart} title="Початок"/>
                        </View>
                        <View style={{margin: 5}}>
                            <Button onPress={showTimepickerEnd} title="Кінець"/>
                        </View>
                    </View>
                </SafeAreaView>
                <View style={{fontSize: 15, alignItems: 'left', padding: 5}}>
                    <Text>Дата: {bookingDate.toLocaleDateString('en-GB',{
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }).replace(/\//g, '.')}</Text>
                    <Text>Час: {bookingTimeStart.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    })} - {bookingTimeEnd.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    })}</Text>
                    <Text style={{color: availableSeats < 10 ? 'red' : 'black'}}>
                        Кількість вільних місць на обраний час: {availableSeats}
                    </Text>
                </View>
                    <View style={styles.numberInputContainer}>
                        <Text style={styles.numberInputLabel}>Кількість місць:</Text>
                        <View style={styles.numberInputButtons}>
                        <Button title="-" onPress={handleDecrement} style={styles.buttonPadding} />
                        <Text style={styles.numberInputValue}>{peopleNumber}</Text>
                        <Button title="+" onPress={handleIncrement} style={styles.buttonPadding} />
                    </View>
                </View>
                <TextInput
                    style={styles.dialogInput}
                    placeholder="Додаткова інформація"
                    value={additionalInfo}
                    onChangeText={setAdditionalInfo}
                />
                <View style={styles.buttons}>

                    <View style={{padding: 2}}>
                        <Button
                            title="Відмінити"
                            style={{padding: 2, color: 'red', backgroundColor: '#f44336'}}
                            onPress={onClose}
                        />
                    </View>
                    <View style={{padding: 2}}>
                        <Button title="Замовити" style={{padding: 2}} onPress={handleSave}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ParameterDialog;
