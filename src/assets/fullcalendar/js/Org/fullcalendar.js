var token_service_url = "http://23.92.209.46/OclinicoAPI/token";
var service_url = "http://23.92.209.46/OclinicoAPI/Api";
var appType = []
var currentlangselected = ''

function languageChange(lang) {
    currentlangselected = lang
    setTimeout(function() {
        if (lang === 'sa') {
            calendar.setOption('locale', 'ar-kw')
            $('.fc-license-message').hide();

            $('.fc-resource-cell').each(function(i) {
                $(this).css({
                    'background': colors[i],
                    'height': '50px'
                })
            })
            $('#calendar').css('padding-left', '0px!important')
            $('#calendar').addClass('removePadding')
            console.log($('#calendar').css('padding-left'))


            $('.fc-next-button').empty()
            $('.fc-next-button').html('التالي')

            $('.fc-next-button').empty()
            $('.fc-next-button').html('التالي')
                //fc-prev-button
            $('.fc-prev-button').empty()
            $('.fc-prev-button').html('السابق')


            $('.fc-license-message').hide();
        } else {
            calendar.setOption('locale', 'en')
            $('.fc-resource-cell').each(function(i) {
                $(this).css({
                    'background': colors[i],
                    'height': '50px'
                })
            })
            $('.fc-license-message').hide();
            $('#calendar').css('padding-left', '30px!important')
            $('#calendar').removeClass('removePadding')

            //<span class="fc-icon fc-icon-chevron-right"></span>


            $('.fc-next-button').empty()
            $('.fc-next-button').html('<span class="fc-icon fc-icon-chevron-left"></span>')
                //fc-prev-button
            $('.fc-prev-button').empty()
            $('.fc-prev-button').html('<span class="fc-icon fc-icon-chevron-right"></span>')

        }
    }, 50)
}


var close = document.getElementsByClassName('close')[0]
console.log(close)
    //alert(close)
    // close.addEventListener('click', function () {
    //   console.log(close)
    //   console.log('sdsd')
    //   pageOverlay.hide()
    // })
    // $("#pickerdate").flatpickr({
    //   inline: true

// });

// const fp = flatpickr("#pickerdate", {});
flatpickr("#pickerdatecurrent", {
    inline: true,
    onChange: function(dateText) {
        console.log(dateText)
        calendar.gotoDate(dateText[0])

        getToken()
            .done(function(data) {
                console.log(data)
                var accessToken = data.token_type + " " + data.access_token;
                //getDoctors(accessToken,new Date())
                loadDoctorsName(accessToken, dateText[0], '', '', '')
            })
            .fail(function(error) {
                console.log(error)
            })
    },

});

var arfp = flatpickr('#arabicDob', {
    "locale": "ar", // locale for this instance only
    onOpen: function() {
        enfp.close()
        $('#ardob').prop('checked', 'checked')
        $('#engDob').val('')
    }
});

var enfp = flatpickr('#engDob', {
    //inline : true,
    // locale for this instance only
    onOpen: function() {
        arfp.close()
        $('#endob').prop('checked', 'checked')
        $('#arabicDob').val('')
    }
});

$('.dobmain').on('change', function() {
    console.log($(this).attr('id'))
    if ($(this).attr('id') === 'ardob') {

        arfp.open()
        enfp.close()
    } else {
        arfp.close()
        enfp.open()
    }
})



$('.flatpickr-next-month').on('click', function() {
    nextMonthFlatPick.changeMonth(1)
})
$('.flatpickr-prev-month').on('click', function() {
    nextMonthFlatPick.changeMonth(-1)
})

var currentMonthValue = new Date().getMonth();
nextMonthValue = currentMonthValue + 1;

var nextMonthFlatPick = flatpickr("#pickerdatenext", {
    inline: true,


    onChange: function(dateText) {
        console.log(dateText)
        calendar.gotoDate(dateText[0])

        getToken()
            .done(function(data) {
                console.log(data)
                var accessToken = data.token_type + " " + data.access_token;
                //getDoctors(accessToken,new Date())
                loadDoctorsName(accessToken, dateText[0], '', '')
            })
            .fail(function(error) {
                console.log(error)
            })
    }




});
if (nextMonthFlatPick) {
    nextMonthFlatPick.changeMonth(1)
}

$('.flatpickr-prev-month:eq(1)').hide()
$('.flatpickr-next-month:eq(1)').hide()
    //$('.pickerdatenext').changeMonth(1)
    // $("#pickerdate").datepick({
    //   onSelect: function(dateText) {
    //    console.log(dateText)
    //    calendar.gotoDate(dateText[0])

//    getToken()
// .done(function(data) {
// console.log(data)
// var accessToken = data.token_type+" "+ data.access_token;
// //getDoctors(accessToken,new Date())
//  loadDoctorsName(accessToken,dateText[0])
// })
// .fail(function(error) {
// console.log(error)
// })
//   }
// });

$('.close').on('click', function() {
    //  alert('closed clicked')
    $('.appDocName').html('')
    $('.appTimings').html('')
    $('.appPatientname').html('')
    $('.appPatientphone').html('')
    $('.appPatientemail').html('')
    $('.appPatienttimings').html('')
    $('.arriveStatus').show()
    $('.arrived').css('background', '#fff')
    $('.unarrived').css('background', '#fff')


    $('.addPayment').css('background', '#fff')
    $('.pageOverlay').hide()
    $('.appointmentDetailsModal').hide()
    $('.appointmentModal').hide()
})
var calendarEl = document.getElementById('calendar');
var locale, defaultView, slotDuration, calendarPlugins, pageOverlay,
    loader, events, calendar, header, resources, doctorsAvailabilty;
var colors = []
var tokenuname = window.localStorage.getItem("username");
var psw = window.localStorage.getItem("pval")
var dpsw = decryptPassword(psw);


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
        loadDoctorsName(accessToken, new Date(), '', '')
    })
    .fail(function(error) {
        console.log(error)
    })

$('#calendar').on('click', '.fc-resourceTimeGridDay-button', function() {
    $('.fc-resource-cell').each(function(i) {
        $(this).css({
            'background': colors[i],
            'color': '#fcf8e3',
            'height': '50px',
            'line-height': '50px'
        })
    })
})





function getDoctorsName(token) {
    $.ajax({
        url: service_url + '/Account/DocTreatment_Transactions',
        type: 'POST',


    })
}



//get patient name

