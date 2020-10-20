/** BeeApp Weather Station Project 2020 By Caitlin Mojica (16947371) Last Edit: 16/10/2020 */
let current_WindDirection_List = ""
let current_WindSpeed = 0
let current_rain = 0
serial.redirectToUSB()
weatherbit.startWindMonitoring()
weatherbit.startRainMonitoring()
let current_time = 0
let header = ""
let logging_data = 0
logging_data = -1
basic.showString("ON")
while (logging_data == -1) {
    weatherbit.startWeatherMonitoring()
    serial.redirect(SerialPin.P15, SerialPin.P14, BaudRate.BaudRate115200)
    header = "Time" + "," + "Wind Speed" + "," + "Wind Direction" + "," + "Temperature" + "," + "Humidity" + "," + "Rain Level"
    pause(100)
    serial.writeLine(header)
    logging_data = 0
}
basic.forever(function on_forever() {
    weatherbit.startWeatherMonitoring()
    pause(1000)
    serial.redirect(SerialPin.P15, SerialPin.P14, BaudRate.BaudRate9600)
    serial.writeLine("" + input.runningTime() + "," + ("" + Math.round(weatherbit.windSpeed())) + "," + ("" + weatherbit.windDirection()) + "," + ("" + Math.idiv(weatherbit.temperature(), 100)) + "," + ("" + Math.idiv(weatherbit.humidity(), 1024)) + "," + ("" + Math.round(weatherbit.rain())) + "\n")
    pause(1000)
})
