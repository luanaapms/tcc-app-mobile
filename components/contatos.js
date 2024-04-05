import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import * as Contacts from 'expo-contacts';

export default function Contatos({ navigation }) {
  const [contatos, setContatos] = useState([]);
  const [contatosFavoritos, setContatosFavoritos] = useState([]);
  const [inMemoryContacts, setInMemoryContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        setLoading(true);
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });

        const contactsWithFavorites = data.map((contact) => ({
          ...contact,
          isFavorite: false,
        }));

        setContatos(contactsWithFavorites);
        setInMemoryContacts(contactsWithFavorites);
      }
    })();
  }, []);

  const searchContacts = (value) => {
    setSearchTerm(value);
    setSearching(true);
    const filteredContacts = inMemoryContacts.filter((contact) => {
      const contactLowercase = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      const searchTermLowercase = value.toLowerCase();
      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    setContatos(filteredContacts);
    updateFavoritesList(filteredContacts);
  };

  const toggleFavorite = (contactId) => {
    const updatedContacts = contatos.map((contact) => {
      if (contact.id === contactId) {
        contact.isFavorite = !contact.isFavorite;
      }
      return contact;
    });

    setContatos(updatedContacts);
    updateFavoritesList(updatedContacts);
  };

  const updateFavoritesList = (contactsList) => {
    const favorites = contactsList.filter((contact) => contact.isFavorite);
    setContatosFavoritos(favorites);
  };

  const clickItemFlatList = (item) => {
    toggleFavorite(item.id);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearching(false);
    setContatos(inMemoryContacts);
    updateFavoritesList(inMemoryContacts);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#dddddd"
        style={{
          backgroundColor: '#2f363c',
          height: 50,
          fontSize: 25,
          padding: 10,
          color: 'white',
          borderBottomWidth: 0.5,
          borderBottomColor: '#7d90a0',
        }}
        value={searchTerm}
        onChangeText={(value) => searchContacts(value)}
      />
      <View style={styles.contactsContainer}>
        <Text style={styles.headerText}>Favorites</Text>
        <FlatList
          data={contatosFavoritos}
          renderItem={({ item }) => (
            <View style={{ minHeight: 70, padding: 5 }}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 26 }}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>
                {item.phoneNumbers[0]?.number || 'No phone number'}
              </Text>
              <TouchableOpacity onPress={() => clickItemFlatList(item)}>
                <Text>{item.isFavorite ? 'Unfavorite' : 'Favorite'}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
              }}
            ></View>
          )}
        />
      </View>
      <View style={styles.contactsContainer}>
        <Text style={styles.headerText}>Seus Contatos</Text>
        {searching ? (
          <FlatList
            data={contatos}
            renderItem={({ item }) => (
              <View style={{ minHeight: 70, padding: 5 }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 26 }}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>
                  {item.phoneNumbers[0]?.number || 'No phone number'}
                </Text>
                <TouchableOpacity onPress={() => clickItemFlatList(item)}>
                  <Text>{item.isFavorite ? 'Unfavorite' : 'Favorite'}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50,
                }}
              >
                <Text style={{ color: '#010101'}}>Nenhum contato foi encontrado</Text>
              </View>
            )}
          />
        ) : (
          <FlatList
            data={contatos}
            renderItem={({ item }) => (
              <View style={{ minHeight: 70, padding: 5 }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 26 }}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>
                  {item.phoneNumbers[0]?.number || 'No phone number'}
                </Text>
                <TouchableOpacity onPress={() => clickItemFlatList(item)}>
                  <Text>{item.isFavorite ? 'Unfavorite' : 'Favorite'}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50,
                }}
              ></View>
            )}
          />
        )}
      </View>
      
      <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
        <Text style={{ color: 'white' }}>Clear Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  contactsContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#2f363c',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});
