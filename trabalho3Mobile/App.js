
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
                    <Text> Post </Text>
                    <View style={styles.botao}>
                        <Button
                            title="Acessar os favoritos" color="blue" onPress={() => navigation.navigate("Meus Favoritos")} />
                    </View>
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

// function VisualizarPost({ route, navigation }) {
//     const [user, setUser] = useState({})
//     useEffect(() => {
//         fetch(`${URL_API2}/${route.params.id}`)
//             .then(response => response.json())
//             .then(json => { setUser(json[0]) })
//             .catch(() => { Alert.alert("erro", "não foi possível carregar") })
//     }, [route.params.id])
    
//     return(
//     <ScrollView>
//         <View style={styles.container}>
//     {/* <Text>ID: {route.params.id}</Text> */}
//     <Text>Nome: {user.name}</Text>
//     <Text>Email: {user.email}</Text>
//     <Text>Endereço</Text>
//     <Text>Rua: {user.adress?.street}</Text>

//         </View>
//     </ScrollView>
//     )}


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
                body: route.param.body
            }
            const detalheF = favoritado.find (p =>p.id === detalheFavorito.id )
            if (!detalheF ){
                favoritado.push(detalheFavorito);
                SyncStorage.set('favoritado' , favoritado);
                Alert.alert("Comentário favoritado", "Esse comentário foi add para a lista de favoritos!");

            }else{
                Alert.alert("Erro ", "este cometário já foi adicionado aos comentarios favoritados"); 
            }
            
        }catch (error) {
                Alert.alert("Erro", "Não foi possível favoritar o post.");
                console.log(error.message);
                
        }
    }

    return(
        <ScrollView>
            <View>
            {/* <View>
            <Text>Nome: {user.name}</Text>
            <Text>Comentário: {user.body}</Text>  
            <Text>Email: {user.email}</Text>
            </View> */}
            <Button title="Clique para favoritar" 
            color="red" onPress={marcarFavorito}></Button>
            <Text style={styles}>Comentários</Text>
                    {comentario.map(pt => (
                        <View key={pt.id} style={styles}>
                            <View style={styles}>
                                <Text>Nome: {pt.name}</Text>
                                <Text>Email: {pt.email}</Text>
                                <Text>Comentário: {pt.body.replaceAll("\n"," ")}</Text>
                            </View>
                        </View>
                    ))}
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
        );
     }


function MeusFavoritos({ navigation }) {
    conts[postFavorito, setpostFavorito] = useState([]);
    useEffect(() => {
        const carregarTodosFavoritos = async () => {
            try {
                const favoritos = SyncStorage.get('favoritos') || [];
                // console.log(favoritos)  // mostar no naveg
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