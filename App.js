import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/screens/Focus';
import { FocusHistory } from './src/components/FocusHistory';
import { Timer } from './src/screens/Timer';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

import { spacing } from './src/utils/styles';
import { colors } from './src/utils/colors';
import { STATUSES } from './src/utils/constants';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  useEffect(() => {
    if (focusSubject) {
      focusSubject.status = STATUSES.NEW;
      focusSubject.key = String(focusHistory.length + 1);
      setFocusHistory([...focusHistory, focusSubject]);
    }
  }, [focusSubject]);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  useEffect(() => {
    loadFocusHistory();
  }, []);

  function onClear() {
    setFocusHistory([]);
  }

  async function saveFocusHistory() {
    try {
      await AsyncStorage.setItem('FocusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  }

  async function loadFocusHistory() {
    try {
      const history = await AsyncStorage.getItem('FocusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  }
  console.log(focusHistory);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            focusSubject.status = STATUSES.COMPLETED;
            setFocusSubject(null);
          }}
          clearSubject={() => {
            focusSubject.status = STATUSES.CANCELLED;
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? spacing.large : spacing.medium,
    backgroundColor: colors.background,
  },
});
