$(function onDomReady() {
   var listValues={}
    function isCityServed(placeId,cb){
      var getCb = function(result){
        if(!result.isValid){
          $("#city-error-message").addClass('active');
          $("#city-error-message").focus();
        }
        if(cb){
          cb(null,result.isValid);
        }
      }
      $.get(config.api_uri + '/1/places/cityserved/'+placeId,getCb);

    }
    function _initializeTimeSpinnerFunctions(container){
        var hourField = container.find('.hours-field');
        var minuteField = container.find('.minutes-field');
        var amPm = container.find('.period-field')
        var toogleAmPm=function(){
            if(amPm.val()=='AM'){
              amPm.val('PM');
            }
            else{
              amPm.val('AM');
            }
        }
        var increaseHours = function(){
          currentHour= parseInt(hourField.val()) || 1;
          currentHour ++;
          if(currentHour==12){
            toogleAmPm();            
          }
          if(currentHour>12){
            currentHour = 1;
          }
          hourField.val(currentHour);      
        }
        var decreaseHours = function(){
          currentHour= parseInt(hourField.val()) || 1;
          currentHour --;
          if(currentHour==0){
            currentHour = 12;            
          }
          if(currentHour==11){
            toogleAmPm();
          }
          hourField.val(currentHour);
        }
        container.find('.increase-hours').on('click',function(){
          increaseHours();
        });
        container.find('.decrease-hours').on('click',function(){
          decreaseHours();
        });
        container.find('.increase-minutes').on('click',function(){
          var minuteField = container.find('.minutes-field');
          currentMinute= parseInt(minuteField.val()) || 0;
          currentMinute +=15;
          if(currentMinute>=60){
            currentMinute=0;
            increaseHours();
          }
          if(currentMinute<10){
            currentMinute="0"+currentMinute;
          }
          minuteField.val(currentMinute);
        });
         container.find('.decrease-minutes').on('click',function(){
          currentMinute= parseInt(minuteField.val()) || 0;
          currentMinute -=15;
          if(currentMinute<0){
            currentMinute=45;
            decreaseHours();
          }
           minuteField.val(currentMinute);
        });


        container.find('.increase-period').on('click',function(){
          toogleAmPm();
        });
        container.find('.decrease-period').on('click',function(){
          toogleAmPm();
        });
        if(!amPm.val()){
          amPm.val("PM");
        }
        if(!hourField.val()){
          hourField.val("12");
        }
        if(!minuteField.val()){
          minuteField.val("00");
        }

    }
    function initializeTimeSpinner(){
      $('.time-spinner').each(function(){
        var container = $(this);
        _initializeTimeSpinnerFunctions(container);
      });
    }
    function initializeSpinners(){
      $('.spinner-button').each(function(){
        setSpinnerValues($(this),$(this).find('.value-input').val())
      })
      $('.spinner-button.list').each(function(){
        id = $(this).attr('id');
        values =  $(this).attr('data-value').split(' ');
        listValues[id] = values;
        $(this).append($('<input type="hidden" class="index-value-container">'));
      })
    }
    function initializeDatePickers(){

      var nowTemp = moment().add(1, 'day');
      var now = new Date(nowTemp.year(), nowTemp.month(), nowTemp.date(), 0, 0, 0, 0);

      var options = {
        'startDate':now,
        'todayHighlight':true,
        'autoclose': true
      };
      var endDatePicker = $('#end-date').datepicker(options);
      $('#start-date')
      .datepicker(options).on('changeDate',function(ev){
        $('#end-date').datepicker('setStartDate',ev.date);
        var endDate = $('#end-date').datepicker('getUTCDate');
        var startDate = $('#start-date').datepicker('getUTCDate');
        if(typeof endDate=='undefined' || endDate==null || moment(endDate).isBefore(startDate)){
          $('#end-date').datepicker('setUTCDate',startDate);
        }
      });
      var tomorrow =moment().add(1,'day').toDate();
      $('#end-date').datepicker('setUTCDate',tomorrow);
      $('#start-date').datepicker('setUTCDate',tomorrow);

      
    }
    initializeSpinners();
    initializeTimeSpinner();
    initializeDatePickers();


    $('.spinner-button.numeric .left-button').on('click', function () {
      var container = $(this).closest('.spinner-button');
      var value = container.find('.value-input').val();
      minValue = container.attr('data-min-value') || 1;
      value = value || minValue;
      value = parseInt(value)
      value --;
      if(value < minValue){
        value = minValue;
      }
      setSpinnerValues(container,value);
    });
    $('.spinner-button.numeric .right-button').on('click', function () {
      var container = $(this).closest('.spinner-button');
      var value = container.find('.value-input').val();
      value = parseInt(value) || 0;
      value ++;
      maxValue = container.attr('data-max-value') || false;
      if(maxValue !==false && value > maxValue){
        value = parseInt(maxValue);
      }
      
      setSpinnerValues(container,value);
    });
    $('.spinner-button.list .left-button').on('click', function () {
      var container = $(this).closest('.spinner-button');
      var index = container.find('.index-value-container').val();
      var containerId = container.attr('id');
      index = parseInt(index) || 0;
      index --;
      if(index < 0){
        index = listValues[containerId].length -1;
      }
      value = listValues[containerId][index];
      setSpinnerValues(container,value,index);
    });
    $('.spinner-button.list .right-button').on('click', function () {
      var container = $(this).closest('.spinner-button');
      var index = container.find('.index-value-container').val();
      var containerId = container.attr('id');
      index = parseInt(index) || 0;
      index ++;
      if(index >=listValues[containerId].length){
        index = 0;
      }
      value = listValues[containerId][index];
      setSpinnerValues(container,value,index);
    });
    function setSpinnerValues(container,value,index){
      if(typeof index != 'undefined'){
        container.find('.index-value-container').val(index);
      }
      sufix = container.attr('data-sufix');
      valueText = value;
      if(sufix){
        valueText += ' '+sufix;
      }
      container.find('.value-container').html(valueText);
      container.find('.value-input').val(value);
    }

    $('form[name=booking-form]').on('submit', function () {
      var quantity = $('input[name=quantity]').val();
      var type = $('input[name=staffrType]').val();
      var city = $('input[name=city]').val();
      var gender = $('input[name=gender]').val();
      var startDate = $('input[name=start-date]').val();
      var endDate = $('input[name=end-date]').val();
      var hourQuantity = $('input[name=hoursQuantity]').val();
      var startHour =  $('input[name=start-hour]').val();
      var startMinute =  $('input[name=start-minute]').val();
      var startPeriod =  $('input[name=start-period]').val();
      var errors = false;
      $('#error-message').removeClass('active');
      $('input[name=start-date]').removeClass('error');
      $('input[name=end-date]').removeClass('error');
      $('input[name=city-name]').removeClass('error');
      if(!startDate){
         $('input[name=start-date]').addClass('error');
         errors = true;
      }
      if(!endDate){
        $('input[name=end-date]').addClass('error');
        errors = true;

      }
      if(!city){
        $('input[name=city-name]').addClass('error');
        errors = true;
      }
      if(errors){
         $('#error-message').addClass('active');
        return false;
      }
      isCityServed(city,function(err,isServed){
        if(isServed){
          document.location.href = [
            'app/#/order/details?staffrType=' + type,
            'quantity=' + quantity,
            'city=' + city,
            'gender=' + gender,
            'startDate=' + startDate,
            'endDate=' + endDate,
            'hourQuantity=' + hourQuantity,
            'startHour=' + startHour,
            'startMinute=' + startMinute,
            'startPeriod=' + startPeriod
          ].join('&')

          
        }
      })
      return false;
    })

    var searchRequest = null
    var searchDebounce = null
    var $searchResults = $('.city-autocomplete')
    var $input = $('input[name="city-name"]')

    $input.on('keyup', function (e) {
      var value = $input.val()

      if ('' === value) return
      if (searchDebounce) clearTimeout(searchDebounce)
      if (searchRequest) searchRequest.abort()

      searchDebounce = setTimeout(function () {
        $searchResults.empty()
        $("#city-error-message").removeClass('active');
        searchRequest = $.get(config.api_uri + '/1/places/autocomplete', { input: value }, function (data) {
          data.forEach(function (place) {
            $searchResults.append($('<li><a href="#" data-id="' + place.id + '"">' + place.name + '</a></li>'))
          })
        })
      }, 300)
    })

    $searchResults.on('click', function (e) {
      var $target = $(e.target)
      var $city = $('input[name=city]')
      var id = $(e.target).attr('data-id')
      isCityServed(id);
      $city.val(id)
      $input.val($target.text())
      $searchResults.empty()
    })
  }
);