import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Value } from 'react-native-reanimated'
import { InputData } from '../../component'
import FIREBASE from "../../config/FIREBASE";

export default class TambahKontak extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nama: '',
            nomorHp: '',
            alamat: ''
        }
    }
    onChangeText = (namaState, value) => {
        this.setState({
            [namaState]: value
        })

    }
    onSubmit = () => {
        if (this.state.nama && this.state.alamat && this.state.nomorHp) {
            // console.log("Masuk Submit");
            // console.log(this.state);
            const kontakRefensi = FIREBASE.database().ref('kontak')
            const kontak = {
                nama: this.state.nama,
                alamat: this.state.alamat,
                nomorHp:this.state.nomorHp
            }
            kontakRefensi
                .push(kontak)
                .then((data) => {
                    Alert.alert("kontak", "Kontak tersimpan")
                    this.props.navigation.replace('Home');
                })
                .catch((error) => {
                    console.log("Error:", error);
            })

        } else {
            Alert.alert("Warning","Kolom Harus di isi Semua")
        }


    }

    render() {
        return (
            <View style={styles.pages}>
                <InputData
                    label="Nama"
                    placeholder="Masukan Nama"
                    onChangeText={this.onChangeText}
                    value={this.state.nama}
                    namaState="nama"
                />
                <InputData
                    label="No. Hp"
                    placeholder="Masukan No. Hp"
                    keyboardType="number-pad"
                    onChangeText={this.onChangeText}
                    value={this.state.nomorHp}
                    namaState="nomorHp"
                />
                <InputData
                    label="Alamat"
                    placeholder="Masukan Alamat"
                    isTextArea={true}
                    onChangeText={this.onChangeText}
                    value={this.state.alamat}
                    namaState="alamat"
                />
                <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
                    <Text style={styles.textTombol}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        padding: 30
    },
    tombol: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    },
    textTombol: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    }

})
