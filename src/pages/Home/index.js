import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import FIREBASE from "../../config/FIREBASE";

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            kontaks: {

            },
            kontakey: []
        }
    }

    cnmponentDidMount() {
        FIREBASE.database()
            .ref("kontak")
            .once('value',(querySnapShot) => {
                let data = querySnapShot.val() ? querySnapShot.val() : {};
                let kontakItem = {...data};
                this.setState({
                    kontaks: kontakItem,
                    kontakey:Object.keys(kontakItem)
                })

            })
    }



    render() {
        console.log("kontaks:", this.state.kontaks)
        console.log("kontaks key:",this.state.kontakey)
        return (
            <View style={styles.page}>
                <Text>Halaman Home</Text>
                <View style={styles.wrapperButton}>
                    <TouchableOpacity style={styles.btnTambah} onPress={() => this.props.navigation.navigate('TambahKontak')}>
                        <FontAwesomeIcon icon={faPlus} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    wrapperButton: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 30
    },
    btnTambah: {
        padding: 20,
        backgroundColor: 'skyblue',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }

})