$('#patient').on('keyup', function() {
    $(".errormsg").hide();
    var patientName = $(this).val()
    if (patientName.length > 0) {
        $('.loading-icon').show()

        getToken()
            .done(function(data) {
                console.log(data)
                var accessToken = data.token_type + " " + data.access_token;
                var serUrl = service_url + '/Account/GetUser';
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
    } else {
        $('.loading-icon').hide()
        $('.patientDetails').hide()
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
    resources;
    doctorsAvailabilty = []


    console.log('init process ended')
}
initializing()
var checkedDoctors = [];
$('.doctorsNameArea').on('change', '.eachDocCheck', function() {
    console.log($(this).attr('id'))
    if ($(this).is(':checked')) {
        checkedDoctors.push($(this).attr('id'))
    } else {
        checkedDoctors = checkedDoctors.filter((elem) => {
            return elem !== $(this).attr('id')
        })
    }
    console.log(checkedDoctors)

    getToken()
        .done(function(data) {
            console.log(data)
            var accessToken = data.token_type + " " + data.access_token;
            //getDoctors(accessToken,new Date())
            // console.log( checkedDoctors.join(';'))
            // console.log(calendar.getDate());
            // console.log(accessToken)
            loadDoctorsName(accessToken, calendar.getDate(), '', checkedDoctors.join(';'))
        })
        .fail(function(error) {
            console.log(error)
        })
})



$('.docExpand').on('click', function() {
    $('.doctorsNameArea').slideToggle();


    console.log($(this).html())
    if ($(this).html() === '+') {
        $(this).html('-')
    } else {
        $(this).html('+')
    }
    //<span>&#8722;</span>
})


////////// Displaying Doctors Data ////////////////////////////////

function loadDoctorsName(token, calendarDate, renderState, docId) {



    // console.log(docId)

    // console.log(calendarDate)
    loader.show()


    if (docId !== '') {
        var serviceUrl = service_url + '/Account/CL_GetAppointments'
    } else {
        var serviceUrl = service_url + '/Account/DocTreatment_Transactions';
    }



    var todaysDate = convertDate(calendarDate);
    var currentTime = tConvert(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());


    // console.log(todaysDate + ' ' + currentTime)
    // console.log(new Date().getTime());


    if (docId === '') {
        var body = {
            "Sno": "",
            "Practitioner_Id":window.localStorage.setItem("LoginUId"),
            "Treatment_Id": "Clinic",
            "status": "",
            "Login_ID": "",
            "Trans_Date": todaysDate + ' ' + currentTime,
            "Operation": "getDocs",
            "clinicid": localStorage.getItem('userId'),
            "Branchid": "",
            "Last_Updated": ""
        }
    } else {
        var body = {
            "text": "get",
            "start": formatDate(calendar.getDate()) + 'T00:00:00',
            "end": "",
            "id": localStorage.getItem('userId'),
            "param1": docId,
            "param2": ""
        }
    }
    //  console.log(serviceUrl)
    //  console.log(docId)
    //  console.log(JSON.stringify(body))

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

            //doctorsNameArea
            resources = [];
            colors = []
                //var colors = ['red','blue','green','yellow','black']

            function convertTo24HoursFormat(time) {
                // console.log(time)
                time = time.slice(0, 5) + ' PM';
                //  console.log(time)
                var hours = Number(time.match(/^(\d+)/)[1]);
                var minutes = Number(time.match(/:(\d+)/)[1]);
                var AMPM = time.match(/\s(.*)$/)[1];
                if (AMPM == "PM" && hours < 12) hours = hours + 12;
                if (AMPM == "AM" && hours == 12) hours = hours - 12;
                var sHours = hours.toString();
                var sMinutes = minutes.toString();
                if (hours < 10) sHours = "0" + sHours;
                if (minutes < 10) sMinutes = "0" + sMinutes;
                // console.log(sHours + ":" + sMinutes);
                return sHours + ":" + sMinutes + ':00'

            }



            if (docId !== '') {} else {
                $('.doctorsNameArea').html('')
            }

            data.data.Table.forEach((elem, index) => {
                    if (elem.S2_start === null) {
                        elem.S2_start = ''
                    }
                    if (elem.s2_end === null) {
                        elem.S2_start = ''
                    }
                    if (docId !== '') {

                    } else {

                        var eachDocInfo = '<div><input id=' + elem.Practitioner_Id + ' type="checkbox" class="eachDocCheck"> <label for=' + elem.Practitioner_Id + '>' + elem.Name + '<span><i class="ti-check"></i></span></label> </div>'
                        $('.doctorsNameArea').append(eachDocInfo)

                        $('.doctorsNameArea').slideUp();

                    }



                    // console.log(elem.S2_start + " " + elem.S1_end)
                    // if(elem.S1_end !== null && elem.S2_start) {
                    //   resources.push({
                    //     id : elem.Practitioner_Id,
                    //     title: elem.Name || elem.doctorname,
                    //     start :elem.S1_end.replace(' ',''),
                    //     end :elem.S2_start.replace(' ','')


                    //   })
                    // }

                    var resourceDate = todaysDate.split('/')[2] + '-' + todaysDate.split('/')[0] + '-' + todaysDate.split('/')[1]

                    resources.push({
                        id: elem.Practitioner_Id,
                        title: elem.Name || elem.doctorname,
                        start: elem.S1_end.replace(' ', ''),
                        end: elem.S2_start.replace(' ', ''),
                        notAvailableStart: elem.S1_end.replace(' ', ''),
                        notAvailableEnd: elem.S2_start.replace(' ', '')

                    })


                    colors.push(elem.Color)
                    doctorsAvailabilty.push({
                        S1_start: elem.S1_start,
                        S1_end: elem.S1_end,
                        S2_start: elem.S2_start,
                        s2_end: elem.s2_end
                    })
                })
                //doctorsAvailabilty
                // console.log(resources)
            resources.forEach((el, index) => {
                if (el.end !== null && el.end !== '') {

                    resources[index].start = convertTo24HoursFormat(el.start.replace(' ', '')),
                        resources[index].end = convertTo24HoursFormat(el.end.replace(' ', ''))
                    resources[index].notAvailableStart
                } else {
                    resources[index].start = ''
                    resources[index].end = ''
                }
            })


            // console.log($('.fc-resource-cell'))

            console.log(resources)
                //    loader.hide();

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




$('.calDate').on('change', function() {
    calendar.gotoDate($(this).val())
    setTimeout(function() {
        $('.loader').show();


        getToken()
            .done(function(data) {
                console.log(data)
                var accessToken = data.token_type + " " + data.access_token;

                var serviceUrl = service_url + '/Account/DocTreatment_Transactions';


                var todaysDate = convertDate(calendar.getDate());
                var currentTime = tConvert(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
                console.log(todaysDate + ' ' + currentTime)
                console.log(new Date().getTime());

                var body = {
                    "Sno": "",
                    "Practitioner_Id":window.localStorage.setItem("LoginUId"),
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
                            if (eachresource) {
                                eachresource.remove();
                            }
                        }
                        resources = [];
                        colors = []
                            //var colors = ['red','blue','green','yellow','black']
                        result.data.Table.forEach((elem, index) => {
                            if (elem.start === null) {
                                elem.start = ''
                            }

                            if (elem.end === null) {
                                elem.end = ''
                            }
                            resources.push({
                                id: elem.Practitioner_Id,
                                title: elem.Name,
                                start: elem.S1_end.replace(' ', ''),
                                end: elem.S2_start.replace(' ', '')

                            })
                            console.log(elem.Color);
                            colors.push(elem.Color)
                        })

                        resources.forEach((el) => {
                            calendar.addResource(el)
                        })

                        console.log(colors);
                        $('.fc-resource-cell').each(function(i) {
                            $(this).css({
                                'background': colors[i],
                                'height': '50px'
                            })
                        })
                        $('.loader').hide()


                    })



            })







    }, 100)
})

$('.clsc').on('click', function() {
    $('.btns').hide()
    $('.cancelApp').show()
    $('.appFoot').addClass('hide')
})

$('.cls').on('click', function() {
    $('.appDocName').html('')
    $('.appTimings').html('')
    $('.appPatientname').html('')
    $('.appPatientphone').html('')
    $('.appPatientemail').html('')
    $('.appPatienttimings').html('')
    $('.arriveStatus').show()
    $('.arrived').css('background', '#fff')
    $('.unarrived').css('background', '#fff')


    $('.addPayment').css({
        'background': '#fff',
        'color': 'black'
    })
    $('.pageOverlay').hide()
    $('.appointmentDetailsModal').hide()
    $('.appointmentModal').hide()
})

$('.addPayment').on('click', function() {

    console.log(document.URL);

    if (document.URL.includes('http://localhost')) {

        //http://localhost:1201/#/addinvoice;frompage=invoice

        //http://localhost:4200/#/addinvoice?createpatientinvoice=000102
        window.location.href = 'http://localhost:5200/addinvoice?createpatientinvoice=' + localStorage.getItem('mainPatientId')
            // window.location.href = 'http://iumc.oclinico.com/addinvoice?createpatientinvoice=' + localStorage.getItem('mainPatientId')
    } else if (document.URL.includes('http://23.92.209.46')) {
        console.log("http://23.92.209.46");
        window.localStorage.href = 'http://23.92.209.46/oclinico/addinvoice?createpatientinvoice=' + localStorage.getItem('mainPatientId')
    } else {
        console.log(document.URL);

        //  window.location.href = 'http://graylogic.net/OclinicoNew/#/addinvoice?createpatientinvoice=' + localStorage.getItem('mainPatientId')
        window.location.href = 'http://iumc.oclinico.com/addinvoice?createpatientinvoice=' + localStorage.getItem('mainPatientId')
    }

})


$('.arrived').on('click', function() {



    console.log($(this).css('background').includes('rgb(77, 108, 244)'))
    if ($(this).css('background').includes('rgb(77, 108, 244)')) {
        return;
    }



    var url = service_url + '/Account/Appointment_operations';




    // "userid":"10008",
    // "type":"clerk",
    // "patientid":"0000191",
    // "title":"",
    // "description":"test",
    // "event_start":"2019-05-24 13:30:00.000",
    // "event_end":"2019-05-24 13:45:00.000",
    // "Updateddt":"2019-05-19 10:30:36.000",
    // "createddate":"2019-05-19 10:30:36.000",
    // "arrivestatus":"Arrived",
    // "all_day":"False",
    // "Repeatstatus":"None",
    // "Status":"1",
    // "appointdate":"2019-06-24 11:00",
    // "fromhr":"13:30",
    // "tohr":"13:45",
    // "text":"update",
    // "login":"",
    // "Clinicid":"10008",
    // "appointmentid":"1008",
    // "practitionerid":"26664852",
    // "Treatmentid ":"",
    // "Branchid":"",
    // "Slottype":"",
    // "Sittings":""



    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        console.log([year, month, day].join('-'))
        return [year, month, day].join('-');
    }




    // var params = {
    //   "userid":localStorage.getItem('userId'), "type":$('.appty').html(),
    //    "patientid":localStorage.getItem('veryMainPatinetId'), 
    //    "title":"", "description":"", 
    //    "event_start":$('.eventStart').html().replace('T',' '),
    //     "event_end":$('.eventEnd').html().replace('T',' '), 
    //     "Updateddt":formatDate(calendar.getDate()) + ' ' + new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()+'.000',
    //      "createddate":formatDate(calendar.getDate()) + ' ' + new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()+'.000',
    //       "arrivestatus":"Arrived", "all_day":"False",
    //        "Repeatstatus":"None", "Status":"1",
    //         "appointdate":formatDate(calendar.getDate()) + ' ' + new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()+'.000',
    //          "fromhr":"", "tohr":"",
    //           "text":"update", "login":"", 
    //           "Clinicid":localStorage.getItem('userId'), 
    //           "appointmentid":localStorage.getItem('mainAppointmentId'),
    //            "practitionerid":"",
    //             "Treatmentid ":"",
    //              "Branchid":"",
    //               "Slottype":"", 
    //               "Sittings":""
    // }


    var params = {
        "userid": '',
        "type": '',
        "patientid": '',
        "title": "",
        "description": "",
        "event_start": '',
        "event_end": '',
        "Updateddt": '',
        "createddate": '',
        "arrivestatus": "Arrived",
        "all_day": "",
        "Repeatstatus": "None",
        "Status": "",
        "appointdate": '',
        "fromhr": "",
        "tohr": "",
        "text": "Update1",
        "login": "",
        "Clinicid": '',
        "appointmentid": localStorage.getItem('mainAppointmentId'),
        "practitionerid": "",
        "Treatmentid ": "",
        "Branchid": "",
        "Slottype": "",
        "Sittings": ""
    }
    console.log(params)
    console.log(JSON.stringify(params))


    getToken()
        .done(function(data) {
            var accessToken = data.token_type + " " + data.access_token;

            $.ajax({
                    url: url,
                    type: 'POST',
                    data: JSON.stringify(params),
                    beforeSend: function(xhr) {
                        setHeaders(xhr, accessToken)
                    }
                })
                .done(function(res) {
                    alert('Patient Arrived')
                    location.reload()

                    $('.appDocName').html('')
                    $('.appTimings').html('')
                    $('.appPatientname').html('')
                    $('.appPatientphone').html('')
                    $('.appPatientemail').html('')
                    $('.appPatienttimings').html('')
                    $('.arriveStatus').show()
                    $('.arrived').css('background', '#fff')
                    $('.unarrived').css('background', '#fff')
                })
        })
})





$('.unarrived').on('click', function() {
    var url = service_url + '/Account/Appointment_operations';
    var params = {
        "userid": '',
        "type": "",
        "patientid": '',
        "title": "",
        "description": "",
        "event_start": "",
        "event_end": "",
        "Updateddt": "",
        "createddate": "",
        "arrivestatus": "NotArrived",
        "all_day": "",
        "Repeatstatus": "",
        "Status": "",
        "appointdate": "",
        "fromhr": "",
        "tohr": "",
        "text": "Update1",
        "login": "",
        "Clinicid": '',
        "appointmentid": localStorage.getItem('mainAppointmentId'),
        "practitionerid": "",
        "Treatmentid ": "",
        "Branchid": "",
        "Slottype": "",
        "Sittings": ""
    }

    console.log(params)
    getToken()
        .done(function(data) {
            var accessToken = data.token_type + " " + data.access_token;

            $.ajax({
                    url: url,
                    type: 'POST',
                    data: JSON.stringify(params),
                    beforeSend: function(xhr) {
                        setHeaders(xhr, accessToken)
                    }
                })
                .done(function(res) {
                    alert('Patient Not Arrived')
                    location.reload()
                    $('.appDocName').html('')
                    $('.appTimings').html('')
                    $('.appPatientname').html('')
                    $('.appPatientphone').html('')
                    $('.appPatientemail').html('')
                    $('.appPatienttimings').html('')
                    $('.arriveStatus').show()
                    $('.arrived').css('background', '#fff')
                    $('.unarrived').css('background', '#FF8C00')
                })
        })
})









$('.addTreatment').on('click', function() {
    localStorage.setItem('patientIdNew', localStorage.getItem('mainPatientId'))
    window.location.href = 'http://graylogic.net/OclinicoNew/#/treatmentnote'
})

$(' #calendar').on('click', '.fc-prev-button', function() {
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

                        var serviceUrl = service_url + '/Account/DocTreatment_Transactions';


                        var todaysDate = convertDate(calendar.getDate());
                        var currentTime = tConvert(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
                        console.log(todaysDate + ' ' + currentTime)
                        console.log(new Date().getTime());

                        var body = {
                            "Sno": "",
                            "Practitioner_Id": window.localStorage.setItem("LoginUId"),
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
                                    if (eachresource) {
                                        eachresource.remove();
                                    }

                                }
                                resources = [];
                                colors = []
                                    //var colors = ['red','blue','green','yellow','black']
                                result.data.Table.forEach((elem, index) => {
                                    if (elem.S1_end === null) {
                                        elem.S1_end = ''
                                    }

                                    if (elem.S2_start === null) {
                                        elem.S2_start = ''
                                    }
                                    resources.push({
                                        id: elem.Practitioner_Id,
                                        title: elem.Name,
                                        start: elem.S1_end.replace(' ', ''),
                                        end: elem.S2_start.replace(' ', '')

                                    })
                                    colors.push(elem.Color)
                                    doctorsAvailabilty.push({
                                        S1_start: elem.S1_start,
                                        S1_end: elem.S1_end,
                                        S2_start: elem.S2_start,
                                        s2_end: elem.s2_end
                                    })
                                })

                                resources.forEach((el) => {
                                    calendar.addResource(el)
                                })
                                $('.fc-resource-cell').each(function(i) {
                                    $(this).css({
                                        'background': colors[i],
                                        'height': '50px'
                                    })
                                })
                                $('.loader').hide()
                                getClinicTimings(calendar.getDate(), '')

                            })



                    })



            }, 100)




            // calendar.refetchResources
            //  calendar.destroy()
            //   loadDoctorsName(accessToken,calendar.getDate(),'rerender')


        })
        .fail(function(error) {
            console.log(error)
        })

})










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

                        var serviceUrl = service_url + '/Account/DocTreatment_Transactions';


                        var todaysDate = convertDate(calendar.getDate());
                        var currentTime = tConvert(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
                        console.log(todaysDate + ' ' + currentTime)
                        console.log(new Date().getTime());

                        var body = {
                            "Sno": "",
                            "Practitioner_Id": window.localStorage.setItem("LoginUId"),
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
                                    if (eachresource) {
                                        eachresource.remove();
                                    }
                                }
                                resources = [];
                                colors = []
                                    //var colors = ['red','blue','green','yellow','black']
                                result.data.Table.forEach((elem, index) => {
                                    resources.push({
                                        id: elem.Practitioner_Id,
                                        title: elem.Name,


                                    })
                                    console.log(elem.Color);
                                    colors.push(elem.Color)
                                    doctorsAvailabilty.push({
                                        S1_start: elem.S1_start,
                                        S1_end: elem.S1_end,
                                        S2_start: elem.S2_start,
                                        s2_end: elem.s2_end
                                    })
                                })

                                resources.forEach((el) => {
                                    calendar.addResource(el)
                                })

                                console.log(colors);
                                $('.fc-resource-cell').each(function(i) {
                                    $(this).css({
                                        'background': colors[i],
                                        'height': '50px'
                                    })
                                })



                                console.log(calendar.getDate())
                                getClinicTimings(calendar.getDate(), '')
                                    // $('.loader').hide()


                            })



                    })

            }, 100)




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
    var serviceUrl = service_url + '/Account/DocTreatment_Transactions';


    var todaysDate = convertDate(date);
    var currentTime = tConvert(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());


    console.log(todaysDate + ' ' + currentTime)
    console.log(new Date().getTime());

    var body = {
        "Sno": "",
        "Practitioner_Id":window.localStorage.setItem("LoginUId"),
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







function renderCalendar(clinicTimings, allAppointmentsData, renderState, notavai) {
    // console.log(calendar);
    //calendar.destroy()
    var mainDate = '';
    if (calendar) {
        console.log(calendar.getDate())
        mainDate = calendar.getDate()
    }

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
            Appointment_id: elem.Appointment_id,
            fromhr: elem.fromhr,
            tohr: elem.tohr,
            arrivestatus: elem.arrivestatus,
            Practitioner_Id: elem.Practitioner_Id
        })
    })

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        console.log([year, month, day].join('-'))
        return [year, month, day].join('-');
    }
    // if(calendar) {
    //   if(notavai[0] !== undefined && notavai[1] !== undefined) {




    //     var newnotavl = []
    //     // notavai.forEach((elem) => {
    //     //   //2016-08-02T10:30:00
    //     //   newnotavl. push(formatDate(calendar.getDate()) +'T' +elem)
    //     //   console.log(elem)
    //     // })
    //   }

    // }




    console.log(events)
        // console.log(newnotavl)


    console.log(resources)



    // if(newnotavl !== undefined && newnotavl.length !== 0) {


    //   resources.forEach((el) => {
    //     events.push({
    //         resourceId : el.id,
    //             title:  'Doctor not avaiaible',
    //         backgroundColor : 'green',
    //         start :formatDate(calendar.getDate())+'T'+ el.start.replace(' ',''),
    //         end :formatDate(calendar.getDate())+'T'+el.start.replace(' ',''),
    //         borderColor : '#fff',
    //         fontSize : '13px'
    //     })
    //   })


    // }



    resources.forEach((elem) => {
        events.push({
            resourceId: elem.id,
            start: elem.notAvailableStart,
            end: elem.notAvailableEnd,
            title: 'Not Availaible'
        })
    })




    console.log(events)


    header = {

        left: 'prev,next today',
        center: 'title',

        right: 'resourceTimeGridDay,timeGridWeek,dayGridMonth'
    }

    if (currentlangselected === 'sa') {
        locale = 'ar-kw'
    } else {
        locale = ''
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
            // console.log(dateInfo);
            checkAppointmentAvailaibility(dateInfo)
        },
        eventClick: function(eventInfo) {
            // console.log(eventInfo);
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
            // console.log(info)
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


    var fullcalenWidth = $('.fc-view-container .fc-view > table')
    console.log(fullcalenWidth)
    console.log(resources)
    if (resources.length === 0) {
        alert('There are no appointments with this doctor');
        resources.push({
            "Appointment_id": "",
            "Noof_Sittings": "",
            "PatientName": "",
            "Patientname1": "",
            "Practitioner_Id": "",
            "arrivestatus": "",
            "borderColor": "",
            "doctorname": "",
            "end": "",
            'fromhr': "",
            "patientid": "",
            "resourceId": "",
            "resourceName": "",
            "start": "",
            'title': "",
            "tohr": "",
            'type': ""

        })
    }
    console.log(events)
    var calendate = calendar.getDate();
    var mm = calendate.getMonth()
    console.log(mm)
    if (mm.toString().length === 1) {
        mm = '0' + (mm + 1).toString();
    } else {
        mm = mm.toString()
    }
    var dd = calendate.getDate()

    if (dd.toString().length === 1) {
        dd = '0' + (dd).toString();
    } else {
        dd = dd.toString()
    }
    var daysResources = [];
    var dayFormat = calendate.getFullYear() + '-' + mm + '-' + dd
    events.forEach((elem) => {
        console.log(elem);
        if (elem.start != undefined || elem.start != null) {
            if (elem.start.split('T')[0] === dayFormat) {
                console.log(elem.start.split('T')[0])
                daysResources.push(elem)
            }

        }

    })
    console.log(daysResources)
    console.log(calendate.getFullYear() + '-' + mm + '-' + dd);
    console.log($('.eachDocCheck:checked').length);
    console.log(resources.length);

    if ($('.eachDocCheck:checked').length > 0) {
        // onetothree fourtoseven eighttoten morethanten
        if (daysResources.length <= 3) {
            console.log('first less than 5')
                //fullcalenWidth.style.width = '1000px!important'

            // console.log(docId)
            $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('onetothree')
            console.log($('.fc-view-container').find('.fc-resourceTimeGridDay-view > table').css('width'))

        } else if (daysResources.length > 3 && daysResources.length <= 7) {
            $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('fourtoseven')
        } else if (daysResources.length > 7 && daysResources.length <= 10) {
            $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('eighttoten')
        } else {
            $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('morethanten')
        }

    } else {
        if (resources.length <= 3) {
            console.log('seccond less than 5')
                //fullcalenWidth.style.width = '1000px!important'

            // console.log(docId)
            $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('onetothree')
            console.log($('.fc-view-container').find('.fc-resourceTimeGridDay-view > table').css('width'))

        } else if (resources.length > 3 && resources.length <= 7) {
            console.log('seccond less than 7')
            $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('fourtoseven')
        } else if (resources.length > 7 && resources.length <= 10) {
            $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('eighttoten')
        } else {
            $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('morethanten')
        }
    }



    //class="fc-view fc-resourceTimeGridDay-view fc-timeGrid-view"

    if (mainDate !== '') {
        calendar.gotoDate(mainDate)
    }

    if (calendar) {

        console.log(resources);

        resources.forEach((el) => {
            if (el.start === null) {
                el.start = ''
            }

            if (el.end === null) {
                el.end = ''
            }
            console.log(el)
                // if(el.end !== null && el.end !== '') {

            //        events.push({
            //         resourceId : el.id,
            //             title:  'Doctor not avaiaible',
            //         backgroundColor : 'green',
            //         start :formatDate(calendar.getDate())+'T'+ el.start.replace(' ',''),
            //         end :formatDate(calendar.getDate())+'T'+el.end.replace(' ',''),
            //         borderColor : '#fff',
            //         fontSize : '13px'
            //     })
            // }
        })


        if (currentlangselected === 'sa') {


            $('#calendar').css('padding-left', '0px!important')
            $('#calendar').addClass('removePadding')
            console.log($('#calendar').css('padding-left'))


            $('.fc-next-button').empty()
            $('.fc-next-button').html('التالي')

            $('.fc-next-button').empty()
            $('.fc-next-button').html('التالي')
                //fc-prev-button
            $('.fc-prev-button').empty()
            $('.fc-prev-button').html('السابق')



        }

        //calendar.rerenderEvents()
    }


    $('.fc-resource-cell').each(function(i) {
        $(this).css({
            'background': colors[i],
            'color': '#fcf8e3',
            'height': '50px',
            'line-height': '50px'
        })
    })


    console.log(doctorsAvailabilty)
    $('.fc-resource-cell').each(function(index) {
        if (doctorsAvailabilty[index].S2_start === null || '') {
            doctorsAvailabilty[index].S2_start = 'N/A'
        }
        if (doctorsAvailabilty[index].s2_end === null || '') {
            doctorsAvailabilty[index].s2_end = 'N/A'
        }

        //$(this).append('<div style="font-size:10px;font-weight:300!important">  <div>  <span> Session 1: '+ doctorsAvailabilty[index].S1_start +'</span> <span> - '+ doctorsAvailabilty[index].S1_end +' </span></div><div> <span>Session 2: '+ doctorsAvailabilty[index].S2_start +'</span> <span> - '+ doctorsAvailabilty[index].s2_end  +'</span> </div>  </div>')
        console.log($(this).html())
    })
    $('.fc-license-message').hide();
    // console.log($('.fc-time-grid td.fc-today'))
    $('.fc-time-grid td.fc-today').css('background', '#fff!important');

    loader.hide();
    console.log('loaded appointments completeley')
}




