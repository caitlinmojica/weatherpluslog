"""
BeeApp Weather Station Project 2020 By Caitlin Mojica (16947371) Last Edit: 16/10/2020
"""

current_WindDirection_List = ""
current_WindSpeed = 0
current_rain = 0
serial.redirect_to_usb()
weatherbit.start_wind_monitoring()
weatherbit.start_rain_monitoring()
current_time = 0


header = ""
logging_data = 0
logging_data = -1

basic.show_string("ON")

while logging_data == -1:
    weatherbit.start_weather_monitoring()
    serial.redirect(SerialPin.P15, SerialPin.P14, BaudRate.BAUD_RATE115200)
    header = "Time" + "," + "Wind Speed" + "," + "Wind Direction" + "," + "Temperature" + "," + "Humidity" + "," + "Rain Level"
    pause(100)
    serial.write_line(header)
    logging_data = 0

def on_forever():
    weatherbit.start_weather_monitoring()
    pause(1000) 
    serial.redirect(SerialPin.P15, SerialPin.P14, BaudRate.BAUD_RATE9600)
    serial.write_line(str(input.running_time()) + "," + str((Math.round(weatherbit.wind_speed()))) + "," + str(weatherbit.wind_direction()) + "," + str((Math.idiv(weatherbit.temperature(), 100))) + "," + str((Math.idiv(weatherbit.humidity(), 1024))) + "," + str((Math.round(weatherbit.rain()))) + "\n")
    pause(1000)

basic.forever(on_forever)