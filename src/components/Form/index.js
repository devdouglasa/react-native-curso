import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Vibration } from 'react-native'
import ResultImc from './ResultImc/'
import styles from './styles'


export default function Form() {
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState('Preencha o peso e altura')
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState('Calcular')
    const [errorMessage, setErrorMessage] = useState(null)
    const [messageCondicao, setMessageCondicao] = useState(null)

    function imcCalculator(){     
        return setImc((weight / (height * height)).toFixed(2));
        
    }

    function verificationImc() {
        if(imc == null) {
            Vibration.vibrate();
            setErrorMessage("Campo obrigatório*")
        }
    }

    function messageCondicaoImc() {
        if(imc < 18.5 & imc != null) {
            setMessageCondicao("Abaixo do peso!")
        } else if(imc < 25 & imc != null) {
            setMessageCondicao("Peso ideal") 
        } else if(imc < 30 & imc != null) {
            setMessageCondicao("Está sobrepeso")
        } else if(imc < 35 & imc != null) {
            setMessageCondicao("Obesidade grau I")
        } else if(imc < 40 & imc != null) {
            setMessageCondicao("Obesidade grau II")
        } else if(imc >= 40 & imc != null) {
            setMessageCondicao("Obesidade grau III")
        }
    }

    function validationImc(){
        if(weight != null && height != null) {
            imcCalculator()
            messageCondicaoImc(imcCalculator())
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu imc é igual: ")
            setTextButton("Calcular Novamente")
            setErrorMessage(null)
            return
        }
        verificationImc()
        setImc(null)
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura")
        setMessageCondicao(null)
    }

    return (
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} onChangeText={setHeight} value={height} placeholder='Ex. 1.75' keyboardType='numeric'/>
                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} onChangeText={setWeight} value={weight} placeholder='Ex. 60.45' keyboardType='numeric'/>
                <TouchableOpacity
                style={styles.buttonCalculator}
                onPress={() => validationImc()}
                >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <ResultImc messageResultImc={messageImc} resultImc={imc} messageCondicao={messageCondicao}/>
            </View>
        </View>
    );
}