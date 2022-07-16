import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { theme } from '../utils/theme';

export const FocusHistory = ({ history }) => {
  if (!history || !history.length)
    return <Text style={styles.title}>We haven't focused on anything yet</Text>;

  const renderItem = ({ item }) => (
    <Text style={styles.item}>- {item.title} ({item.duration} mins)</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things we've focused on:</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    flex: 1,
  },
  title: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.lg,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: theme.spacing.md,
  },
  item: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.md,
    paddingTop: theme.spacing.md,
  },
});
