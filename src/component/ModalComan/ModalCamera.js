import React from "react";
import { View, Text, TouchableOpacity, Modal, Image, PermissionsAndroid, Platform } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import ImagePicker from 'react-native-image-crop-picker';
// react-native-image-picker
import Images from "../../constants/image";
import { StyleConstants } from "../../constants/Style.constant";
import { Toast } from "react-native-toast-message/lib/src/Toast";

function ModalCamera({ setModalVisible, modalVisible, setImage, setMime, useFrontCamera }) {

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Techno Fantasy Camera Permission",
                    message:
                        "Techno Fantasy needs access to your camera " +
                        "so you can upload documents for KYC.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
                ImageCamera()
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const ImageCamera = async () => {
        ImagePicker.openCamera({
            // width: 30,
            // height: 40,
            useFrontCamera,
            cropping: false,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            mediaType: 'photo'
        }).then(image => {
            if (image.size / 1000 > 2048 || image.size / 1000 < 10) {
                Toast.show({
                    type: "error",
                    text2: "Please image select only Min size 10 KB to Max size 2 MB",
                });
            } else {
                setImage(image.path);
                setMime(image.mime)
                setModalVisible(false)
            }
        });
    };
    const backImageDocGallery = async () => {
        ImagePicker.openPicker({
            // width: 30,
            // height: 40,
            cropping: false,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            mediaType: 'photo'
        }).then(image => {
            if (image.size / 1000 > 2048 || image.size / 1000 < 10) {
                Toast.show({
                    type: "error",
                    text2: "Please image select only Min size 10 KB to Max size 2 MB",
                });
            } else {
                setImage(image.path);
                setMime(image.mime)
                setModalVisible(false)
            }
        });
    };
    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={s.modalManView}>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={s.modalLhare}></TouchableOpacity>
                    <View style={[s.modalView, { flexDirection: 'row', padding: 10, marginBottom: 20, justifyContent: 'space-around' }]}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                            onPress={Platform.OS === 'android' ? requestCameraPermission : ImageCamera}>
                            <Image style={{ tintColor: ColorsConstant.BorderColor, width: 40, resizeMode: 'contain', height: 40 }} source={Images['camera']} />
                            <Text style={{ fontSize: 10, color: ColorsConstant.dark, fontWeight: 'bold' }}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => backImageDocGallery()}>
                            <Image style={{ tintColor: ColorsConstant.BorderColor, width: 40, resizeMode: 'contain', height: 40 }} source={Images['gallery']} />
                            <Text style={{ fontSize: 10, color: ColorsConstant.dark, fontWeight: 'bold' }}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const s = StyleConstants

export default ModalCamera;