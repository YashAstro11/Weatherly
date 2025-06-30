import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <Ionicons name="partly-sunny" size={32} color="#fff" />
        <Text style={styles.title}>Weatherly</Text>
      </View>
      <Text style={styles.date}>{currentDate}</Text>
      <Text style={styles.subText}>Made by Yash</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  date: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 4,
  },
  subText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
    fontStyle: 'italic',
  },
});
