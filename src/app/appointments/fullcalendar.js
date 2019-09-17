var calendarEl = document.getElementById('calendar');
var locale, defaultView, slotDuration, calendarPlugins, pageOverlay,
    loader, events, calendar, header, resources;
var colors = []
var tokenuname = window.localStorage.getItem("username");
var psw = window.localStorage.getItem("pval")
var dpsw = decryptPassword(psw);

var token_service_url = "http://graylogic.net/OclinicoAPI/token";
var service_url = "http://graylogic.net/OclinicoAPI/Api";

function getToken() {
    return $.ajax({
        url: token_service_url,
        type: 'POST',
        data: `username=${tokenuname}&password=${dpsw}&grant_type=${"password"}`
    })
}


getToken()
    .done(function(data) {
        console.log(data)
        var accessToken = data.token_type + " " + data.access_token;
        //getDoctors(accessToken,new Date())
        loadDoctorsName(accessToken, new Date())
    })
    .fail(function(error) {
        console.log(error)
    })

$('#calendar').on('click', '.fc-resourceTimeGridDay-button', function() {
    console.log('36');
    $('.fc-resource-cell').each(function(i) {
        $(this).css({
            'background': colors[i],
            'height': '50px'
        })
    })
})

function getDoctorsName(token) {
    $.ajax({
        url: service_url+'/Account/DocTreatment_Transactions',
        type: 'POST',


    })
}
//get patient name

$('#patient').on('keyup', function() {
    var patientName = $(this).val()
    if (patientName.length >= 2) {
        $('.loading-icon').show()

        getToken()
            .done(function(data) {
                console.log(data)
                var accessToken = data.token_type + " " + data.access_token;
                var serUrl = service_url+'/Account/GetUser';
                var body = {
                    "text": "patientnameall",
                    "id": patientName,
                    "param1": localStorage.getItem('userId'),
                    "param2": ""
                }
                console.log(body)
                $.ajax({
                        url: serUrl,
                        type: 'POST',
                        data: JSON.stringify(body),
                        beforeSend: function(xhr) {
                            setHeaders(xhr, accessToken)
                        }

                    })
                    .done(function(res) {
                        console.log(res);

                        if (res.data.Table.length !== 0) {
                            var patientDetails = $('.patientDetails');
                            var allPatients = ''
                            res.data.Table.forEach((elem) => {
                                allPatients += '<div class="eachPatientDetails" id=' + elem.patient_id + '>' + elem.Name + '</div>'
                            })
                            patientDetails.show()
                            $('.not').hide();
                            patientDetails.html(allPatients)
                            $('.loading-icon').hide()
                        } else {
                            $('.not').show();
                            $('.patientDetails').hide()
                            $('.loading-icon').hide()
                        }
                    })
                    .fail(function(error) {
                        console.log(error);
                        $('.loading-icon').hide()
                    })


            })
            .fail(function(error) {
                console.log(error)
            })
    }
})

$('.patientDetails').on('click', '.eachPatientDetails', function() {
    console.log($(this).html())
    $('#patient').val($(this).html()).attr('patientId', $(this).attr('id'))
    $('.patientDetails').hide()
})

function decryptPassword(password) {
    return password.slice(0, -6).split('').reverse().join('')
}

function initializing() {
    console.log('initprocess started')
    calendarEl
    locale = 'en';
    defaultView = 'resourceTimeGridDay';
    slotDuration = '00:15:00';
    calendarPlugins = ['resourceTimeGrid', 'resourceDayGrid', 'interaction'];
    pageOverlay = $('.pageOverlay');
    loader = $('.loader');
    console.log(loader)
    events = []

    calendar;
    header;
    resources


    console.log('init process ended')
}
initializing()


