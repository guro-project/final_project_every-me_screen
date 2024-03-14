// import { useRoute } from "@react-navigation/native";
// import { useState } from "react";
// import { Modal, Pressable, StyleSheet, Text, View } from "react-native"


// const FoodRegistered = () => {

//   const [modalVisible, setModalVisible] = useState(false);
//   const route = useRoute();
//   const dietName = route.params ? route.params.dietName : null;
//   const selectedMethod = route.params ? route.params.selectedMethod : null;
//   const totalCalories = route.params ? route.params.totalCalories : null;
//   const totalCarbohydrate = route.params ? route.params.totalCarbohydrate : null;
//   const totalProvince = route.params ? route.params.totalProvince : null;
//   const totalProtein = route.params ? route.params.totalProtein : null;
//   const totalSalt = route.params ? route.params.totalSalt : null;

//   return (
//     <View>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}>
//         <View>
//           <View style={sytles.modalView}>
//             <Text style={{ fontSize: 20 }}>{totalCalories}Kcal {totalCarbohydrate} {totalProtein} {totalProvince} {totalSalt}</Text>
//             <Pressable
//               onPress={() => setModalVisible(!modalVisible)}>
//               <Text>닫기</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//       <Pressable onPress={() => setModalVisible(true)}>
//         {dietName !== null && totalCalories !== null && selectedMethod !== null &&
//           <Text>{selectedMethod} 이름 : {dietName} 총 칼로리 : {totalCalories}Kcal</Text>}
//       </Pressable>
//     </View>
//   )
// }

// export default FoodRegistered;

// const sytles = StyleSheet.create({
//   touch: {
//       borderWidth: 1
//   },
//   centeredView: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: 22,
//   },
//   modalView: {
//       marginTop:'30%',
//       backgroundColor: 'white',
//       borderRadius: 20,
//       padding: 10,
//       alignItems: 'center',
//       shadowColor: '#000',
//       shadowOffset: {
//           width: 0,
//           height: 2,
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 4,
//       elevation: 5,
//       width:'100%',
//       height:'90%',
//   },
//   button: {
//       borderRadius: 20,
//       padding: 10,
//       elevation: 2,
//   },
//   buttonOpen: {
//       backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//       backgroundColor: '#2196F3',
//   },
//   textStyle: {
//       color: 'white',
//       fontWeight: 'bold',
//       textAlign: 'center',
//   },
//   modalText: {
//       marginBottom: 15,
//       textAlign: 'center',
//   }
// })