$('.appHeaderbo').on('click', '.ifConfirmed', function() {

    if ($(this).html() !== "UnConfirmed") {
        return;
    }
    getToken()
        .done(function(data) {
            var url = service_url + '/Account/GetUser';
            var body = {
                "text": "update_status",
                "id": $('.appointmentDetailsModal').attr('id'),
                "param1": "",
                "param2": ""
            }

            var token = data.token_type + ' ' + data.access_token
            $.ajax({
                    url: url,
                    type: 'POST',
                    data: JSON.stringify(body),
                    beforeSend: function(xhr) {
                        setHeaders(xhr, token)
                    }

                })
                .done(function(result) {
                    alert('Patient Confirmed')
                    $(this).html('Confirmed').css({
                        'background': 'green',
                        'color': '#fff'
                    })
                })

        })




})



function showAppointmentData(eventInfo) {


    $('.appDocName').html('')
    $('.appTimings').html('')
    $('.appPatientname').html('')
    $('.appPatientphone').html('')
    $('.appPatientemail').html('')
    $('.appPatienttimings').html('')
    $('.arriveStatus').show()
    $('.arrived').css('background', '#fff')
    $('.unarrived').css('background', '#fff')


    $('.addPayment').css({
        'background': '#fff',
        'color': 'black'
    })

    localStorage.setItem('veryMainPatinetId', eventInfo.event.extendedProps.patientid)
    localStorage.setItem('mainPatientId', eventInfo.event.extendedProps.patientid)

    localStorage.setItem('mainAppointmentId', eventInfo.event.extendedProps.Appointment_id)
    console.log(eventInfo)

    $('.loader').show();
    var extendedProps = eventInfo.event.extendedProps

    var serviceUrl = service_url + '/Account/CL_GetAppointments';
    var params = {
        "text": "Getappointment",
        "start": "",
        "end": "",
        "id": localStorage.getItem('userId'),
        "param1": eventInfo.event.extendedProps.Appointment_id,
        "param2": ""

    }

    console.log(JSON.stringify(params));

    getToken()
        .done(function(data) {
            console.log(data);
            var token = data.token_type + ' ' + data.access_token
            $.ajax({
                    url: serviceUrl,
                    type: 'POST',
                    data: JSON.stringify(params),
                    beforeSend: function(xhr) {
                        setHeaders(xhr, token)
                    }

                })
                .done(function(res) {
                    console.log((res));

                    res = res.data.Table[0]
                    pageOverlay.show();
                    $('.appointmentDetailsModal').show().attr('id', res.Appointment_id)
                    $('.appointmentModal').hide();
                    $('.createPatientModal').hide()
                    if (res.length === 0) {
                        res.doctorname = extendedProps.doctorname
                    } else {

                    }

                    $('.eventStart').html(res.Appointment_start.split('T')[0] + 'T' + (res.Appointment_startTime) + ':00')
                    $('.eventEnd').html(res.Appointment_end)
                    $('.appDocName').html(res.doctorname)
                    $('.appTimings').html(res.appdetails)
                    $('.appty').html(res.type)

                    //appPatientname appPatientphone appPatientemail  appPatienttimings

                    $('.appPatientname').html(res.PatientName || extendedProps.PatientName).attr('id', res.PatientId)
                    $('.appPatientphone').html(res.MobileNo)
                    $('.appPatientid').html(res.PatientId)
                    $('.appPatientemail').html(res.Email)
                    $('.appPatienttimings').html(res.appdetails)

                    if (res.Patienttype !== null) {
                        if (res.appstatus === "UnConfirmed") {
                            $('.ifConfirmed').show().html(res.appstatus).css({
                                'background': 'transparent',
                                'color': '#fff'
                            });
                        } else {
                            $('.ifConfirmed').show().html(res.appstatus).css({
                                'background': 'green',
                                'color': '#fff'
                            })
                        }


                        $('.appPatientname').append('<span class="mobileIcon"><img src="assets/images/smartphone-call.png"></span>')
                    } else {
                        $('.ifConfirmed').hide()
                        $('.appPatientname').find('.mobileIcon').remove()

                    }




                    console.log(res.arrivestatus)
                    if (extendedProps.arrivestatus.toLowerCase() === 'confirmed') {
                        //arriveStatus

                        $('.arriveStatus').hide()

                        $('.addPayment').css({
                            'background': 'green',
                            'color': '#fff'
                        }).html('Payment Success')
                    } else if (extendedProps.arrivestatus.toLowerCase() === 'unconfirmed') {
                        $('.arriveStatus').show()
                        $('.arrived').show()
                        $('.unarrived').show()
                        $('.addPayment').html('Add payment')
                    } else if (extendedProps.arrivestatus.toLowerCase() === 'arrived') {
                        $('.arrived').css('background', '#4d6cf4')
                        $('.unarrived').hide()
                        $('.addPayment').html('Add payment')
                    } else if (extendedProps.arrivestatus.toLowerCase() === 'notarrived') {
                        $('.unarrived').css('background', '#FF8C00')
                        $('.arrived').hide()
                        $('.addPayment').html('Add payment')
                    }
                    $('.loader').hide()

                })
        })







}
///////// Get Clinic Timings //////////////////////////

