import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useEffect } from "react"
import { useState } from "react"
import { ScrollView, Text, View, StyleSheet, Button, Alert} from "react-native"

const PilhaTelas = createNativeStackNavigator()
const URL_API = 'https://jsonplaceholder.typicode.com/posts'

function TelaInicial({route, navigation}){
    const [ user, setUsers] = useState([])
    
    useEffect( ()=>{
        fetch(URL_API).then( resposta => resposta.json())
        .then( json => {setUsers( json )})
        .catch( () => {alert.alert("Erro ao carregar usuários")})
    },[])
    
    return(
       <ScrollView>
       <View style={styles.container}>
            <Text>Usuários </Text>
           { user.map( us => (
<View key={us.id} style={styles.cardContainer}> 
    <View><Text>Nome: {us.name}</Text>
<Text>Email: {us.email}</Text></View>
   
    <Button title="Ver Detalhes" color="green"
    onPress={()=>{navigation.navigate("VisualizarUsuario", {'id':us.id})}}/>
</View>
            ))}
        </View>
        </ScrollView>
    )
}

function VizualizarUsuario({route, navigation}){
    const [user, setUser] = useState( {} )
    useEffect( ()=>{
    fetch(`${URL_API}/${route.param.id}`)
    .then( response => response.json())
    .then( json => {setUser( json )})
    .catch( ()=> { alert.alert("erro", "não foi possível carregar")})
    }, [route.params.id])
    
    return(
    <ScrollView>
        <View style={styles.container}>
    {/* <Text>ID: {route.params.id}</Text> */}
    <Text>Nome: {user.name}</Text>
    <Text>Email: {user.email}</Text>
    
    <Text>Endereço</Text>
    <Text>Rua: {user.adress?.street}</Text>
        </View>
    </ScrollView>
    )}