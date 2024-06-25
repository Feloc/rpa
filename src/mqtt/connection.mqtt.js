import *  as mqtt from "async-mqtt";


const mqttSettings = {
    host: '10.9.12.22',
    port: 1883
}

/*export function connectionMqtt() {
    try {
        const poolMqtt = mqtt.connect(mqttSettings)
        return poolMqtt
    } catch (error) {
        console.log(error)
    }
}*/


const clientMqtt = mqtt.connect(mqttSettings)

export const connect = async () => {
    console.log("starting")
    try {
        await clientMqtt.subscribe('he/corte2/hx3/t_turbina')
        console.log('Mqtt connected from mqtt to he/corte2/hx3/t_turbina');
    } catch (error) {
        console.log(error.stack)
        //process.exit()
    }

    try {
        await clientMqtt.subscribe('he/corte2/hx5/v_head')
        console.log('Mqtt connected from mqtt to he/corte2/hx5/v_head');

    } catch (error) {
        console.log(error.stack)
    }

    try {
        await clientMqtt.subscribe('he/c2/hx3/status')
        console.log('Mqtt connected from mqtt to "he/c2/hx3/status"');

    } catch (error) {
        console.log(error.stack)
    }
}

/*clientMqtt.on('connect', connect)     

clientMqtt.on('message', async (topic, message) => {
    message = message.toString()
    console.log(message);
})*/

export default clientMqtt