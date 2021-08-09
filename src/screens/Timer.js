import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { colors } from '../utils/colors';
import { spacing } from '../utils/styles';
import { RoundedButton } from '../components/RoundedButton';
import { CountDown } from '../components/CountDown';
import { Timing } from '../components/Timing';

const DEFAULT_TIME = 0.1;

export function Timer({ focusSubject , onTimerEnd, clearSubject}) {
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [countDownState, setCountDownState] = useState('paused');
  const [progress, setProgress] = useState(1.0);

  function changeTime(time) {
    setMinutes(time);
    setProgress(1.0);
    setCountDownState("paused")
  }

  function onDone() {
    // State doesn't change when new value is equal to old value
    // This is my current workaround. Will look into it
    setMinutes(0);
    setMinutes(DEFAULT_TIME);
    setProgress(1.0);
    setCountDownState("paused")
    vibrate();
    onTimerEnd();
  }
  function vibrate() {
    if(Platform.OS === "ios") {
      const interval = setInterval(()=> {
        Vibration.vibrate();
      }, 1000)
      setTimeout(()=> {
        clearInterval(interval)
      }, 10000)
    } else {
      Vibration.vibrate(10000)
    }
  }


  function getStateTitle() {
    if (countDownState === 'paused') {
      return 'Start';
    } else if (countDownState === 'running') {
      return 'Pause';
    } else if (countDownState === 'done') {
      return 'Done';
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          minutes={minutes}
          state={countDownState}
          timeChanged={setProgress}
          onDone={onDone}
        />
      </View>
      <View style={{ paddingTop: spacing.xl }}>
        <Text style={styles.title}>Focusing on: </Text>
        <Text style={styles.task}>{focusSubject.title}</Text>
      </View>
      <View style={{ paddingTop: spacing.small, paddingBottom: spacing.small }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={getStateTitle()}
          onPress={() => {
            if (countDownState == 'done') {
              return;
            }
            if (countDownState === 'paused') {
              setCountDownState('running');
            } else if (countDownState == 'running') {
              setCountDownState('paused');
            }
          }}
        />
      </View>
      <View style={styles.clearSubject}>
          <RoundedButton 
          title="-"
          size={50}
          onPress={clearSubject}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  title: {
    color: 'white',
    textAlign: 'center',
  },

  task: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom : 25,
    paddingLeft: 25
  }
});