function loadDoctorsName(token, calendarDate, renderState) {
    loader.show()
    var serviceUrl = service_url+'/Account/DocTreatment_Transactions';
    var todaysDate = convertDate(calendarDate);
    var currentTime = tConvert(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
    var body = {
        "Sno": "",
        "Practitioner_Id": "",
        "Treatment_Id": "Clinic",
        "status": "",
        "Login_ID": "",
        "Trans_Date": todaysDate + ' ' + currentTime,
        "Operation": "getDocs",
        "clinicid":localStorage.getItem('userId'),
        "Branchid": "",
        "Last_Updated": ""
    }

    $.ajax({
            url: serviceUrl,
            type: 'POST',
            data: JSON.stringify(body),
            beforeSend: function(xhr) {
                setHeaders(xhr, token)
            }

        })
        .done(function(data) {
            console.log(data);


            resources = [];
            colors = []
                //var colors = ['red','blue','green','yellow','black']
            data.data.Table.forEach((elem, index) => {
                resources.push({
                    id: elem.Practitioner_Id,
                    title: elem.Name,


                })
                colors.push(elem.Color)
            })

            getClinicTimings(calendarDate, renderState)



        })

    .fail(function(error) {
        loader.hide()
        console.log(error);
    })


}

function setHeaders(xhr, token) {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", token);
}

function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}


function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('/');
}




