import React,  { useEffect, useState } from 'react'; 
import Constants  from 'expo-constants';
import { View, StyleSheet, Text, ScrollView, Image} from 'react-native';
import { Feather as Icon} from '@expo/vector-icons';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api';

const Points: React.FC = () => {
  const navigation = useNavigation();

    // INTERFACE
    interface Item {
      id: number,
      title: string,
      image_url: string,
    };
    
    // STATES
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] =  useState<number[]>([]);

  // FUNCTIONS  
  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    })
  },[])

  function handleSelectItem(id: number){
    // Find the index of id
    const alreadySelected = selectedItems.findIndex(item => item === id);

    //If do not have de id inside array will return - 1
    if(alreadySelected >= 0){
      // Receive all the array less the id
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);
    }else{
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  function handleNavigateBack(){
    navigation.goBack();
  }

  function handleNavigateDetails(){
    navigation.navigate('Details');
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={24} color="#34cb79"/>
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 40.7143528,
              longitude: -74.0059731,
              latitudeDelta: 0.014,
              longitudeDelta: 0,
            }}
            >
              <Marker
                onPress={ handleNavigateDetails }
                style={styles.mapMarker}
                coordinate={{
                  latitude: 40.7143528,
                  longitude: -74.0059731,
                }}
              >
                <View style={styles.mapMarkerContainer}>
                  <Image 
                    style={styles.mapMarkerImage}
                    source={{uri: "https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"}} />
                  <Text style={styles.mapMarkerTitle}>Mercado</Text>
                </View>
              </Marker>
            </MapView>
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {items.map(item => (
              <TouchableOpacity
                activeOpacity={0.6}
                key={String(item.id)}
                style={[
                  styles.item,
                  selectedItems.includes(item.id) ? styles.selectedItem : {}
                ]}
                onPress={() => handleSelectItem(item.id)}>
                <SvgUri width={42} height={42} uri={item.image_url}/>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </>
  );
}

export default Points;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});