require 'sinatra'

class ThermostatWeb < Sinatra::Base
  enable :sessions

  post '/' do
    session[:temperature] = params[:temperature]
    session[:power_saving] = params[:power_saving]
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

    erb :'index'
  end



  run! if app_file == $PROGRAM_NAME
end