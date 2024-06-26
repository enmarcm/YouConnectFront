import { View, SectionList, Text, StyleSheet } from "react-native";
import ContactItem from "./ContactItem";
import getItemLayout from "react-native-section-list-get-item-layout";
import useContacts from "../customHooks/useContacts";

const ContactsView = () => {
  const { contactView, loading } = useContacts();

  if (loading) return null;

  if (!Array.isArray(contactView) || contactView.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
            No Contacts
          </Text>
          <Text style={{ fontSize: 16, color: "#666" }}>
            You don't have any contacts yet.
          </Text>
        </View>
      </View>
    );
  }

  const contactsGroupedByLetter = contactView.reduce(
    (groupedContacts: any, contact: any) => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!groupedContacts[firstLetter]) {
        groupedContacts[firstLetter] = [];
      }
      groupedContacts[firstLetter].push(contact);
      return groupedContacts;
    },
    {}
  );

  const sections = Object.keys(contactsGroupedByLetter)
    .sort()
    .map((letter) => ({
      title: letter,
      data: contactsGroupedByLetter[letter],
    }));

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderItem = ({ item }) => <ContactItem contact={item} />;

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        getItemLayout={getItemLayout({
          getItemHeight: () => 30,
          getSectionHeaderHeight: () => 15,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 1,
    paddingBottom: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
});
export default ContactsView;
