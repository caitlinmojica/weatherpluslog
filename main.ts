/** BeeApp Weather Station Project 2020 By Caitlin Mojica (16947371) Last Edit: 27/10/2020 */
let current_time = 0
serial.redirectToUSB()
let logging_data = -1
basic.showString("ON")
while (logging_data == -1) {
    serial.redirect(SerialPin.P15, SerialPin.P14, BaudRate.BaudRate115200)
    serial.writeLine("Time" + "," + "Wind Speed" + "," + "Wind Direction" + "," + "Temperature" + "," + "Humidity" + "," + "Rain Level")
    logging_data = 0
}
basic.forever(function on_forever() {
    weatherbit.startWeatherMonitoring()
    weatherbit.startWindMonitoring()
    weatherbit.startRainMonitoring()
    basic.showString("LOG")
    pause(1000)
    serial.redirect(SerialPin.P15, SerialPin.P14, BaudRate.BaudRate115200)
    serial.writeLine("" + ("" + input.runningTime()) + "," + ("" + ("" + Math.round(weatherbit.windSpeed()))) + "," + ("" + weatherbit.windDirection()) + "," + ("" + ("" + Math.idiv(weatherbit.temperature(), 100))) + "," + ("" + ("" + Math.idiv(weatherbit.humidity(), 1024))) + "," + ("" + ("" + Math.round(weatherbit.rain()))) + "\n")
    pause(1000)
})
