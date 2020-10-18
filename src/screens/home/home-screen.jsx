import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import BackgroundImage from "../../components/background-screen.component";
import HomeHeader from "../../components/home-header.component";

import styles from "./home-style";
import HomeDriverInfo from "../../components/home-driver-info.component";
import Place from "../../components/place.component";
import RequestInfo from "../../components/request-info.component";
import { TouchableOpacity } from "react-native-gesture-handler";
import ContactItem from "../../components/contact-item.component";
import { RadioButton } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
    const pickUp = {
        name: "Vị trí người bệnh",
        address: "632 Tô Ký, Q.12, HCM"
    };

    const destination = {
        name: "Bệnh viện Quân Y",
        address: "321 Lê Văn Việt, Q.9, HCM"
    };

    const m_request = {
        pickUp: pickUp,
        destination: destination
    };

    const [isReady, setIsReady] = useState(false);
    const [title, setTitle] = useState("Chưa sẵn sàng");
    const [isToggle, setIsToggle] = useState(false);
    const [request, setRequest] = useState(null);
    const [isArrived, setIsArrived] = useState(false);
    const [isReject, setIsReject] = useState(false);
    const [isFinish, setIsFinish] = useState(true);
    const [rejectOption, setRejectOption] = useState("first");

    const toggleAction = () => {
        setIsReady(!isReady);
        setTitle(!isReady ? "Đang sẵn sàng" : "Chưa sẵn sàng");
        if (!isReady) {
            setTimeout(() => {
                setIsToggle(true);
            }, 10000);
        }
    }

    const accept = () => {
        setIsToggle(false);
        setRequest(m_request);
    }

    const handleFinish = () => {
        setIsArrived(false);
        setRequest(null);
        setIsReject(false);
        setIsFinish(false);
    }

    return (
        <View style={styles.container}>
            <BackgroundImage>
                <View style={{ flex: 1 }}>
                    <HomeHeader title={title} isReady={isReady} toggleAction={toggleAction} navigation={navigation} />
                </View>

                <View style={[styles.modal, isReject ? { opacity: 0.85, zIndex: 10 } : null]}>
                    <View style={[styles.modalContent, { height: "60%" }]}>
                        <Text style={styles.modalTitle}>Lí do hủy yêu cầu</Text>
                        <View style={styles.optionContainer}>
                            <RadioButton.Group value={rejectOption} onValueChange={value => setRejectOption(value)}>
                                <View style={styles.option}>
                                    <RadioButton value="first" title="Hello" />
                                    <Text style={styles.optionValue}>Bấm nhầm chấp nhận yêu cầu</Text>
                                </View>
                                <View style={styles.option}>
                                    <RadioButton value="second" />
                                    <Text style={styles.optionValue}>Không thể đón bệnh nhân đúng giờ</Text>
                                </View>
                                <View style={styles.option}>
                                    <RadioButton value="third" />
                                    <Text style={styles.optionValue}>Xe bị hỏng không thể đến nơi</Text>
                                </View>
                                <View style={styles.option}>
                                    <RadioButton value="four" />
                                    <Text style={styles.optionValue}>Địa chỉ không thể lái xe vào</Text>
                                </View>
                                <View style={styles.option}>
                                    <RadioButton value="five" />
                                    <Text style={styles.optionValue}>Bệnh nhân liên lạc đề nghị huỷ</Text>
                                </View>
                            </RadioButton.Group>
                            <TextInput style={styles.optionOther} placeholder="Khác" />
                        </View>
                        <View style={styles.groupAction}>
                            <Text
                                onPress={() => setIsReject(false)}
                                style={[styles.action, styles.reject, { paddingHorizontal: 30 }]}
                            >
                                Đóng
                            </Text>
                            <TouchableOpacity onPress={handleFinish}>
                                <Text onPress={accept} style={[styles.action, { paddingHorizontal: 30 }]}>
                                    Xác nhận
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[styles.modal, isToggle ? { opacity: 0.85, zIndex: 10 } : null]}>
                    <View style={styles.modalContent}>
                        <ScrollView directionalLockEnabled={true}>
                            <View style={styles.groupTitle}>
                                <Text style={styles.modalTitle}>Yêu cầu mới</Text>
                                <Text style={styles.requestType}>Đặt giúp</Text>
                                <Text style={styles.range}>120 km</Text>
                            </View>
                            <View style={styles.requestDetails}>
                                <Place title="Điểm đón" place={pickUp} icon="https://i.ibb.co/D8HPk12/placeholder.png" />
                                <Place title="Điểm đến" place={destination} icon="https://i.ibb.co/gWdQ69d/radar.png" />
                                <RequestInfo
                                    title="Thông tin người gọi"
                                    items={[
                                        { id: 1, label: "Tên", content: "Trương Ngọc Minh" },
                                        { id: 2, label: "Số điện thoại", content: "0931738872" }
                                    ]}
                                />
                                <RequestInfo
                                    title="Thông tin người bệnh"
                                    items={[
                                        { id: 1, label: "Tên", content: "Mai Thiên Toàn" },
                                        { id: 2, label: "Số điện thoại", content: "0327008005" },
                                        { id: 3, label: "Tình trạng bệnh", content: "Gãy xương chân do tai nạn giao thông" }
                                    ]}
                                />
                                <RequestInfo title="Ghi chú" items={[{ id: 1, content: "Cần dụng cụ sơ cứu tại chỗ" }]} />
                            </View>
                            <View style={styles.groupAction}>
                                <Text onPress={() => setIsToggle(false)} style={[styles.action, styles.reject]}>
                                    Từ chối
                            </Text>
                                <TouchableOpacity onPress={accept}>
                                    <Text style={styles.action}>
                                        Chấp nhận <Text style={styles.counter}>4:56</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <View style={[styles.modal, isFinish ? { opacity: 0.85, zIndex: 10 } : null]}>
                    <View style={[styles.modalContent, { height: "26%", paddingHorizontal: 20 }]}>
                        <Text style={styles.requestStatus}>Yêu cầu hoàn thành</Text>
                        <Text style={styles.message}>
                            Cảm ơn bạn đã giúp đỡ bệnh nhân! Bạn có thể xem lại yêu cầu và phần đánh giá trong mục Lịch
                            sử.
                        </Text>
                        <TouchableOpacity onPress={handleFinish}>
                            <Text style={[styles.action, { paddingHorizontal: 30 }]}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Map screen */}
                <View style={request ? { flex: 5 } : { flex: 7 }}>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        followsUserLocation={true}
                    />
                </View>

                {!request ? (
                    <View style={{ flex: 2 }}>
                        <HomeDriverInfo
                            ratingLevel={5}
                            addressName="Vị trí hiện tại"
                            addressValue="1141 Quang Trung, Gò Vấp, HCM"
                        />
                    </View>

                ) : (
                        <View style={styles.transportationContainer}>
                            <View style={styles.transportation}>
                                <Place
                                    place={{ name: "Vị trí của bạn", address: "480 Xa lộ Hà Nội, Bình Thạnh, HCM" }}
                                    icon="https://i.ibb.co/D8HPk12/placeholder.png"
                                />
                                <Place
                                    title="Điểm đến"
                                    place={!isArrived ? request.pickUp : request.destination}
                                    icon="https://i.ibb.co/gWdQ69d/radar.png"
                                />
                                {!isArrived ? (
                                    <View style={styles.groupContact}>
                                        <ContactItem
                                            icon="https://i.ibb.co/z2krjnj/phone-contact.png"
                                            label="Người gọi"
                                            phone="0931738872"
                                        />
                                        <ContactItem
                                            icon="https://i.ibb.co/fprdRyq/phone-contact-purple.png"
                                            label="Bệnh nhân"
                                            phone="0327008005"
                                        />
                                    </View>
                                ) : null}
                                {!isArrived ? (
                                    <View style={styles.groupAction}>
                                        <TouchableOpacity onPress={() => setIsReject(true)}>
                                            <Text style={[styles.action, styles.reject]}>Hủy yêu cầu</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setIsArrived(true)}>
                                            <Text style={[styles.action]}>Đón bệnh nhân</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                        <TouchableOpacity onPress={() => setIsFinish(true)}>
                                            <Text style={[styles.action, styles.finish]}>Kết thúc</Text>
                                        </TouchableOpacity>
                                    )}
                            </View>
                        </View>
                    )}
            </BackgroundImage>
        </View>
    );
};

export default HomeScreen;