function getClinicTimings(date, renderState) {



    //var serviceUrl = service_url+'/Account/CL_GetAppointments';

    var serviceUrl = service_url + '/Account/GetUser';
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
    // var body = { 
    //   "text":"GetClinikTimings",
    //   "start":today,
    //   "end":"",
    //   "id":localStorage.getItem('userId'),
    //   "param1":"",
    //   "param2":""
    //   }



    var body = {
        "text": "ClinikTimings",


        "id": localStorage.getItem('userId'),
        "param1": "",
        "param2": today
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



                    //     if(result.data.Table[0].s1start.includes('PM')){
                    //        startTime =  convertTo24HoursFormat(result.data.Table[0].s1start.replace(' ',''))
                    //     } else {
                    //       startTime = result.data.Table[0].s1start.replace(' ','').slice(0,5)+':00';
                    //     }

                    //     if(result.data.Table[0].s2end !== null && result.data.Table[0].s2end !== '') {
                    //       console.log( result.data.Table[0].s2end.replace(' ','') !== '')
                    //       console.log('s2end')
                    //       if(result.data.Table[0].s2end.includes('PM')){
                    //         endTime =  convertTo24HoursFormat(result.data.Table[0].s2end.replace(' ',''))
                    //      } else {
                    //        endTime = result.data.Table[0].s2end.replace(' ','').slice(0,5)+':00';
                    //      }

                    //      var s1endtime = ''
                    //      var s2starttime = ''
                    //  if(result.data.Table[0].s1end.includes('PM')){
                    //         s1endtime =  convertTo24HoursFormat(result.data.Table[0].s1end.replace(' ',''))
                    //      } else {
                    //       s1endtime = result.data.Table[0].s1end.replace(' ','').slice(0,5)+':00';
                    //      }

                    //      if(result.data.Table[0].s2start.includes('PM')){
                    //       s2starttime =  convertTo24HoursFormat(result.data.Table[0].s2start.replace(' ',''))
                    //    } else {
                    //     s2starttime = result.data.Table[0].s2start.replace(' ','').slice(0,5)+':00';
                    //    }

                    //     } else {
                    //       console.log('s1end')
                    //       if(result.data.Table[0].s1end.includes('PM')){
                    //         endTime =  convertTo24HoursFormat(result.data.Table[0].s1end.replace(' ',''))
                    //      } else {
                    //        endTime = result.data.Table[0].s1end.replace(' ','').slice(0,5)+':00';
                    //      }
                    //     }

                    if (result.data.Table[0].Result == "False") {

                        loader.hide();
                        // alert(result.data.Table[0].Output);
                        // $(".fc-view-container").css({"visibility": "hidden"});
                        // $(".showcal").find("#hval").css({"visibility": "visible"});
                        // $(".showcal").find("#hval").html(result.data.Table[0].Output);
                        $(".fc-view-container").html(result.data.Table[0].Output);
                        $(".fc-view-container").css({ 'color': 'red', 'padding': '100px;' });

                    } else {
                        $(".showcal").find("#hval").html("");
                        $(".showcal").find("#hval").css({ "visibility": "hidden" });
                        $(".fc-view-container").css({ "visibility": "visible" });
                        var startTime = result.data.Table[0].Clinik_start + ':00:00';
                        var endTime = result.data.Table[0].Clinik_end + ':00:00';
                        var timings = [startTime, endTime];
                        // var notAvailaibleTimings = [s1endtime,s2starttime];

                        console.log(timings)
                            //console.log(notAvailaibleTimings)
                            // minTime : '09:00:00',
                            // maxTime : '17:00:00',

                        console.log('loading process started')
                        console.log(loader)
                        loader.show();
                        if (calendar) {
                            renderAppointments(timings, renderState, '', calendar.getDate())
                        } else {
                            //calendar.getDate()

                            renderAppointments(timings, renderState, '', formatDate(new Date()))
                        }
                    }




                })
        })
        .fail(function(error) {
            loader.hide()
            console.log(error)
        })
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    console.log([year, month, day].join('-'))
    return [year, month, day].join('-');
}

