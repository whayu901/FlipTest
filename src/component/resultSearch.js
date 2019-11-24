import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import Moment from 'moment'


//  Penggunaan moment untuk mengetahui tanggal dengan bahasa indonesia
var idLocale = require('moment/locale/id');
Moment.locale('id', idLocale);

const ResultSearch = ({ data }) => {

    // Penggunaan formatNumber yang digunakan untuk mem-format nilai amount kedalam konversi indonesia
    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    const Delimeter = (value) => {
        let now1 = value;
        let now4 = formatNumber(now1);
        let now5 = now4.replace(/,/g, ".");
        return now5;
    }
    return (
        <View >
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={style.container}>
                        <View style={[style.card, { borderColor: item.status ? '#5CAC86' : 'transparent' }]}>
                            <View style={{ padding: 5 }}>

                                {/* View untuk bagian sender dari Bank Bni ke bank tujuan */}
                                <View style={style.bankSender}>
                                    <View style={{ marginRight: 5 }}>
                                        <Text style={style.bank}>{item.sender_bank}</Text>
                                    </View>
                                    <View style={style.panah}>
                                        <FontAwesome name="arrow-right" size={15} />
                                    </View>
                                    <View style={{ marginLeft: 5 }}>
                                        <Text style={style.bank}>{item.beneficiary_bank}</Text>
                                    </View>
                                </View>

                                {/* View yang digunakan untuk melihat nama nasabah dan status transaksi */}
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                                    <View style={{ marginTop: 3 }}>
                                        <Text>{item.beneficiary_name}</Text>
                                    </View>
                                    <View style={style.berhasil}>
                                        <Text style={{ color: '#fff', fontWeight: '300' }}>Berhasil</Text>
                                    </View>
                                </View>

                                {/* View yang digunakan untuk melihat jumlah transaksi dan tanggal transaksi */}
                                <View style={style.jumlahTransaksi}>
                                    <View style={{ marginRight: 5 }}>
                                        <Text>Rp{Delimeter(item.amount)}</Text>
                                    </View>
                                    <View style={{ marginTop: 5 }}>
                                        <Text style={{ fontSize: 10 }}>{'\u2B24'}</Text>
                                    </View>
                                    <View style={{ marginLeft: 5 }}>
                                        <Text>{Moment(item.completed_at).format('DD MMMM YYYY')}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                        <Text style={{ fontSize: 17 }}>Tidak Ada transaksi</Text>
                    </View>
                )}
            />

        </View>
    )
}
const style = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1',
        flex: 1,
        borderRadius: 5
    },
    card: {
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        borderRadius: 5,
        borderLeftWidth: 10,
        overflow: 'hidden',
    },
    berhasil: {
        backgroundColor: '#5CAC86',
        padding: 3,
        marginLeft: 'auto',
        borderRadius: 5,
        marginRight: 5
    },
    bankSender: {
        flexDirection: 'row',
    },
    bank: {
        textTransform: 'uppercase',
        fontSize: 15,
        fontWeight: 'bold'
    },
    panah: {
        alignItems: 'center',
        marginTop: 3
    },
    searchBar: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10
    },
    jumlahTransaksi: {
        flexDirection: 'row',
        marginTop: 5
    },
    sign: {
        flex: 0.3,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        backgroundColor: '#5CAC86',
        marginTop: 5,
        marginLeft: 10,
        flexDirection: 'row'
    }
})

export default ResultSearch;