import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Constants from 'expo-constants';
import { theme } from './src/utils/theme';
import { Focus } from './src/features/Focus';
import { FocusHistory } from './src/features/FocusHistory';
import { Timer } from './src/features/Timer';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState('');
  const [history, setHistory] = useState([]);

  const handleAddSubject = (sbj) => {
    setCurrentSubject(sbj);
  };
  const handleClearSubject = (sbj) => {
    setCurrentSubject('');
  };
  const handleOnTimerEnd = (sbj) => {
    setCurrentSubject('');
    setHistory([...history, sbj]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <>
          <Focus addSubject={handleAddSubject} />
          <FocusHistory history={history} />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={handleOnTimerEnd}
          clearSubject={handleClearSubject}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: theme.colors.darkBlue,
  },
});
