import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default function SearchBar({ city, setCity, onSearch }) {
  const [isFocused, setIsFocused] = useState(false);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={
          isFocused
            ? ['#00c6ff', '#0072ff']
            : ['#cccccc20', '#33333310']
        }
        style={styles.gradientBorder}
      >
        <View style={styles.inputRow}>
          <Ionicons name="search-outline" size={22} color="#ccc" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Search for a city..."
            placeholderTextColor="#aaa"
            value={city}
            onChangeText={setCity}
            returnKeyType="search"
            onSubmitEditing={onSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Animated.View style={[styles.animatedButtonWrapper, animatedStyle]}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={onSearch}
              style={styles.searchButton}
            >
              <Ionicons name="arrow-forward-circle" size={28} color="#1c92d2" />
            </Pressable>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  gradientBorder: {
    borderRadius: 16,
    padding: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#fff',
  },
  animatedButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  searchButton: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
});
