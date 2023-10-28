import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const ParameterDialog = ({ isVisible, onClose, onSave }) => {
  const [bookingTime, setBookingTime] = useState('');
  const [peopleNumber, setPeopleNumber] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSave = () => {
    // Validate and save the parameters
    if (bookingTime && peopleNumber && additionalInfo) {
      onSave({ bookingTime, peopleNumber, additionalInfo });
    }
  };

  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <View style={styles.dialogContainer}>
        <Text style={styles.dialogTitle}>Enter Booking Parameters</Text>
        <TextInput
          style={styles.input}
          placeholder="Booking Time"
          value={bookingTime}
          onChangeText={setBookingTime}
        />
                        <TextInput
          style={styles.input}
          placeholder="People number"
          value={peopleNumber}
          onChangeText={setPeopleNumber}
        />
                        <TextInput
          style={styles.input}
          placeholder="additional info"
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
        />
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dialogContainer: {
    width: 300, // Set the width to your desired value
    height: 200, // Set the height to your desired value
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});


export default ParameterDialog;
