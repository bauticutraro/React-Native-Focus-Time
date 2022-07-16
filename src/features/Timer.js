import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from './Timing';
import { theme } from '../utils/theme';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  0,
  1 * ONE_SECOND_IN_MS,
  0.5 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];
// android: "wait 0s, vibrate 1s, wait 0.5s, vibrate 1s"
// ios: "wait 0s, vibrate, wait 1s, vibrate, wait 0.5s, vibrate, wait 1s"

// const PATTERN = 1000

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake()
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(1/6);

  const handleOnEnd = (reset, minutes) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd({title: focusSubject, duration:minutes})
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          onProgress={setProgress}
          isPaused={!isStarted}
          onEnd={handleOnEnd}
        />
        <View style={{ paddingTop: theme.spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: theme.spacing.sm }}>
        <ProgressBar
          color={theme.colors.primary}
          progress={progress}
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="-" onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    paddingTop: theme.spacing.xxl,
    flexDirection: 'row',
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: theme.colors.white,
    textAlign: 'center',
  },
});
