import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { s } from 'react-native-wind'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenParamList } from '../App'


const Home: React.FC = () => {
  const [asteroidId, setAsteroidId] = React.useState<string>('')
  const url: string = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY`
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const navigator = useNavigation<NativeStackNavigationProp<ScreenParamList,"Home">>()

  const fetch = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(url)
      setAsteroidId(await res.data.near_earth_objects[Math.floor(Math.random() * 10)].id)
      setIsLoading(false)
    } catch (err) {
      console.warn(err)
    }
  }
  return (
    <View style={s`h-full flex-col justify-center items-center`}>
      {
        !isLoading ?
          <View>
            <TextInput style={styles.container} onChangeText={(e) => setAsteroidId(e)}
              placeholder='Enter Asteroid Id' value={asteroidId ? asteroidId : undefined} />
            <View style={styles.btnWrap}>
              <TouchableOpacity style={asteroidId ? styles.primaryBtn : styles.disabled} disabled={asteroidId ? true : false}>
                <Text style={{ color: '#fff', fontSize: 18 }}
                  onPress={() => {
                    if (asteroidId) navigator.navigate('Asteroid', { AsteroidId: asteroidId })
                    else alert('please enter asteroid Id')
                }}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryBtn}>
                <Text style={{ color: '#fff', fontSize: 18 }} onPress={fetch}>Random</Text>
              </TouchableOpacity>
            </View>
          </View> : <View style={s`h-full flex-col justify-center items-center`}><Text style={{ fontSize: 18 }}>Loading...</Text></View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 50,
    borderWidth: 1,
    borderColor: 'blue',
    paddingLeft: 10,
    margin: 5,
    fontSize: 18,
  },
  btnWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  primaryBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    height: 50,
    backgroundColor: 'blue',
    margin: 5,
  },
  disabled: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'grey',
    margin: 5,
  },
})

export default Home