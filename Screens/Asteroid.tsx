import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ScreenParamList } from '../App'
import axios from 'axios'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {s} from 'react-native-wind'

type asteroidDetailsTypes = {
    id: string | number | undefined;
    name: string | undefined;
    nasa_jpl_url: string | undefined;
    is_potentially_hazardous_asteroid: boolean | string | undefined;
}

const Asteroid: React.FC = () => {
    const [asteroidDetails, setAsteroidDetails] = React.useState<null | asteroidDetailsTypes>(null)
    const navigator = useNavigation<NativeStackNavigationProp<ScreenParamList,"Asteroid">>()
    const { params: { AsteroidId } } = useRoute<RouteProp<ScreenParamList, "Asteroid">>()
    const token: string = `bebnIzQMyvSKXryQwkaOmOpAfwIMQDnoXUpOwQcf`
    const url: string = `https://api.nasa.gov/neo/rest/v1/neo/${AsteroidId}?api_key=${token}`
    
    const fetch = async () => {
        try {
            const { data } = await axios.get(url)
            setAsteroidDetails(data)
        } catch (err) {
            alert('enter valid Asteroid Id')
            navigator.navigate("Home")
        }}
    React.useEffect(() => {
        fetch()
    }, [])

    return (
        <View style={s`h-full flex-col p-5`}>
            <Text style={styles.text}>Id: <Text style={styles.textt}>{asteroidDetails?.id}</Text></Text>
            <Text style={styles.text}>Name: <Text style={styles.textt}>{asteroidDetails?.name}</Text></Text>
            <Text style={styles.text}>Nasa_Jpl_Url: <Text style={styles.textt}>{asteroidDetails?.nasa_jpl_url}</Text></Text>
            <Text style={styles.text}>Is Potentially Hazardous Asteroid: <Text style={styles.textt}>{`${asteroidDetails?.is_potentially_hazardous_asteroid}`}</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        margin: 5,
        color: 'blue',
        lineHeight: 25,
    },
    textt: {
        fontSize: 17,
        color: 'black'
    }
})
export default Asteroid