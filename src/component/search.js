import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { Searchbar } from 'react-native-paper'
import Result from './resultSearch'

// Penggunaan EndPoint api 
const url = 'https://nextar.flip.id/frontend-test'

const search = () => {

    // Kumpulan useState untuk mengubah state dan pengolahan data, seperti search value
    const [input, setInput] = useState('');
    const [data, setData] = useState([]);
    const [memory, setMemory] = useState([])
    const [loading, setLoading] = useState(false);
    var array = []

    // Penggunaan useEffect mempermudah kita untuk lifecycle dari react
    useEffect(() => {
        getData()
    }, []);

    // Function yang digunakan untuk mengambil json dari url endpoint
    const getData = async () => {
        try {
            setLoading(true)
            await fetch(url, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(response => {
                    if (response) {
                        Object.values(response).forEach((e) => {
                            array.push(e)
                        })
                        setData(array)
                        setMemory(array)
                        setLoading(false)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    //  Function yang digunakan untuk mem-filter array, mencari value yang sama dengan object di array
    //  dan menampilkan kembali dengan bentuk array kembali
    const searchFilterFunction = text => {
        const newData = memory.filter(item => {
            let itemData = (item.beneficiary_name).toUpperCase();
            let textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        setData(newData);
    };

    return (
        <View style={style.container}>
            <Searchbar
                placeholder='Cari nama'
                style={style.searchBar}
                autoCapitalize='none'
                onChangeText={text => searchFilterFunction(text)}
            />
            <ScrollView>
                <View style={{ marginTop: 10 }}>
                    {
                        loading ?
                            <View style={style.loading}>
                                {/* Kondisi saat app sedang mengambil data dari endpoint, */}
                                <ActivityIndicator size='large' color='#5CAC86'/>
                            </View>
                            :
                            <View>
                                {/*Penggunaan Component result, dimana mengirim props untuk data diolah didalam result  */}
                                <Result data={data} />
                            </View>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
    },
    searchBar: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10
    }, 
    loading: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default search;