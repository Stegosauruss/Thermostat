require 'sinatra'

class ThermostatWeb < Sinatra::Base
  enable :sessions

  post '/' do
    session[:temperature] = params[:temperature]
    session[:power_saving] = params[:power_saving]
    session[:current_city] = params[:current_city]
    session[:temp_color] = params[:temp_color]

    redirect '/'
  end

  get '/' do
  
    if session[:temperature] == nil
      @temperature = 20
    else
      @temperature = session[:temperature]
    end

    if session[:power_saving] == nil
      @power_saving = "ON"
    else
      @power_saving = session[:power_saving]
    end

    if session[:current_city] == nil
      @city = "London"
    else
      @city = session[:current_city]
    end

    if session[:temp_color] == nil
      @temp_color = "black"
    else
      @temp_color = session[:temp_color]
    end

    erb :'index'
  end



  run! if app_file == $PROGRAM_NAME
end