$(' #calendar').on('click', '.fc-next-button', function() {
    console.log('clicked of next button on calendar');
    console.log(calendar.getDate())
    getToken()
        .done(function(data) {
            console.log(data)
            var accessToken = data.token_type + " " + data.access_token;
            console.log(calendar)



            setTimeout(function() {
                $('.loader').show();


                getToken()
                    .done(function(data) {
                        console.log(data)
                        var accessToken = data.token_type + " " + data.access_token;

                        var serviceUrl = service_url+'/Account/DocTreatment_Transactions';


                        var todaysDate = convertDate(calendar.getDate());
                        var currentTime = tConvert(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
                        console.log(todaysDate + ' ' + currentTime)
                        console.log(new Date().getTime());

                        var body = {
                            "Sno": "",
                            "Practitioner_Id": "",
                            "Treatment_Id": "Clinic",
                            "status": "",
                            "Login_ID": "",
                            "Trans_Date": todaysDate + ' ' + currentTime,
                            "Operation": "getDocs",
                            "clinicid": localStorage.getItem('userId'),
                            "Branchid": "",
                            "Last_Updated": ""
                        }
                        $.ajax({
                                url: serviceUrl,
                                type: 'POST',
                                data: JSON.stringify(body),
                                beforeSend: function(xhr) {
                                    setHeaders(xhr, accessToken)
                                }

                            })
                            .done(function(result) {
                                console.log(result)
                                for (var i = 0; i < resources.length; i++) {
                                    var eachresource = calendar.getResourceById(resources[i].id)
                                    eachresource.remove();
                                }
                                resources = [];
                                colors = []
                                    //var colors = ['red','blue','green','yellow','black']
                                result.data.Table.forEach((elem, index) => {
                                    resources.push({
                                        id: elem.Practitioner_Id,
                                        title: elem.Name,


                                    })
                                    colors.push(elem.Color)
                                })

                                resources.forEach((el) => {
                                    calendar.addResource(el)
                                })
                                $('.fc-resource-cell').each(function(i) {
                                    console.log('344');
                                    $(this).css({
                                        'background': colors[i],
                                        'height': '50px'
                                    })
                                })
                                $('.loader').hide()


                            })



                    })







            }, 400)




            // calendar.refetchResources
            //  calendar.destroy()
            //   loadDoctorsName(accessToken,calendar.getDate(),'rerender')


        })
        .fail(function(error) {
            console.log(error)
        })

})





function getDoctors(token, date) {
    console.log(date)
    loader.show()
    var serviceUrl = service_url+'/Account/DocTreatment_Transactions';


    var todaysDate = convertDate(date);
    var currentTime = tConvert(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());


    console.log(todaysDate + ' ' + currentTime)
    console.log(new Date().getTime());

    var body = {
        "Sno": "",
        "Practitioner_Id": "",
        "Treatment_Id": "Clinic",
        "status": "",
        "Login_ID": "",
        "Trans_Date": todaysDate + ' ' + currentTime,
        "Operation": "getDocs",
        "clinicid": localStorage.getItem('userId'),
        "Branchid": "",
        "Last_Updated": ""
    }



    $.ajax({
            url: serviceUrl,
            type: 'POST',
            data: JSON.stringify(body),
            beforeSend: function(xhr) {
                setHeaders(xhr, token)
            }

        })
        .done(function(data) {
            $('.loader').hide()
            console.log(data);

        })

}







function renderCalendar(clinicTimings, allAppointmentsData, renderState) {
    // console.log(calendar);
    //calendar.destroy()

    console.log(clinicTimings)
    console.log(allAppointmentsData)


    events = [];

    //  var newEvent = {
    //   resourceId: $('.doctorName').attr('id'),
    //   title: $('#patient').val(),
    //   description:'Appointment with ' + $('.doctorName').val(),
    //   start: $('.appointmentDate').val() + 'T'  + $('.mainStartTimeHour').val() + ':' + $('.mainStartTimeMins').val()+':00+05:30',
    //   end : $('.appointmentDate').val() + 'T'  + $('.mainEndTimeHour').val() + ':' + $('.mainEndTimeMins').val()+':00+05:30',
    //   borderColor: 'red'
    // }


    allAppointmentsData.data.Table.forEach(function(elem) {


        //#c34e61
        var borderColorStatus = ''
        if (elem.arrivestatus === 'UnConfirmed') {
            borderColorStatus = '#c34e61'
        } else if (elem.arrivestatus === 'Waiting') {
            borderColorStatus = '#e6e038'
        } else if (elem.arrivestatus === 'Confirmed') {
            borderColorStatus = '#62b968'
        } else if (elem.arrivestatus === 'Arrived') {
            borderColorStatus = '#4d6cf4'
        } else if (elem.arrivestatus === 'NotArrived') {
            borderColorStatus = '#FF8C00'
        } else if (elem.arrivestatus === 'Completed') {
            borderColorStatus = '#40e0d0'
        }
        events.push({
            resourceId: elem.Practitioner_Id,
            resourceName: elem.Practitioner,
            PatientName: elem.PatientName,
            Patientname1: elem.Patientname1,
            title: elem.PatientName,
            //   description:'Appointment with ' + $('.doctorName').val(),
            start: elem.Appointment_start,
            end: elem.Appointment_end,
            borderColor: borderColorStatus,
            // backgroundColor : elem.Color,
            Noof_Sittings: elem.Noof_Sittings,
            doctorname: elem.doctorname,
            patientid: elem.patientid,
            type: elem.type,
            Appointment_id: elem.Appointment_id

        })
    })



    console.log(events)


    header = {

        left: 'prev,next today',
        center: 'title',

        right: 'resourceTimeGridDay,timeGridWeek,dayGridMonth'
    }
    var calendarOptions = {
        selectable: true,
        header: header,
        editable: true,
        plugins: calendarPlugins,
        locale: locale,
        allDaySlot: false,
        defaultView: defaultView,
        slotDuration: slotDuration,
        eventLimit: true,

        dateClick: function(dateInfo) {
            console.log(dateInfo);
            checkAppointmentAvailaibility(dateInfo)
        },
        eventClick: function(eventInfo) {
            console.log(eventInfo);
            showAppointmentData(eventInfo)
        },
        select: function(info) {
            console.log(info)
        },
        viewRender: function(view, element) {
            console.log(view)
            console.log(element)
        },


        eventRender: function(info) {
            console.log(info)
            var tooltip = new Tooltip(info.el, {
                title: info.event.extendedProps.description,
                placement: 'top',
                trigger: 'hover',
                container: 'body'
            });
            console.log(tooltip)
        },

        minTime: clinicTimings[0],
        maxTime: clinicTimings[1],
        //refetchResourcesOnNavigate : true,
        // resources : function(fetchInfo, successCallback, failureCallback){

        //   console.log(resources)

        //   return resources

        //   console.log(events)

        //   // console.log('refetching doctors')

        //   // getToken()
        //   // .done(function(data) {
        //   //   var accessToken = data.token_type+" "+ data.access_token;



        //   //  // getDoctors(accessToken,calendar.getDate())
        //   // })

        // },
        resources: resources,
        //  resources : function(fetchInfo, successCallback, failureCallback) {

        //  },

        events: events
    }
    console.log(events)
    if (calendar) {
        calendar.destroy()
    }
    calendar = new FullCalendar.Calendar(calendarEl, calendarOptions);

    calendar.render();


    $('.fc-resource-cell').each(function(i) {
        console.log('585');
        $(this).css({
            'background': colors[i],
            'height': '50px'
        })
    })
    $('.fc-license-message').hide();
    // console.log($('.fc-time-grid td.fc-today'))
    $('.fc-time-grid td.fc-today').css('background', '#fff!important');

    loader.hide();
    console.log('loaded appointments completeley')
}

function showAppointmentData(eventInfo) {
    console.log(eventInfo)
}

function getClinicTimings(date, renderState) {



    var serviceUrl = service_url+'/Account/CL_GetAppointments';
    var today = date;
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = mm + '/' + dd + '/' + yyyy;
    var body = {
        "text": "GetClinikTimings",
        "start": today,
        "end": "",
        "id": localStorage.getItem('userId'),
        "param1": "",
        "param2": ""
    }
    console.log(JSON.stringify(body))

    //set clinic timings
    getToken()
        .done(function(data) {
            console.log(data)
            var accessToken = data.token_type + " " + data.access_token;
            $.ajax({
                    url: serviceUrl,
                    type: 'POST',
                    data: JSON.stringify(body),
                    beforeSend: function(xhr) {
                        setHeaders(xhr, accessToken)
                    }

                })
                .done(function(result) {
                    console.log(result)

                    var startTime, endTime

                    function convertTo24HoursFormat(time) {
                        time = time.slice(0, 5) + ' PM';
                        console.log(time)
                        var hours = Number(time.match(/^(\d+)/)[1]);
                        var minutes = Number(time.match(/:(\d+)/)[1]);
                        var AMPM = time.match(/\s(.*)$/)[1];
                        if (AMPM == "PM" && hours < 12) hours = hours + 12;
                        if (AMPM == "AM" && hours == 12) hours = hours - 12;
                        var sHours = hours.toString();
                        var sMinutes = minutes.toString();
                        if (hours < 10) sHours = "0" + sHours;
                        if (minutes < 10) sMinutes = "0" + sMinutes;
                        console.log(sHours + ":" + sMinutes);
                        return sHours + ":" + sMinutes + ':00'

                    }



                    if (result.data.Table[0].s1start.includes('PM')) {
                        startTime = convertTo24HoursFormat(result.data.Table[0].s1start)
                    } else {
                        startTime = result.data.Table[0].s1start.slice(0, 5) + ':00';
                    }
                    if (result.data.Table[0].s1end.includes('PM')) {
                        endTime = convertTo24HoursFormat(result.data.Table[0].s1end)
                    } else {
                        endTime = result.data.Table[0].s1end.slice(0, 5) + ':00';
                    }




                    var timings = [startTime, endTime];

                    console.log(timings)
                        // minTime : '09:00:00',
                        // maxTime : '17:00:00',


                    console.log('loading process started')
                    console.log(loader)
                    loader.show();

                    renderAppointments(timings, renderState)
                })
        })
        .fail(function(error) {
            loader.hide()
            console.log(error)
        })
}



function renderAppointments(timings, renderState) {


    var appService = service_url+'/Account/Get_Data_Based_On_Roles';

    var body = {
        "Condition": "GetAppointDetails",
        "Clinkid": localStorage.getItem('userId'),
        "Branchid": "",
        "Userid": localStorage.getItem('userId'),
        "Roletype": "Clinic",
        "Appointmentid": "",
        "Treatmentid": "",
        "Practitioner": "",
        "arrivestatus": "",
        "param1": "",
        "param2": ""

    }
    getToken()
        .done(function(data) {
            console.log(data)
            var accessToken = data.token_type + " " + data.access_token;
            $.ajax({
                    url: appService,
                    type: 'POST',
                    data: JSON.stringify(body),
                    beforeSend: function(xhr) {
                        setHeaders(xhr, accessToken)
                    }

                })
                .done(function(data) {
                    console.log(data);
                    renderCalendar(timings, data, renderState)
                })
                .fail(function(error) {
                    loader.hide()
                    console.log(error);
                })
        })
        .fail(function(error) {
            loader.hide()
            console.log(error)
        })




}




$('.addAppointment').on('click', function() {

    console.log($('.appointmentDate').val())
    var startTime = $('.appointmentDate').val() + 'T' + ':' + $('.mainStartTimeHour').val() + ':' + $('.mainStartTimeMins').val();
    var endTime = $('.appointmentDate').val() + 'T' + ':' + $('.mainEndTimeHour').val() + ':' + $('.mainEndTimeMins').val();
    var startTimeToSend = $('.appointmentDate').val() + ' ' + $('.mainStartTimeHour').val() + ':' + $('.mainStartTimeMins').val();
    var endTimeToSend = $('.appointmentDate').val() + ' ' + $('.mainEndTimeHour').val() + ':' + $('.mainEndTimeMins').val();
    console.log(startTime)
    console.log(endTime);
    console.log(startTimeToSend)
    console.log(endTimeToSend);
    console.log($('.appointmentDate').val())
    var appointmentDate = $('.appointmentDate').val() + " " + new Date().getDate() + ':' + new Date().getMinutes();

    var appointmentBody = {
        "userid": localStorage.getItem('userId'),
        "type": $('.appointmentType').val(),
        "patientid": $('#patient').attr('patientid'),
        "title": "",
        "description": $('.notesText').val(),
        "event_start": startTimeToSend,
        "event_end": endTimeToSend,
        "Updateddt": "5/19/2019 10:30:36 AM",
        "createddate": "5/19/2019 10:30:36 AM",
        "arrivestatus": "UnConfirmed",
        "all_day": "False",
        "Repeatstatus": "None",
        "Status": "1",
        "appointdate": appointmentDate,
        "fromhr": $('.mainStartTimeHour').val() + ':' + $('.mainStartTimeMins').val(),
        "tohr": $('.mainEndTimeHour').val() + ':' + $('.mainEndTimeMins').val(),
        "text": "insert",
        "login": "",
        "Clinicid": localStorage.getItem('userId'),
        "appointmentid": "",
        "practitionerid": $('.doctorName').attr('id'),
        "Treatmentid ": "",
        "Branchid": "",
        "Slottype": "",
        "Sittings": ""



    }

    console.log(JSON.stringify(appointmentBody));

    getToken()
        .done(function(data) {
            console.log(data)
            var accessToken = data.token_type + " " + data.access_token;
            var appointmentUrl = service_url+'/Account/Appointment_operations'
            $.ajax({
                    url: appointmentUrl,
                    type: 'POST',
                    data: JSON.stringify(appointmentBody),
                    beforeSend: function(xhr) {
                        setHeaders(xhr, accessToken)
                    }
                })
                .done(function(data) {
                    console.log(data)
                    alert('Appointment added successfully')

                    var newEvent = {
                        resourceId: $('.doctorName').attr('id'),
                        title: $('#patient').val(),
                        description: 'Appointment with ' + $('.doctorName').val(),
                        start: $('.appointmentDate').val() + 'T' + $('.mainStartTimeHour').val() + ':' + $('.mainStartTimeMins').val() + ':00+05:30',
                        end: $('.appointmentDate').val() + 'T' + $('.mainEndTimeHour').val() + ':' + $('.mainEndTimeMins').val() + ':00+05:30',
                        borderColor: '#c34e61'
                    }
                    console.log(newEvent)
                    events.push(newEvent)
                    $('.doctorName').val('')

                    pageOverlay.hide();
                    console.log($('#calendar'))
                    calendar.addEvent(newEvent);




                })
                .fail(function(error) {
                    console.log(error)
                })






        })







    //   var appointmentTimings = $('.mainStartTimeHour').val() + ':' + $('.mainStartTimeMins').val() + ' - ' + $('.mainEndTimeHour').val() + ":" + $('.mainEndTimeMins').val();
    //   var newEvent = {
    //     resourceId: $('.doctorName').attr('id'),
    //     title: $('#patient').val(),
    //     description:'Appointment with ' + $('.doctorName').val(),
    //     start: $('.appointmentDate').val() + 'T'  + $('.mainStartTimeHour').val() + ':' + $('.mainStartTimeMins').val()+':00+05:30',
    //     end : $('.appointmentDate').val() + 'T'  + $('.mainEndTimeHour').val() + ':' + $('.mainEndTimeMins').val()+':00+05:30',
    //     borderColor: '#378006'
    //   }
    //   console.log(newEvent)
    //   events.push(newEvent)
    //   pageOverlay.hide();
    //   console.log($('#calendar'))
    // calendar.addEvent(newEvent);


})




function checkAppointmentAvailaibility(dateInfo) {
    console.log(dateInfo);
    loader.show();

    if (dateInfo.resource) {
        //clicked on time
        console.log('time');
        //cal service to check appointment for the selected time slot



        var serviceUrl = service_url+'/Account/CL_GetAppointments';
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = mm + '/' + dd + '/' + yyyy;
        // "text":"CheckClinikTimings", 
        // "start":"2016-05-30T15:30:00",
        //  "end":"2016-05-30T16:00:00", 
        //  "id":"10008", "param1":"10008", 
        //  "param2":"79131629"
        var mainStartTime = dateInfo.dateStr.split('+')[0];




        console.log(mainStartTime);

        var et = mainStartTime.split(':')[1].split(':')[0]
        var mainHr = mainStartTime.split('T')[1].split(':')[0]
        console.log(mainHr)
        if (et !== '45') {
            et = (parseInt(et) + 15).toString()
        } else {
            et = '00';
            mainHr = (parseInt(mainHr) + 1).toString()
            if (mainHr.length === 1) {
                mainHr = '0' + mainHr
            }
        }

        console.log(et)
        console.log(mainHr)

        var mainEndTime = mainHr + ':' + et + ':00';
        var mainEndTimetosend = dateInfo.dateStr.split('T')[0] + 'T' + mainEndTime;
        console.log(mainEndTimetosend)

        var body = {
            "text": "CheckClinikTimings",
            "start": mainStartTime,
            "end": mainEndTimetosend,
            "id": localStorage.getItem('userId'),
            "param1": localStorage.getItem('userId'),
            "param2": dateInfo.resource._resource.id
        }
        console.log(JSON.stringify(body))

        getToken()
            .done(function(data) {
                console.log(data)
                var accessToken = data.token_type + " " + data.access_token;
                $.ajax({
                        url: serviceUrl,
                        type: 'POST',
                        data: JSON.stringify(body),
                        beforeSend: function(xhr) {
                            setHeaders(xhr, accessToken)
                        }

                    })
                    .done(function(result) {
                        console.log(result)

                        var doctorsStatus = result.data.Table[0].Result;


                        loader.hide()
                        if (doctorsStatus === 'False') {
                            alert('Doctor is not availaible')

                        } else if (doctorsStatus === 'Exceeded') {

                            alert('Doctor is not availaible before ' + new Date().getHours() + ':' + new Date().getMinutes())
                        } else {
                            var startTimeHour = dateInfo.dateStr.split('T')[1].split(':')[0];
                            var startTimeMins = dateInfo.dateStr.split('T')[1].split(':')[1].split(':')[0];
                            console.log(startTimeHour + ':' + startTimeMins)
                            var allMins = ['00', '15', '30', '45']
                            var doctorName = dateInfo.resource['_resource'].title;
                            var doctorId = dateInfo.resource['_resource'].id;
                            console.log(doctorName);
                            pageOverlay.show();
                            loader.hide();
                            $('.doctorName').val(doctorName).attr('id', doctorId);

                            var appType = ['First Appointment', 'Standard Appointment', 'Third Appointment',

                                'clerk'
                            ];
                            $('.appointmentType').empty();
                            appType.forEach((elem) => {
                                var eachOption = '<option>' + elem + '</option>'
                                $('.appointmentType').append(eachOption)
                            })

                            $('.appointmentDate').val(dateInfo.dateStr.split('T')[0]);


                            $('.mainStartTimeHour').empty();
                            $('.mainStartTimeHour').append('<option>' + startTimeHour + '</option>')

                            $('.mainStartTimeMins').empty();
                            $('.mainEndTimeMins').empty()
                            var endTimeHour;
                            var endTimeMins;
                            if (startTimeMins !== '45') {
                                endTimeMins = (parseInt(startTimeMins) + 15).toString()
                                endTimeHour = startTimeHour
                            } else {
                                endTimeMins = '00';
                                endTimeHour = (parseInt(startTimeHour) + 1).toString();
                                if (endTimeHour.length === 1) {
                                    endTimeHour = '0' + endTimeHour
                                }

                            }
                            $('.mainEndTimeHour').empty()
                            $('.mainEndTimeHour').append('<option>' + endTimeHour + '</option>')
                            allMins.forEach((elem) => {
                                $('.mainStartTimeMins').append('<option>' + elem + '</option>')
                                $('.mainEndTimeMins').append('<option>' + elem + '</option>')
                            })
                            $('.mainStartTimeMins').val(startTimeMins);

                            $('.mainEndTimeMins').val(endTimeMins);
                        }





                    })
                    .fail(function(error) {
                        console.log(error)
                    })
            })




























    } else {
        //clicked on day in month view or week view

    }


}


$('.addPatient').on('click', function() {
    //$('.oldcls').hide() => $('.newcls).show()
})

var close = document.getElementsByClassName('close')[0]
console.log(close)
close.addEventListener('click', function() {
    console.log('sdsd')
    pageOverlay.hide()
    
})