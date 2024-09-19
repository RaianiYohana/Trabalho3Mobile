
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useEffect } from "react"
import { useState } from "react"
import { ScrollView, Text, View, StyleSheet, Button, Alert, SafeAreaView} from "react-native"
import SyncStorage from 'sync-storage'; //salvar dados localmente

const PilhaTelas = createNativeStackNavigator()
const URL_API = 'https://jsonplaceholder.typicode.com/posts'
const URL_API2 = 'https://jsonplaceholder.typicode.com/posts/1/comments'

function TelaInicial({ route, navigation }) {
    const [user, setUsers] = useState([])

    useEffect(() => {
        fetch(URL_API).then(resposta => resposta.json())
            .then(json => setUsers(json))
            .catch(() => { Alert.alert("erro","Erro ao carregar usuários") })
    }, [])

    return (
        
        <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.container}>
                <Text> Post </Text>
                {user.map(us => (
                    <View key={us.id} >
                        <View>
                            <Text>titulo: {us.title}</Text>
                          </View>

                        <Button title="Ver Detalhes" color="green"
                            onPress={() => { navigation.navigate("VisualizarPost", { 'id': us.id }) }} />
                    </View>
                ))}
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

function VisualizarPost({ route, navigation }) {
    const [user, setUser] = useState({})
    useEffect(() => {
        fetch(`${URL_API2}/${route.params.id}`)
            .then(response => response.json())
            .then(json => { setUser(json[0]) })
            .catch(() => { Alert.alert("erro", "não foi possível carregar") })
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


//questao 2
function Detalhes({route,navigation}){
    const [user, setUser] = useState( {} )
    useEffect( ()=>{
    fetch(`${URL_API2}/${route.param.id}`)
    .then( response => response.json())
    .then( json => {setUser( json )})
    .catch( ()=> { alert.alert("erro", "não foi possível carregar os detalhes ")})
    }, [route.params.id])

    return(
        <ScrollView>
            <Text>Nome: {user.name}</Text>
            <Text>Comentário:</Text>   //ARRUMAR NAO TERMINEI
        </ScrollView>
    )
} 

//questao 2 
    function TelaDetalhes ({route, navigation}){
       
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>Detalhes</Text>
                <View style={styles.buttonContainer}>
                <Button
                    title='Voltar'
                    color="black"
                    onPress={()=>navigation.goBack()}
                />
                <Button
                    title='Tela inicial'
                    color="black"
                    onPress={()=>navigation.navigate("TelaInicial")}
                />
            </View>
                </View>
        )
    }

    export default function App() {
      
        return (
          <NavigationContainer>
              <PilhaTelas.Navigator initialRouteName='TelaInicial'>
                  <PilhaTelas.Screen
                      name="TelaInicial"
                      component={TelaInicial}
                      options={{title:"Tela inicial"}}
                  />
                  
                  <PilhaTelas.Screen //questao 2 
                      name="TelaDetalhes"
                      component={TelaDetalhes}
                      options={{title:"Detalhes"}}
                  />
                  <PilhaTelas.Screen
                      name="VisualizarPost"
                      component={VisualizarPost}
                      options={{title:"VisualizarPost"}}
                  />
                 {/* <PilhaTelas.Screen
                      name="TelaHistorico"
                      component={TelaHistorico}
                      options={{title:"Histórico"}}
                  /> */}
            </PilhaTelas.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'top',
        width: '100%'
    },
    titulo: {
        marginTop: '10%',
        fontSize: 20
    },
});