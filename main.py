"""

BeeApp Weather Station Project 2020 By Caitlin Mojica (16947371) Last Edit: 27/10/2020

"""

current_time = 0
serial.redirect_to_usb()
logging_data = -1
basic.show_string("ON")

while logging_data == -1:
    serial.redirect(SerialPin.P15, SerialPin.P14, BaudRate.BAUD_RATE115200)
    serial.write_line("Time" + "," + "Wind Speed" + "," + "Wind Direction" + "," + "Temperature" + "," + "Humidity" + "," + "Rain Level")
    logging_data = 0

def on_forever():
    weatherbit.start_weather_monitoring()
    weatherbit.start_wind_monitoring()
    weatherbit.start_rain_monitoring()
    basic.show_string("LOG")
    pause(1000)
    serial.redirect(SerialPin.P15, SerialPin.P14, BaudRate.BAUD_RATE115200)
    serial.write_line("" + str(input.running_time()) + "," + ("" + str(Math.round(weatherbit.wind_speed()))) + "," + ("" + weatherbit.wind_direction()) + "," + ("" + str(Math.idiv(weatherbit.temperature(), 100))) + "," + ("" + str(Math.idiv(weatherbit.humidity(), 1024))) + "," + ("" + str(Math.round(weatherbit.rain()))) + "\n")
    pause(1000)
basic.forever(on_forever)