///////////////////////////////// Appointments HEre ////////

function renderAppointments(timings, renderState, notavai, appointmentDates) {

    console.log(appointmentDates);
    if (!appointmentDates.toString().includes('-')) {
        appointmentDates = formatDate(appointmentDates)
    }
    console.log(appointmentDates);
    var appService = service_url + '/Account/Get_Data_Based_On_Roles';
    //appointmentDates+'T00:00:00'


    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];;

    if (calendar) {
        console.log(calendar.month)
    } else {

    }
    var monthTopass = new Date(appointmentDates).getMonth() + 1
    console.log(monthTopass)

    var body = {
        "Condition": "GetAppointDetailsbymonth",
        "Clinkid": localStorage.getItem('userId'),
        "Branchid": "",
        "Userid": localStorage.getItem('userId'),
        "Roletype": "Clinic",
        "Appointmentid": monthTopass,
        "Treatmentid": "",
        "Practitioner": "",
        "arrivestatus": "",
        "param1": appointmentDates.split('-')[0],
        "param2": ""

    }
    console.log(body)
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
                    console.log(resources)
                    renderCalendar(timings, data, renderState, notavai)
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

    console.log("Appintment Adding clicked. . .");
    console.log($('#patient').val())

    if ($('#patient').val() == "" || $('#patient').val() == undefined) {
        $(".errormsg").show();
        return false;
    } else {
        $(".errormsg").hide();

    }

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
            var appointmentUrl = service_url + '/Account/Appointment_operations'
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
                    alert('Appointment added successfully');

                    location.reload()
                        //      resourceId: elem.Practitioner_Id,
                        //      resourceName : elem.Practitioner,
                        //      PatientName : elem.PatientName,
                        //      Patientname1 : elem.Patientname1,
                        //     title:  elem.PatientName,
                        // //   description:'Appointment with ' + $('.doctorName').val(),
                        //  start: elem.Appointment_start,
                        //  end : elem.Appointment_end,
                        //  borderColor: borderColorStatus,
                        // // backgroundColor : elem.Color,
                        //  Noof_Sittings : elem.Noof_Sittings,
                        //  doctorname : elem.doctorname,
                        //  patientid : elem.patientid,
                        //  type : elem.type,
                        //  Appointment_id : elem.Appointment_id,
                        //  fromhr : elem.fromhr,
                        //  tohr : elem.tohr,
                        //  arrivestatus : elem.arrivestatus,
                        //  Practitioner_Id : elem.Practitioner_Id
                        //Friday, 24 May 2019 at 13:00:00 duration  is 0:15:0
                        //appdetails Friday,24/05/2019 at 13:00 for 15 minutes
                    var d = new Date(calendar.getDate());
                    var dayName = d.toString().split(' ')[0];
                    var newEvent = {
                        resourceId: $('.doctorName').attr('id'),
                        resourceName: $('.doctorName').val(),
                        PatientName: $('#patient').val(),
                        title: $('#patient').val(),
                        description: 'Appointment with ' + $('.doctorName').val(),
                        start: $('.appointmentDate').val() + 'T' + $('.mainStartTimeHour').val() + ':' + $('.mainStartTimeMins').val() + ':00+05:30',
                        end: $('.appointmentDate').val() + 'T' + $('.mainEndTimeHour').val() + ':' + $('.mainEndTimeMins').val() + ':00+05:30',
                        borderColor: '#c34e61',
                        doctorname: $('.doctorName').val(),
                        patientid: $('#patient').attr('patientid'),
                        type: $('.appointmentType').val(),
                        Appointment_id: '',
                        fromhr: $('.mainStartTimeHour').val() + ':' + $('.mainStartTimeMins').val(),
                        tohr: $('.mainEndTimeHour').val() + ':' + $('.mainEndTimeMins').val(),
                        arrivestatus: 'UnConfirmed',
                        Practitioner_Id: $('.doctorName').attr('id'),
                        appDetails: dayName + ',' + calendar.getDate() + ' at ' + $('.mainStartTimeHour').val() + ' for 15 mins '
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


    if (dateInfo.resource) {
        loader.show();
        //clicked on time
        console.log('time');
        //cal service to check appointment for the selected time slot



        var serviceUrl = service_url + '/Account/CL_GetAppointments';
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
                        console.log("Hello. .");
                        console.log(result)

                        var doctorsStatus = result.data.Table[0].Result;


                        loader.hide()

                        function convertTime24to12(time24) {
                            var tmpArr = time24.split(':'),
                                time12;
                            if (+tmpArr[0] == 12) {
                                time12 = tmpArr[0] + ':' + tmpArr[1] + ' pm';
                            } else {
                                if (+tmpArr[0] == 00) {
                                    time12 = '12:' + tmpArr[1] + ' am';
                                } else {
                                    if (+tmpArr[0] > 12) {
                                        time12 = (+tmpArr[0] - 12) + ':' + tmpArr[1] + ' pm';
                                    } else {
                                        time12 = (+tmpArr[0]) + ':' + tmpArr[1] + ' am';
                                    }
                                }
                            }
                            return time12;
                        }



                        if (doctorsStatus === 'False') {
                            alert('Doctor is not availaible')

                        } else if (doctorsStatus === 'Exceeded') {

                            alert("You can't make an appointment before " + convertTime24to12(new Date().getHours() + ':' + new Date().getMinutes()))
                        } else {


                            var getType = service_url + '/Account/CL_GetAppointments';
                            var body = {
                                "text": "GetSlots",
                                "start": '',
                                "end": "",
                                "id": localStorage.getItem('userId'),
                                "param1": "",
                                "param2": ""
                            }

                            getToken()
                                .done(function(data) {
                                    console.log(data)

                                    $.ajax({
                                            url: getType,
                                            type: 'POST',
                                            data: JSON.stringify(body),
                                            beforeSend: function(xhr) {
                                                setHeaders(xhr, accessToken)
                                            }

                                        })
                                        .done(function(response) {
                                            console.log(response)



                                            $('.appDocName').html('')
                                            $('.appTimings').html('')
                                            $('#patient').val('')
                                            $('.appPatientname').html('')
                                            $('.appPatientphone').html('')
                                            $('.appPatientemail').html('')
                                            $('.appPatienttimings').html('')
                                            $('.arriveStatus').show()
                                            $('.arrived').css('background', '#fff')
                                            $('.unarrived').css('background', '#fff')
                                            $('.notesText').val('')

                                            $('.addPayment').css({
                                                'background': '#fff',
                                                'color': 'black'
                                            })


                                            var startTimeHour = dateInfo.dateStr.split('T')[1].split(':')[0];
                                            var startTimeMins = dateInfo.dateStr.split('T')[1].split(':')[1].split(':')[0];
                                            console.log(startTimeHour + ':' + startTimeMins)
                                            var allMins = ['00', '15', '30', '45']
                                            var doctorName = dateInfo.resource['_resource'].title;
                                            var doctorId = dateInfo.resource['_resource'].id;
                                            console.log(doctorName);
                                            pageOverlay.show();
                                            $('.appointmentModal').show();
                                            $('.appointmentDetailsModal').hide()
                                            $('.createPatientModal').hide()
                                            loader.hide();
                                            $('.doctorName').val(doctorName).attr('id', doctorId);

                                            appType = []
                                            response.data.Table.forEach((elem) => {
                                                appType.push(elem.Slot_Name)

                                            })
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
                                                $('.mainStartTimeMins').append('<option value = ' + elem + '>' + elem + '</option>')
                                                $('.mainEndTimeMins').append('<option value = ' + elem + ' >' + elem + '</option>')
                                            })
                                            $('.mainStartTimeMins').val(startTimeMins);

                                            $('.mainEndTimeMins').val(endTimeMins);


                                            $('.mainStartTimeHour').attr("disabled", true);
                                            $('.mainStartTimeMins').attr("disabled", true);

                                            var eqltimeindx = 0;
                                            console.log("end timings. . ." + endTimeMins);
                                            for (var i = 0; i < allMins.length; i++) {
                                                if (endTimeMins == allMins[i]) {
                                                    eqltimeindx = i;
                                                }
                                            }
                                            console.log("equal index. . ." + eqltimeindx);
                                            for (var i = 0; i < eqltimeindx; i++) {
                                                console.log("i position. . ." + i);
                                                console.log($('.mainEndTimeMins option[value=' + allMins[eqltimeindx] + ']'));

                                                $('.mainEndTimeMins option[value=' + allMins[i] + ']').attr("disabled", "disabled");

                                            }

                                        })



                                })





                            //  $('.appDocName').html('')
                            //  $('.appTimings').html('')
                            //  $('#patient').val('')
                            //  $('.appPatientname').html('')
                            //  $('.appPatientphone').html('')
                            //  $('.appPatientemail').html('')
                            //  $('.appPatienttimings').html('')
                            //  $('.arriveStatus').show()
                            //  $('.arrived').css('background','#fff')
                            //  $('.unarrived').css('background','#fff')
                            //  $('.notesText').val('')

                            //  $('.addPayment').css('background','#fff')


                            //             var startTimeHour = dateInfo.dateStr.split('T')[1].split(':')[0];
                            //             var startTimeMins = dateInfo.dateStr.split('T')[1].split(':')[1].split(':')[0];
                            //             console.log(startTimeHour + ':' + startTimeMins)
                            //             var allMins = ['00', '15', '30', '45']
                            //             var doctorName = dateInfo.resource['_resource'].title;
                            //             var doctorId = dateInfo.resource['_resource'].id;
                            //             console.log(doctorName);
                            //             pageOverlay.show();
                            //             $('.appointmentModal').show()
                            //             loader.hide();
                            //             $('.doctorName').val(doctorName).attr('id',doctorId);

                            //             var appType = ['First Appointment', 'Standard Appointment', 'Third Appointment',

                            //               'clerk'
                            //             ];
                            //             $('.appointmentType').empty();
                            //             appType.forEach((elem) => {
                            //               var eachOption = '<option>' + elem + '</option>'
                            //               $('.appointmentType').append(eachOption)
                            //             })

                            //             $('.appointmentDate').val(dateInfo.dateStr.split('T')[0]);


                            //             $('.mainStartTimeHour').empty();
                            //             $('.mainStartTimeHour').append('<option>' + startTimeHour + '</option>')

                            //             $('.mainStartTimeMins').empty();
                            //             $('.mainEndTimeMins').empty()
                            //             var endTimeHour;
                            //             var endTimeMins;
                            //             if (startTimeMins !== '45') {
                            //               endTimeMins = (parseInt(startTimeMins) + 15).toString()
                            //               endTimeHour = startTimeHour
                            //             } else {
                            //               endTimeMins = '00';
                            //               endTimeHour = (parseInt(startTimeHour) + 1).toString();
                            //               if (endTimeHour.length === 1) {
                            //                 endTimeHour = '0' + endTimeHour
                            //               }

                            //             }
                            //             $('.mainEndTimeHour').empty()
                            //             $('.mainEndTimeHour').append('<option>' + endTimeHour + '</option>')
                            //             allMins.forEach((elem) => {
                            //               $('.mainStartTimeMins').append('<option>' + elem + '</option>')
                            //               $('.mainEndTimeMins').append('<option>' + elem + '</option>')
                            //             })
                            //             $('.mainStartTimeMins').val(startTimeMins);

                            //             $('.mainEndTimeMins').val(endTimeMins);
                        }





                    })
                    .fail(function(error) {
                        console.log(error)
                    })
            })



        //create patient
        $('.addPatient').on('click', function() {
            var docName = $('.doctorName').val()
            var doctorId = $('.doctorName').attr('id')
            var appTypeNew = $('.appointmentType').val()
            var descNotes = $('.textnotes').val()

            var appointmentDate = $('.appointmentDate').val()
            var startHour = $('.mainStartTimeHour').val()
            var startMins = $('.mainStartTimeMins').val()
            var endHour = $('.mainEndTimeHour').val()
            var endTimes = $('.mainEndTimeMins').val()

            $('.appointmentModal').hide()
            $('.createPatientModal').show()

            $('.appointmentTypePatient').empty()
            appType.forEach((elem) => {
                var eachtype = '<option>' + elem + '</option>'
                $('.appointmentTypePatient').append(eachtype)
                $('.appointmentTypePatient').val(appTypeNew)
            })
            var titles = ['Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Professor', 'Sir']
            $('.titleNew').empty()
            titles.forEach((elem) => {
                var eact = '<option>' + elem + '</option>'
                $('.titleNew').append(eact)
            })












        })

        $('.addPatientQuick').on('click', function() {
            var allNames = {};


            allNames.arabicNames = [$('.arname1').val(), $('.arname2').val(), $('.arname3').val()]
            allNames.englishNames = [$('.engname1').val(), $('.engname2').val(), $('.engname3').val()]


            function formDate(val) {
                console.log(val)
                if (val === undefined || val === '') {
                    return ''
                } else {
                    return val.split('-')[2] + '/' + val.split('-')[1] + '/' + val.split('-')[0]
                }

            }

            // var appointmentDate = $('.appointmentDate').val()
            // var startHour = $('.mainStartTimeHour').val()
            // var startMins = $('.mainStartTimeMins').val()
            // var endHour = $('.mainEndTimeHour').val()
            // var endTimes = $('.mainEndTimeMins').val()

            //أجا
            var mainDOB = formDate($('#arabicDob').val())
            if (formDate($('#engDob').val()) === '') {
                mainDOB = formDate($('#arabicDob').val())
            } else {
                mainDOB = formDate($('#arabicDob').val())
            }
            // var patientBody = {
            //       "sno":"", 
            //     "clinicid":"10008",
            //     "loginid":"10008",
            //     "patient_id":"",
            //     "Title":$('.titleNew').val(),
            //     "Ara_firstname":$('.arname1').val(),
            //     "Ara_Lastname":$('.arname2').val(),
            //     "Ara_fathername":$('.arname3').val(),
            //     "First_name":$('.engname1').val(),
            //     "Last_Name":$('.engname2').val(),
            //     "Middle_name":$('.engname3').val(),
            //     "DOB":mainDOB,
            //     "DOB_Arabic":formDate($('#arabicDob').val()),
            //     "Gender":appointmentDate+' ' +  startHour + ':' + startMins+':00',
            //     "Marital_status":appointmentDate+' ' +  endHour + ':' + endTimes+':00',
            //     "Identification_type":"none",
            //     "Identification_no":"0",
            //     "Identification_attachment":$('.doctorName').attr('id'),
            //     "Identification_Expiry":startHour + ':' + startMins,
            //     "Nationality":endHour + ':' + endTimes,
            //     "Occupation":'test',
            //     "Area":"0",
            //     "Block":$('.appointmentTypePatient').val(),
            //     "Building":"",
            //     "Street":"",
            //     "Floor":"",
            //     "City":"",
            //     "Country":"",
            //     "Email":$('.patientEmail').val(),
            //     "Mobileno":$('.patientmob').val(),
            //     "Home_phone":"",
            //     "Work_phoneno":"",
            //     "Emergency_contact":"",
            //     "Notes":"",
            //     "Reminder_type":"",
            //     "status":"",
            //     "Trans_date":"",
            //     "Last_update":"",
            //     "Condition":"Patient_Short_Reg",
            //     "Par1":"",
            //     "Par2":"",
            //     "Par3":$('.gender').val()
            //   }
            var patientBody = {
                "sno": "",
                "clinicid": "10008",
                "loginid": "10008",
                "patient_id": "",
                "Title": "Mr",
                "Ara_firstname": "ساس",
                "Ara_Lastname": "ساس",
                "Ara_fathername": "ساس",
                "First_name": "dssdd",
                "Last_Name": "sdsaas",
                "Middle_name": "dssasd",
                "DOB": "21/05/2019",
                "DOB_Arabic": "21/05/2019",
                "Gender": "2019-06-03 11:45:00",
                "Marital_status": "2019-06-03 12:00:00",
                "Identification_type": "none",
                "Identification_no": "0",
                "Identification_attachment": "13332206",
                "Identification_Expiry": "12:00",
                "Nationality": "11:45",
                "Occupation": "fdbg",
                "Area": "0",
                "Block": "First Appointment",
                "Building": "",
                "Street": "",
                "Floor": "",
                "City": "",
                "Country": "",
                "Email": "gfgfg@ffdfsas.hjhj",
                "Mobileno": "767676sa676",
                "Home_phone": "",
                "Work_phoneno": "",
                "Emergency_contact": "",
                "Notes": "",
                "Reminder_type": "",
                "status": "",
                "Trans_date": "",
                "Last_update": "",
                "Condition": "Patient_Short_Reg",
                "Par1": "",
                "Par2": "",
                "Par3": "Male"

            }







            console.log(patientBody)
            console.log(JSON.stringify(patientBody))



            getToken()
                .done(function(data) {
                    var accessToken = data.token_type + " " + data.access_token;
                    console.log(accessToken)
                    $.ajax({
                            url: service_url + '/Account/Patient_operations',
                            type: 'POST',
                            data: JSON.stringify(body),
                            beforeSend: function(xhr) {
                                setHeaders(xhr, accessToken)
                            }

                        })
                        .done(function(result) {
                            console.log(result)
                        })
                })


            // { 
            //   "sno":"", 
            //   "clinicid":"10008",
            //   "loginid":"10008",
            //   "patient_id":"",
            //   "Title":"mr",
            //   "Ara_firstname":"أجا",
            //   "Ara_Lastname":"أجا",
            //   "Ara_fathername":"أجا",
            //   "First_name":"Ajay",
            //   "Last_Name":"Ajay",
            //   "Middle_name":"Ajay",
            //   "DOB":"02/05/1994",
            //   "DOB_Arabic":"02/05/1994",
            //   "Gender":"2019-05-24 15:00:00",
            //   "Marital_status":"2019-05-24 15:15:00",
            //   "Identification_type":"none",
            //   "Identification_no":"0",
            //   "Identification_attachment":"37148072",
            //   "Identification_Expiry":"15:00",
            //   "Nationality":"15:15",
            //   "Occupation":"testnotes",
            //   "Area":"0",
            //   "Block":"First Appointment",
            //   "Building":"",
            //   "Street":"",
            //   "Floor":"",
            //   "City":"",
            //   "Country":"",
            //   "Email":"chmanasagou112d@gmail.com",
            //   "Mobileno":"07546542467",
            //   "Home_phone":"",
            //   "Work_phoneno":"",
            //   "Emergency_contact":"",
            //   "Notes":"",
            //   "Reminder_type":"",
            //   "status":"",
            //   "Trans_date":"",
            //   "Last_update":"",
            //   "Condition":"Patient_Short_Reg",
            //   "Par1":"",
            //   "Par2":"",
            //   "Par3":"male"


            //   }

            //   http://graylogic.net/OclinicoAPI/Api/Account/Patient_operations



        })
































    } else {
        //clicked on day in month view or week view
        return;
    }


}

