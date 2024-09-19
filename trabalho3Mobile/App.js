
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useEffect } from "react"
import { useState } from "react"
import { ScrollView, Text, View, StyleSheet, Button, Alert, SafeAreaView } from "react-native"
import SyncStorage from 'sync-storage'; //salvar dados localmente

const PilhaTelas = createNativeStackNavigator()
const URL_API = 'https://jsonplaceholder.typicode.com/posts'
const URL_API2 = 'https://jsonplaceholder.typicode.com/posts/:id/comments'

function TelaInicial({ route, navigation }) {
    const [user, setUsers] = useState([])

    useEffect(() => {
        fetch(URL_API).then(resposta => resposta.json())
            .then(json => setUsers(json))
            .catch(() => { Alert.alert("erro", "Erro ao carregar usuários") })
    }, [])

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.container}>
                    <Text> POST </Text>
                    <View style={styles.botao}>
                        <Button
                            title="Acessar os favoritos" color="blue" onPress={() => navigation.navigate("MeusFavoritos")} />
                    </View>
                    {user.map(us => (
                        <View key={us.id} >
                            <View>
                                <Text>titulo: {us.title}</Text>
                            </View>
                            

                            <Button style={styles.botao2} title="Ver Detalhes" color="green"
                                onPress={() => { navigation.navigate("VisualizarPost", { 'id': us.id }) }} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

//questao 2
function VisualizarPost({route, navigation}){
    const [comentario, setComentario] = useState( [] )
    useEffect( ()=>{
        var a = `${URL_API2.replaceAll(":id",route.params.id)}`
        console.log(a);
        
    fetch(a)
    .then( response => response.json())
    .then( json => {setComentario( json )})
    .catch( ()=> { alert.alert("erro", "não foi possível carregar os detalhes ")})
    }, [route.params.id])

    const marcarFavorito = async () => {
        try{
            const favoritado = SyncStorage.get('favoritado') || []

            const detalheFavorito = {
                id: route.params.id,
                title: route.params.title,
                body: route.params.body
            }
            const detalheF = favoritado.find (p =>p.id === detalheFavorito.id )
            if (!detalheF ){
                favoritado.push(detalheFavorito);
                SyncStorage.set('favoritado' , favoritado);
                Alert.alert("Comentário favoritado", "Esse comentário foi adicionado para a lista de favoritos!");

            }else{
                Alert.alert("Erro ", "Este cometário já está adicionado aos comentarios favoritos!"); 
            }
            
        }catch (error) {
                Alert.alert("Erro", "Não foi possível favoritar o post!");
                console.log(error.message);
                
        }
    }

    return(
        <ScrollView>
            <View>
            <View>
            <Text>Nome: {route.params.title}</Text>
            <Text>Comentário: {route.params.body}</Text>  
            </View>
            <Text style={styles.titulo}>Detalhes</Text>

            <Button title="Clique para favoritar" 
            color="red" onPress={marcarFavorito}></Button>
            <Text style={styles.com}>Comentários</Text>
                    {comentario.map(posts => (
                        <View key={posts.id} style={styles}>
                            <View style={styles}>
                                <Text style={styles.nome}>Nome: {posts.name}</Text>
                                <Text>Email: {posts.email}</Text>
                                <Text >Comentário: {posts.body.replaceAll("\n"," ")}</Text>
                            </View>
                        </View>
                    ))}
                    
                <Button style={styles.botao}
                  title='Tela inicial'
                   color="green"
                   onPress={()=>navigation.navigate("TelaInicial")}
               />
            </View>
        </ScrollView>
        
    );
} 


     function TelaDetalhes ({route, navigation}){
       
       return(
            <View style={styles.container}>
               <Text style={styles.titulo}>Detalhes</Text>
                <View style={styles.buttonContainer}>
                
                <Button
                  title='Tela inicial'
                   color="green"
                   onPress={()=>navigation.navigate("TelaInicial")}
               />
             </View>
               </View>
        );
     }


function MeusFavoritos({ navigation }) {
    const [postFavorito, setpostFavorito] = useState([]);
    useEffect(() => {
        const carregarTodosFavoritos = async () => {
            try {
                const favoritos = SyncStorage.get('favoritado') || [];
                console.log(favoritos)  // mostar no naveg
                setpostFavorito(favoritos);
            } catch (error) {
                Alert.alert("Erro", "Não é possível carregar todos os posts favoritos");
                console.log(error.message);
            }
        };
        carregarTodosFavoritos();
    },

        []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    <Text stylw={styles.texto}>Meus Post Favoritos!</Text>
                    {postFavorito.map(post => (
                    <View key={post.id} style={styles.container}>
                        <View style={styles.container}>
                        <Text>Título: {post.title}</Text>
                   </View> 
<View style={styles.container}>
   <Button
    title= "Ver os detalhes"
    color="Pink"
onPress={() => navigation.navigate("VisualizarPost", {id: post.id, title: post.title, body: post.body})}
/>
</View>
</View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}

export default function App() {

    return (
        <NavigationContainer>
            <PilhaTelas.Navigator initialRouteName='TelaInicial'>
                <PilhaTelas.Screen
                    name="TelaInicial"
                    component={TelaInicial}
                    options={{ title: "Tela inicial" }}
                />

                <PilhaTelas.Screen //questao 2 
                    name="TelaDetalhes"
                    component={TelaDetalhes}
                    options={{ title: "Detalhes" }}
                />
                <PilhaTelas.Screen
                    name="VisualizarPost"
                    component={VisualizarPost}
                    options={{ title: "VisualizarPost" }}
                />
                <PilhaTelas.Screen
                    name="MeusFavoritos"
                    component={MeusFavoritos}
                    options={{ title: "MeusFavoritos" }}
                />
            </PilhaTelas.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'top',
        width: '100%'
    },
    titulo: {
        marginTop: '10%',
        fontSize: 20
    },
    com:{
        margin: 5,
        fontSize: 20
    },
    nome:{
        margin: 5,
    },
    botao2: { 
        fontSize: 20,
        width: '100%',
        margin: 5
    }
});