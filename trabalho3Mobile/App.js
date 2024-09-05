


function TelaDetalhes ({route, navigation}){
    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Detalhes</Text>
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
              <PilhaTelas.Screen
                  name="TelaDetalhes"
                  component={TelaDetalhes}
                  options={{title:"Detalhes"}}
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