$('.addPatient').on('click', function() {
    //$('.oldcls').hide() => $('.newcls).show()
})









// { 
//   "sno":"", 
//   "clinicid":"10008",
//   "loginid":"10008",
//   "patient_id":"",
//   "Title":"mr",
//   "Ara_firstname":"أجا",
//   "Ara_Lastname":"أجا",
//   "Ara_fathername":"أجا",
//   "First_name":"Ajay",
//   "Last_Name":"Ajay",
//   "Middle_name":"Ajay",
//   "DOB":"02/05/1994",
//   "DOB_Arabic":"02/05/1994",
//   "Gender":"2019-05-24 15:00:00",
//   "Marital_status":"2019-05-24 15:15:00",
//   "Identification_type":"none",
//   "Identification_no":"0",
//   "Identification_attachment":"37148072",doctor id
//   "Identification_Expiry":"15:00",
//   "Nationality":"15:15",
//   "Occupation":"testnotes",
//   "Area":"0",
//   "Block":"First Appointment",
//   "Building":"",
//   "Street":"",
//   "Floor":"",
//   "City":"",
//   "Country":"",
//   "Email":"chmanasagou112d@gmail.com",
//   "Mobileno":"07546542467",
//   "Home_phone":"",
//   "Work_phoneno":"",
//   "Emergency_contact":"",
//   "Notes":"",
//   "Reminder_type":"",
//   "status":"",
//   "Trans_date":"",
//   "Last_update":"",
//   "Condition":"Patient_Short_Reg",
//   "Par1":"",
//   "Par2":"",
//   "Par3":"male"


