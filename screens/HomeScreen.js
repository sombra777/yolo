import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filteredData, setFilterData] = useState([]);

  useEffect(() => {
    fetchData("https://randomuser.me/api/?results=50");
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);
      setFilterData(json.results);
      console.log(json.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      headerTitle: "Home",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Stack")}
          style={{
            backgroundColor: "purple",
            width: 30,
            height: 30,
            borderRadius: 10,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "white",
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      ),
      headerSearchBarOptions: {
        placeholder: "Buscar",
        onChangeText: (text) => {
          setFilterFunction(text.nativeEvent.text);
        },
      },
    });
  }, []);

  const setFilterFunction = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.name.first
          ? item.name.first.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        console.log(text);
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(data);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.textFriends}>Friends</Text>
      {filteredData.map((item, index) => {
        return (
          <View key={index} style={styles.container}>
            <Image source={{ uri: item.picture.large }} style={styles.img} />
            <View>
              <Text style={styles.textName}>
                {item.name.first} {item.name.last}
              </Text>
              <Text style={styles.textEmail}>{item.login.username}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textFriends: {
    fontSize: 20,
    textAlign: "left",
    marginLeft: 10,
    fontWeight: "bold",
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600",
  },
  textEmail: {
    fontSize: 14,
    marginLeft: 10,
    color: "grey",
  },
});
