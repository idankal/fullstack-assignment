$(function(){

  let startTimestamp, stopTimestamp, socket;

  socket = io.connect('http://localhost:4000');
  initSensors();
  $('#startSession').on('click', function() {
    $('#recording').fadeIn();
    startTimestamp = (new Date()).getTime();

    startRecording();
    startSensorRecording();

    // startSendData(socket);

  });

  $('#stopSession').on('click', function () {
    $('#recording').fadeOut();
    $('#audioNote').hide();
    stopTimestamp = (new Date()).getTime();

    stopRecording(startTimestamp, stopTimestamp);
    stopSensorRecording();
    downloadSensorData(startTimestamp, stopTimestamp);

    log({
      message: 'Finished ' + (stopTimestamp - startTimestamp) / 1000 + ' seconds session with ' + sessionData.length +' data points',
      type: 'success'
    });

  });

});