//   }












function gmod(n, m) {
    return ((n % m) + m) % m;
}

function kuwaiticalendar(adjust) {
    var today = new Date('2019-05-31');
    if (adjust) {
        adjustmili = 1000 * 60 * 60 * 24 * adjust;
        todaymili = today.getTime() + adjustmili;
        today = new Date(todaymili);
    }
    day = today.getDate();
    month = today.getMonth();
    year = today.getFullYear();
    m = month + 1;
    y = year;
    if (m < 3) {
        y -= 1;
        m += 12;
    }

    a = Math.floor(y / 100.);
    b = 2 - a + Math.floor(a / 4.);
    if (y < 1583) b = 0;
    if (y == 1582) {
        if (m > 10) b = -10;
        if (m == 10) {
            b = 0;
            if (day > 4) b = -10;
        }
    }

    jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;

    b = 0;
    if (jd > 2299160) {
        a = Math.floor((jd - 1867216.25) / 36524.25);
        b = 1 + a - Math.floor(a / 4.);
    }
    bb = jd + b + 1524;
    cc = Math.floor((bb - 122.1) / 365.25);
    dd = Math.floor(365.25 * cc);
    ee = Math.floor((bb - dd) / 30.6001);
    day = (bb - dd) - Math.floor(30.6001 * ee);
    month = ee - 1;
    if (ee > 13) {
        cc += 1;
        month = ee - 13;
    }
    year = cc - 4716;


    wd = gmod(jd + 1, 7) + 1;

    iyear = 10631. / 30.;
    epochastro = 1948084;
    epochcivil = 1948085;

    shift1 = 8.01 / 60.;

    z = jd - epochastro;
    cyc = Math.floor(z / 10631.);
    z = z - 10631 * cyc;
    j = Math.floor((z - shift1) / iyear);
    iy = 30 * cyc + j;
    z = z - Math.floor(j * iyear + shift1);
    im = Math.floor((z + 28.5001) / 29.5);
    if (im == 13) im = 12;
    id = z - Math.floor(29.5001 * im - 29);

    var myRes = new Array(8);

    myRes[0] = day; //calculated day (CE)
    myRes[1] = month - 1; //calculated month (CE)
    myRes[2] = year; //calculated year (CE)
    myRes[3] = jd - 1; //julian day number
    myRes[4] = wd - 1; //weekday number
    myRes[5] = id; //islamic date
    myRes[6] = im - 1; //islamic month
    myRes[7] = iy; //islamic year

    return myRes;
}

