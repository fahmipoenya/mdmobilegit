import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CardJersey } from '../../kecil'
import { useSelector } from 'react-redux' 
import CardFilm from '../../kecil/CardFilm'
import { colors, fonts, numberWithCommas, responsiveWidth } from '../../../utils';

const ListFilms = ({ films, cari, filter1, filter2 }) => { 
  //cara tampung nilai Asli  
  // const [dataTampil, setDataTampil] = useState(films)
  // let dataTampil = [...films]
  // let dataHasilFilter = [...films]


  //   if (filter1 && filter2){
  //     dataHasilFilter = dataHasilFilter.filter((film)=> film.Kategori.toLowerCase().includes(filter1.toLowerCase())
  //                                   && film.RumahProduksi.toLowerCase().includes(filter2.toLowerCase()))
  //   } else if (filter1 && !filter2){
  //     dataHasilFilter = dataHasilFilter.filter((film)=> film.Kategori.toLowerCase().includes(filter1.toLowerCase()))
  //   } else if (!filter1 && filter2){
  //     dataHasilFilter = dataHasilFilter.filter((film)=> film.RumahProduksi.toLowerCase().includes(filter2.toLowerCase()))
  //   }else {
  //     dataHasilFilter = films
  //   }
  //   // setDataTampil(dataHasilFilter);
  //   dataTampil = dataHasilFilter
    if (cari){
      films = films.filter((film)=> film.Judul.toLowerCase().includes(cari.toLowerCase()))
    }
    return (
        <View style={styles.containers}>
            {films.map((film, index) => {
                    return <CardFilm film={film} key={index} />;
                    //     <View style={styles.container}>
                    //       <TouchableOpacity style={styles.card}> 
                    //         <View>
                              
                    //           <Text style={styles.textBold}>{film.Judul}</Text>
                    //           <View style={styles.cardkecil}>
                    //             <View>
                    //               <Text style={styles.text}>{film.RumahProduksi}</Text>
                    //               <Text style={styles.text}>{film.TanggalEdar}</Text> 
                    //             </View>
                    //             <View style={styles.wraper}></View>
                    //             <View>
                    //               <Text style={styles.text}>Gendre</Text> 
                    //               <Text style={styles.text}>{film.Kategori}</Text>
                    //             </View>
                    //             <View style={styles.wraper}></View>
                    //             <View style={{alignItems: 'center'}}>
                    //               <Text style={{fontFamily: fonts.primary.regular, fontSize: 10}}>Total Penonton</Text>
                    //               <Text style={styles.textBold}>
                    //                 {numberWithCommas(film.JumlahPenonton)}
                    //                 {/* {film.JumlahPenonton} */}
                    //               </Text>
                    //             </View>
                    //           </View>
                    //         </View>
                    //       </TouchableOpacity>
                    
                    //       {/* <Tombol type="text" title="Detail" padding={7} onPress={() => navigation.navigate('FilmDetail', { film }) }/> */}
                    //     </View>
                    //   );
                    })}
        </View>
    );
}; 
export default ListFilms

const styles = StyleSheet.create({
    containers: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'space-between',
        marginTop: 10,
        // borderWidth: 1,
        // borderColor: 'blue'
    },
    container: {
        justifyContent: 'center',
        flexDirection: 'column',
        // justifyContent:'center'
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'red'
      },
      card: {
        backgroundColor: 'white',
        // width: responsiveWidth(350),
        // width: '100%',
        padding: 5,
        borderRadius: 10,
        // elevation: 5, 
        marginBottom: 5,
        borderColor: 'black',
        borderWidth: 0.5,  
      },
      cardkecil: {
        flexDirection: 'row',
        // width: responsiveWidth(320),
        // width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        // borderWidth: 1,
      },
      text: {
        fontFamily: fonts.primary.regular,
        fontSize: 10,
        textTransform: 'capitalize',
        textAlign: 'center',
        width: 70,
      },
      textBold: {
        fontFamily: fonts.primary.bold,
        fontSize: 15,
        textTransform: 'capitalize',
        textAlign: 'left',
        // marginLeft: 10,
        fontWeight: 'bold',
        color: 'black'
      }, 
      wraper: {
        borderWidth: 0.5,
        borderColor: 'black',
      },
})
