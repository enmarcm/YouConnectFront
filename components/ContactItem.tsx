import React, { FC } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ContactItemProps } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigate } from "react-router-native";
import { useCommunication } from "../customHooks/useCommunication";
import TextTicker from 'react-native-text-ticker';

const ContactItem: FC<ContactItemProps> = ({ contact }) => {
  const navigate = useNavigate();

  const { handleCallPress, handleSmsPress } = useCommunication();

  const handlePress = () => {
    navigate(`contacts/${contact.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image source={{ uri: contact.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <TextTicker
          style={styles.name}
          duration={3000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={1000}
        >
          {contact.name}
        </TextTicker>
        <Text style={styles.number}>{contact.number[0]}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => handleSmsPress(contact.number[0])}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="chatbubble-outline" size={30} color="green" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleCallPress(contact.number[0])}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="call-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "column",
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  number: {
    fontSize: 14,
    color: "gray",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 60,
    gap: 10,
    marginRight: 10,
  },
});

export default ContactItem;