function writeIslamicDate(adjustment) {
    var wdNames = new Array("Ahad", "Ithnin", "Thulatha", "Arbaa", "Khams", "Jumuah", "Sabt");
    var iMonthNames = new Array("Muharram", "Safar", "Rabi'ul Awwal", "Rabi'ul Akhir",
        "Jumadal Ula", "Jumadal Akhira", "Rajab", "Sha'ban",
        "Ramadan", "Shawwal", "Dhul Qa'ada", "Dhul Hijja");
    var iDate = kuwaiticalendar(adjustment);
    var outputIslamicDate = wdNames[iDate[4]] + ", " +
        iDate[5] + " " + iMonthNames[iDate[6]] + " " + iDate[7] + " AH";
    return outputIslamicDate;
}
var hijridate = writeIslamicDate()
console.log(hijridate)







// { 
//   "sno":"", 
//   "clinicid":"10008",
//   "loginid":"10008",
//   "patient_id":"",
//   "Title":"mr",
//   "Ara_firstname":"أجا",
//   "Ara_Lastname":"أجا",
//   "Ara_fathername":"أجا",
//   "First_name":"Ajay",
//   "Last_Name":"Ajay",
//   "Middle_name":"Ajay",
//   "DOB":"02/05/1994",
//   "DOB_Arabic":"02/05/1994",
//   "Gender":"2019-05-24 15:00:00",
//   "Marital_status":"2019-05-24 15:15:00",
//   "Identification_type":"none",
//   "Identification_no":"0",
//   "Identification_attachment":"37148072",
//   "Identification_Expiry":"15:00",
//   "Nationality":"15:15",
//   "Occupation":"testnotes",
//   "Area":"0",
//   "Block":"First Appointment",
//   "Building":"",
//   "Street":"",
//   "Floor":"",
//   "City":"",
//   "Country":"",
//   "Email":"chmanasagou112d@gmail.com",
//   "Mobileno":"07546542467",
//   "Home_phone":"",
//   "Work_phoneno":"",
//   "Emergency_contact":"",
//   "Notes":"",
//   "Reminder_type":"",
//   "status":"",
//   "Trans_date":"",
//   "Last_update":"",
//   "Condition":"Patient_Short_Reg",
//   "Par1":"",
//   "Par2":"",
//   "Par3":"male"


//   }


//   {"sno":"","clinicid":"10008","loginid":"10008","patient_id":"","Title":"Mr","Ara_firstname":"ساس","Ara_Lastname":"ساس","Ara_fathername":"ساس","First_name":"dsdd","Last_Name":"sd","Middle_name":"dsd","DOB":"","DOB_Arabic":"21/05/2019","Gender":"2019-06-03 10:00:00","Marital_status":"2019-06-03 10:15:00","Identification_type":"none","Identification_no":"0","Identification_attachment":"13332206","Identification_Expiry":"10:00","Nationality":"10:15","Occupation":"","Area":"0","Block":"First Appointment","Building":"","Street":"","Floor":"","City":"","Country":"","Email":"gfgfg@ffdf.hjhj","Mobileno":"7676767676","Home_phone":"","Work_phoneno":"","Emergency_contact":"","Notes":"","Reminder_type":"","status":"","Trans_date":"","Last_update":"","Condition":"Patient_Short_Reg","Par1":"","Par2":"","Par3":"Male"}