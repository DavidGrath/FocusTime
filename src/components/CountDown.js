import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/styles';

function minutesToMilis(min) {
  return min * 1000 * 60;
}

function formatMillis(millis) {
  const time = new Date(millis);
  const mm = time.getMinutes();
  const ss = time.getSeconds();
  return String(mm).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
}

export const CountDown = ({ minutes = 0.1, state = "paused", timeChanged, onDone }) => {
  
  const [millis, setMillis] = useState(null);
  const interval = React.useRef(null);

  function countDown() {
    setMillis((time) => {
      if (time - 1000 <= 0) {
        return 0;
      } else {
        const timeLeft = time - 1000;
        return timeLeft;
      }
    });
  }

  useEffect(() => {
    timeChanged(millis/minutesToMilis(minutes));
    if(millis === 0) {
      onDone();
    }
  }, [millis]);

  useEffect(()=> {
    setMillis(minutesToMilis(minutes))
  }, [minutes])
  useEffect(() => {
    if (state === "paused" || state === "done") {
      if(interval.current) clearInterval(interval.current)
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [state]);

  return (
    <View>
      <Text style={styles.timer}>{formatMillis(millis)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    padding: spacing.medium,
    backgroundColor: '#5E84E24D',
  },
});
