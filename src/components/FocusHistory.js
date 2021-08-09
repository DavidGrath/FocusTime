import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../utils/styles';
import { strings } from '../utils/strings';
import { STATUSES } from '../utils/constants';
import { RoundedButton } from './RoundedButton';

function FocusHistoryItem({ item, index }) {
  return <Text style={historyItem(item.status)}>{item.title}</Text>;
}

export function FocusHistory({ focusHistory, onClear }) {
  function clearHistory() {
    onClear();
  }

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>{strings.focusHistoryTitle}</Text>

            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={FocusHistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton size={75} title="Clear" onPress={()=>onClear()}/>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
}
//Quick Note:
//I tried making this an anonymous function as described in the tutorial, but
// an error kept popping up on the web version specifically. Thanks to:
// https://www.udemy.com/user/shameek-agarwal/ in the comments, this is my
// workaround
function historyItem(status) {
  return {
    color: status === STATUSES.CANCELLED ? 'red' : 'blue',
    fontSize: fontSizes.medium,
  };
}
const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: fontSizes.large,
  },
  clearContainer: {
    alignItems : "center",
    spacing : spacing.medium
  }
});
