// console.log = function() {

// }
// var token_service_url = "http://graylogic.net/OclinicoAPI1/token";
// var service_url = "http://graylogic.net/OclinicoAPI1/Api";

var token_service_url = "https://api.oclinico.com/oclinicoapi/token";
var service_url = "https://api.oclinico.com/oclinicoapi/api/";

var calendarEl = document.getElementById('calendar');
var locale, defaultView, slotDuration, calendarPlugins, pageOverlay,
    loader, events, calendar, header, resources, doctorsAvailabilty;
var colors = []
var tokenuname = window.localStorage.getItem("username");
var psw = window.localStorage.getItem("pval")
var dpsw = decryptPassword(psw);
var appointment_id, next_date, new_access_token, check_available_timings, check_timings_status;


// var token_service_url = "/OclinicoAPI/token";
// var service_url = "http://23.92.209.46/OclinicoAPI/Api";


var appType = []
var currentlangselected = ''

function languageChange(lang) {
    currentlangselected = lang
    console.log(lang)



    setTimeout(function() {
        if (lang === 'sa') {
            calendar.setOption('locale', 'ar-kw')
            $('.fc-license-message').hide();
            // $('.fc-resource-cell').each(function(i) {
            //     $(this).css({
            //         'background': colors[i],
            //         'color': '#fcf8e3',
            //         'padding': '10px 0'


            //     })
            // })
            $('#calendar').css('padding-left', '0px!important')
            $('#calendar').addClass('removePadding')
                // console.log($('#calendar').css('padding-left'))
            $('.fc-next-button').empty()
            $('.fc-next-button').html('التالي')
            $('.fc-next-button').empty()
            $('.fc-next-button').html('التالي')
                //fc-prev-button
            $('.fc-prev-button').empty()
            $('.fc-prev-button').html('السابق')
            $('.fc-license-message').hide();

            console.log($(".fc-center").find("h2").text());
            var someString = $(".fc-center").find("h2").text();
            var anotherString = someString.replace(/â€“/g, '-');
            $(".fc-center").find("h2").text(anotherString);

            $(".fc-more-cell").each(function(i) {
                // console.log($(".fc-more-cell").eq(i).find(".fc-more").text());
                var someString1 = $(".fc-more-cell").eq(i).find(".fc-more").text()
                var anotherString1 = someString1.replace(/Ø£Ø®Ø±Ù‰/g, 'المزيد‎');
                $(".fc-more-cell").eq(i).find(".fc-more").text(anotherString1);

            })

        } else {
            calendar.setOption('locale', 'en')
            // $('.fc-resource-cell').each(function(i) {
            //     $(this).css({
            //         'background': colors[i],
            //         'color': '#fcf8e3',
            //         'padding': '10px 0'

            //     })
            // })
            $('.fc-license-message').hide();
            $('#calendar').css('padding-left', '30px!important')
            $('#calendar').removeClass('removePadding')

            //<span class="fc-icon fc-icon-chevron-right"></span>
            $('.fc-next-button').html();
            $('.fc-prev-button').html();

            $('.fc-next-button').empty()
                // $('.fc-next-button').html('<span class="fc-icon fc-icon-chevron-left"></span>')
            $('.fc-next-button').html('<span class="fc-icon fc-icon-chevron-right"></span>')
                //fc-prev-button
            $('.fc-prev-button').empty()
                // $('.fc-prev-button').html('<span class="fc-icon fc-icon-chevron-right"></span>')
            $('.fc-prev-button').html('<span class="fc-icon fc-icon-chevron-left"></span>')

            console.log($(".fc-center").find("h2").text());
            var someString = $(".fc-center").find("h2").text();
            var anotherString = someString.replace(/â€“/g, '-');
            $(".fc-center").find("h2").text(anotherString);

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

        // getToken()
        //     .done(function(data) {
        // console.log(data)
        // var accessToken = data.token_type + " " + data.access_token;
        //getDoctors(accessToken,new Date())
        loadDoctorsName(new_access_token, dateText[0], '', '', '')
            // })
            // .fail(function(error) {
            //     console.log(error)
            // })
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




var currentMonthValue = new Date().getMonth();
nextMonthValue = currentMonthValue + 1;

// if (nextMonthFlatPick) {
//     nextMonthFlatPick.changeMonth(1)
// }

$('.flatpickr-prev-month:eq(1)').hide()
$('.flatpickr-next-month:eq(1)').hide();
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
    $('.patientDetails').hide()
})


setInterval(() => {
    getToken();
    //alert("mytest");
}, 1500000);



function getToken() {
    return $.ajax({
        url: token_service_url,
        type: 'POST',
        data: `username=${tokenuname}&password=${dpsw}&grant_type=${"password"}`
    });
}


getToken()
    .done(function(data) {
        console.log(data)
            // var accessToken = data.token_type + " " + data.access_token;
        new_access_token = data.token_type + " " + data.access_token;
        //   alert(new_access_token)
        //getDoctors(accessToken,new Date())
        loadDoctorsName(new_access_token, new Date(), '', '')
    })
    .fail(function(error) {
        console.log(error)
    })

$('#calendar').on('click', '.fc-resourceTimeGridDay-button', function() {
    $('.fc-resource-cell').each(function(i) {
        $(this).css({
            'background': colors[i],
           // 'color': '#fcf8e3',
            'padding': '10px 0'

        })
    })
})





function getDoctorsName(token) {
    $.ajax({
        url: service_url + '/Account/DocTreatment_Transactions',
        type: 'POST',


    })
}





function decryptPassword(password) {

    return password.slice(0, -6).split('').reverse().join('')

}

function initializing() {
    console.log('initprocess started');
    calendarEl
    locale = 'en';
    defaultView = 'dayGridMonth';
    slotDuration = '00:15:00';
   //calendarPlugins = ['resourceTimeGrid', 'resourceDayGrid', 'interaction' ];
    // calendarPlugins = [ 'dayGridMonth','timeGridWeek','timeGridDay '];
    calendarPlugins =  [ 'dayGrid', 'timeGrid' ]
    
    pageOverlay = $('.pageOverlay');
    loader = $('.loader');

    console.log(loader)

    events = []

    calendar;
    header;
    resources;
    doctorsAvailabilty = []

    console.log($(".fc-center").text());

    console.log('init process ended')




}

initializing()



var checkedDoctors = [];
$('.doctorsNameArea').on('change', '.eachDocCheck', function() {
    console.log($(this).attr('id'))
    // if ($(this).is(':checked')) {
    //     checkedDoctors.push($(this).attr('id'))
    // } else {
    //     checkedDoctors = checkedDoctors.filter((elem) => {
    //         return elem !== $(this).attr('id')
    //     })
    // }
    // console.log(checkedDoctors)

    // getToken()
    //     .done(function(data) {
    //         console.log(data)
    //  var accessToken = data.token_type + " " + data.access_token;
    //getDoctors(accessToken,new Date())
    // console.log( checkedDoctors.join(';'))
    // console.log(calendar.getDate());
    // console.log(accessToken)
    loadDoctorsName(new_access_token, calendar.getDate(), '', checkedDoctors.join(';'))
        // })
        // .fail(function(error) {
        //     console.log(error)
        // })
})


// $('#calendar').fullCalendar({
//     header: {
//         left: 'prev,next today',
//         center: 'title',
//         right: 'month,agendaWeek,agendaDay'
//     }
// }).on('click', '.fc-agendaWeek-button', function() {
//     alert('Week button clicked');
// });



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

    // alert("load doctors. .");
    //alert(token);

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
            "Practitioner_Id": '',
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

                        // var eachDocInfo = '<div><input id=' + elem.Practitioner_Id + ' type="checkbox" class="eachDocCheck"> <label for=' + elem.Practitioner_Id + '>' + elem.Name + '<span><i class="ti-check"></i></span></label> </div>'
                        // $('.doctorsNameArea').append(eachDocInfo)

                        // $('.doctorsNameArea').slideUp();

                    }


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
                    // doctorsAvailabilty.push({
                    //     S1_start: elem.S1_start,
                    //     S1_end: elem.S1_end,
                    //     S2_start: elem.S2_start,
                    //     s2_end: elem.s2_end
                    // })
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


        // getToken()
        //     .done(function(data) {
        //         console.log(data)
        //         var accessToken = data.token_type + " " + data.access_token;

        var serviceUrl = service_url + '/Account/DocTreatment_Transactions';


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
                    setHeaders(xhr, new_access_token)
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

                // resources.forEach((el) => {
                //     calendar.addResource(el)
                // })

                console.log(colors);
                // $('.fc-resource-cell').each(function(i) {
                //     $(this).css({
                //         'background': colors[i],
                //         'color': '#fcf8e3',
                //         'padding': '10px 0'

                //     })
                // })
                $('.loader').hide()


            })



        // })

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




$(' #calendar').on('click', '.fc-prev-button', function() {
    console.log('clicked of next button on calendar');

    var someString = $(".fc-center").find("h2").text();
    var anotherString = someString.replace(/â€“/g, '-');
    $(".fc-center").find("h2").text(anotherString);

    next_date = calendar.getDate();

    console.log(calendar.getDate())
        // getToken()
        //     .done(function(data) {
        //         console.log(data)
        //         var accessToken = data.token_type + " " + data.access_token;
    console.log(calendar)

    if(calendar){
       // calendar.destroy();
    }

    setTimeout(function() {
        $('.loader').show();


        // getToken()
        //     .done(function(data) {
        //         console.log(data)
        //         var accessToken = data.token_type + " " + data.access_token;

        var serviceUrl = service_url + '/Account/DocTreatment_Transactions';


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
                    setHeaders(xhr, new_access_token)
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
                    // doctorsAvailabilty.push({
                    //     S1_start: elem.S1_start,
                    //     S1_end: elem.S1_end,
                    //     S2_start: elem.S2_start,
                    //     s2_end: elem.s2_end
                    // })
                })

                // resources.forEach((el) => {
                //     calendar.addResource(el)
                // })
                // $('.fc-resource-cell').each(function(i) {
                //     $(this).css({
                //         'background': colors[i],
                //         'color': '#fcf8e3',
                //         'padding': '10px 0'

                //     })
                // })
                $('.loader').hide()
                getClinicTimings(calendar.getDate(), '')

            })



        // })



    }, 100)

    // calendar.refetchResources
    //  calendar.destroy()
    //   loadDoctorsName(accessToken,calendar.getDate(),'rerender')


    // })
    // .fail(function(error) {
    //     console.log(error)
    // })

})


///// Calendar next button clicked ////////////////////


$(' #calendar').on('click', '.fc-next-button', function() {
    console.log('clicked of next button on calendar');
    var someString = $(".fc-center").find("h2").text();
    var anotherString = someString.replace(/â€“/g, '-');
    $(".fc-center").find("h2").text(anotherString);

    // if(calendar){
    //     calendar.destroy();
    // }

    console.log(calendar.getDate())
    next_date = calendar.getDate();
    if(calendar){
       // calendar.destroy();
    }
    // getToken()
    //     .done(function(data) {
    //         console.log(data)
    //         var accessToken = data.token_type + " " + data.access_token;
    console.log(calendar);
    setTimeout(function() {
        $('.loader').show();

        // getToken()
        //     .done(function(data) {
        //         console.log(data)
        //         var accessToken = data.token_type + " " + data.access_token;

        var serviceUrl = service_url + '/Account/DocTreatment_Transactions';


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
                    setHeaders(xhr, new_access_token)
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
                // result.data.Table.forEach((elem, index) => {
                //     resources.push({
                //         id: elem.Practitioner_Id,
                //         title: elem.Name,


                //     })
                //     console.log(elem.Color);
                //     colors.push(elem.Color)
                //     // doctorsAvailabilty.push({
                //     //     S1_start: elem.S1_start,
                //     //     S1_end: elem.S1_end,
                //     //     S2_start: elem.S2_start,
                //     //     s2_end: elem.s2_end
                //     // })
                // })

                // resources.forEach((el) => {
                //     calendar.addResource(el)
                // })

               // console.log(colors);
                // $('.fc-resource-cell').each(function(i) {
                //     $(this).css({
                //         'background': colors[i],
                //         'color': '#fcf8e3',
                //         'padding': '10px 0'

                //     })
                // })



               // console.log(calendar.getDate())
                getClinicTimings(calendar.getDate(), '')
                    // $('.loader').hide()


            })



        //  })

    }, 100)



})


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
    allAppointmentsData.data.Table.forEach(function(elem) {


        //#c34e61
        var borderColorStatus = '';
        var fccolor = "white";
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
            //borderColor: borderColorStatus,
            color:fccolor,
             backgroundColor : elem.Color,
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
 
    console.log(events);
    console.log(resources);

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
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    }

    if (currentlangselected === 'sa') {
        locale = 'ar-kw'
    } else {
        locale = ''
    }
    var calendarOptions = {
        selectable: true,
        header: header,
        editable: false,
        plugins: calendarPlugins,
        locale: locale,
        allDaySlot: false,
        defaultView: defaultView,
        slotDuration: slotDuration,
        eventLimit: false,

        dateClick: function(dateInfo) {
            // console.log(dateInfo);
            //checkAppointmentAvailaibility(dateInfo)
        },
        eventClick: function(eventInfo) {
            // console.log(eventInfo);
            //showAppointmentData(eventInfo)
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
       // resources: resources,       
        events: events,
        eventRender: function(event, element) { 
            console.log(event);
            console.log(element);
         //   event.find('.fc-title').append("<br/>" + event.doctorname); 
        } 
    }
    console.log(events)
    if (calendar) {
        calendar.destroy()
    }
    $.each(events, function(index, value) {
        // console.log(value.PatientName);
        // console.log( value.arrivestatus );
        value.title = '<div class="deets" style="font-size:15px;"><span class="frmtotime" style="font-weight:bold;"><b>' + value.fromhr + ' - ' + value.tohr + '</b></span><br/>';
        value.title += '<div class="deets" style="font-size:15px;"><span class="time">Status : ' + value.arrivestatus + '</span><br/>';       
        value.title += '<div class="deets" style="font-size:15px;"><span>Patient : ' + value.PatientName + '</span></div></div>';      
        value.title += '<div class="deets" style="font-size:15px;"><span>Doctor : ' + value.doctorname + '</span></div></div>';
     //   value.title += '<div class="learn-more">LEARN MORE <span class="arrow"></span></span>';
      });
    
console.log(defaultView);
console.log(slotDuration);
    calendar = new FullCalendar.Calendar(calendarEl , {
        selectable: true,
        defaultView: defaultView,
        header: header,
        editable: false,
        allDayDefault: false,
        locale: locale,
        allDaySlot: false,       
        slotDuration: slotDuration,       
        eventLimit: false,
        // minTime: clinicTimings[0],
        // maxTime: clinicTimings[1],  
        events: events,
        //resources: resources,
        //slotMinutes: 15,
        displayEventTime : false,
        
        eventRender: function(event, element) { 
            console.log(event);
            console.log(element);
            const title = $(event.el).find('.fc-title');
            title.html(title.text());
           // title.append("<br/>" + event.doctorname); 
          //  element.find('.fc-title').append("<br/>" + event.doctorname); 
        } ,
        plugins: calendarPlugins,

    });
    calendar.render();
   // calendar.changeView('timeGridDay', next_date);
    // var fullcalenWidth = $('.fc-view-container .fc-view > table')
    // console.log(fullcalenWidth)
    // console.log(resources)
    // if (resources.length === 0) {
    //  //   alert('There are no appointments with this doctor');
        
    // }
    // console.log(events)
    // var calendate = calendar.getDate();
    // var mm = calendate.getMonth()
    // console.log(mm)
    // if (mm.toString().length === 1) {
    //     mm = '0' + (mm + 1).toString();
    // } else {
    //     mm = mm.toString()
    // }
    // var dd = calendate.getDate()

    // if (dd.toString().length === 1) {
    //     dd = '0' + (dd).toString();
    // } else {
    //     dd = dd.toString()
    // }
    // var daysResources = [];
    // var dayFormat = calendate.getFullYear() + '-' + mm + '-' + dd
    // events.forEach((elem) => {
    //    // console.log(elem);
    //     if (elem.start != undefined || elem.start != null) {
    //         if (elem.start.split('T')[0] === dayFormat) {
    //             console.log(elem.start.split('T')[0])
    //             daysResources.push(elem)
    //         }

    //     }

    // })
    // console.log(daysResources)
    // console.log(calendate.getFullYear() + '-' + mm + '-' + dd);
    // console.log($('.eachDocCheck:checked').length);
    // console.log(resources.length);

    // if ($('.eachDocCheck:checked').length > 0) {
    //     // onetothree fourtoseven eighttoten morethanten
    //     // if (daysResources.length <= 3) {
    //     //     console.log('first less than 5')
    //     //         //fullcalenWidth.style.width = '1000px!important'

    //     //     // console.log(docId)
    //     //     $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('onetothree')
    //     //     console.log($('.fc-view-container').find('.fc-resourceTimeGridDay-view > table').css('width'))

    //     // } else if (daysResources.length > 3 && daysResources.length <= 7) {
    //     //     $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('fourtoseven')
    //     // } else if (daysResources.length > 7 && daysResources.length <= 10) {
    //     //     $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('eighttoten')
    //     // } else {
    //     //     $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('morethanten')
    //     // }

    // } else {
    //     if (resources.length <= 3) {
    //         console.log('seccond less than 5')
    //             //fullcalenWidth.style.width = '1000px!important'

    //         // console.log(docId)
    //         $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('onetothree')
    //         console.log($('.fc-view-container').find('.fc-resourceTimeGridDay-view > table').css('width'))

    //     } else if (resources.length > 3 && resources.length <= 7) {
    //         $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('fourtoseven')
    //     } else if (resources.length > 7 && resources.length <= 10) {
    //         $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('eighttoten')
    //     } else {
    //         $('.fc-view-container').find('.fc-resourceTimeGridDay-view >table').addClass('morethanten')
    //     }
    // }



    //class="fc-view fc-resourceTimeGridDay-view fc-timeGrid-view"

    if (mainDate !== '') {
        calendar.gotoDate(mainDate)
    }

    if (calendar) {

        //console.log(resources);

        // resources.forEach((el) => {
        //     if (el.start === null) {
        //         el.start = ''
        //     }

        //     if (el.end === null) {
        //         el.end = ''
        //     }
        //     console.log(el)
        //         // if(el.end !== null && el.end !== '') {

        //     //        events.push({
        //     //         resourceId : el.id,
        //     //             title:  'Doctor not avaiaible',
        //     //         backgroundColor : 'green',
        //     //         start :formatDate(calendar.getDate())+'T'+ el.start.replace(' ',''),
        //     //         end :formatDate(calendar.getDate())+'T'+el.end.replace(' ',''),
        //     //         borderColor : '#fff',
        //     //         fontSize : '13px'
        //     //     })
        //     // }
        // })


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


    // $('.fc-resource-cell').each(function(i) {
    //     $(this).css({
    //         'background': colors[i],
    //         'color': '#fcf8e3',
    //         'padding': '10px 0'

    //     })
    // })


    //console.log(doctorsAvailabilty)
    
    $('.fc-license-message').hide();
    // console.log($('.fc-time-grid td.fc-today'))
    $('.fc-time-grid td.fc-today').css('background', '#fff!important');

    loader.hide();
    $(".fc-title").css("color" , '#FFFFFF')
    $(".fc-time").css("color" , '#FFFFFF');
   // $(".fc-content").css("text-align" , 'right');
    $(".fc-content").css("margin-bottom" , '5px');
    $(".fc-content").css("padding" , '5px');
    //console.log( $(".fc-title"));
    console.log('loaded appointments completeley')
}





//////////////////////Showing Appointment Id in Model Popup //////////////////

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
   
    var body = {
        "text": "ClinikTimings",
        "id": localStorage.getItem('userId'),
        "param1": "",
        "param2": today
    }
    console.log(JSON.stringify(body))

    //set clinic timings
    // getToken()
    //     .done(function(data) {
    //         console.log(data)
    //  var accessToken = data.token_type + " " + data.access_token;
    $.ajax({
            url: serviceUrl,
            type: 'POST',
            data: JSON.stringify(body),
            beforeSend: function(xhr) {
                setHeaders(xhr, new_access_token)
            }

        })
        .done(function(result) {
            console.log(result)

            //  var startTime, endTime

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

            if (result.data.Table[0].Result == "False") {
              //  alert("data false");
                loader.hide();
                // alert(result.data.Table[0].Output);
                // $(".fc-view-container").css({"visibility": "visible"});
                // $(".showcal").find("#hval").css({"visibility": "visible"});
                // $(".showcal").find("#hval").html(result.data.Table[0].Output);
                // $(".fc-view-container").html(result.data.Table[0].Output);
                console.log(calendar);
                //    $("#calendar").html(result.data.Table[0].Output);
                //    $("#calendar").css({'color' : 'red'  });
                //    $("#calendar").css({ 'padding' :'20%' });

                //    calendar = new FullCalendar.Calendar(calendarEl, {
                //         plugins: ['resourceTimeGrid', 'resourceDayGrid', 'interaction']
                //       });
                if (calendar) {
                    calendar.destroy()
                }
                header = {

                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,'
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
                    defaultView: 'dayGridMonth',
                    slotDuration: slotDuration,
                    eventLimit: false,


                }
                console.log(events)
                console.log(calendar);

                calendar = new FullCalendar.Calendar(calendarEl, calendarOptions);
                console.log(calendar);
                calendar.render();
                console.log("nextdate. .. " + next_date);
                if (next_date != undefined) {
                    calendar.gotoDate(next_date);
                }
                // calendar.gotoDate(next_date);
                // console.log(calendar);
                //calendar.destroy();
                check_available_timings = true;
                //  $(".showcal").find("#hval").html(result.data.Table[0].Output);
                $(".fc-resourceTimeGridDay-view").html(result.data.Table[0].Output).css({ 'color': 'red', 'padding': '20%' });
                $('.fc-license-message').hide();
                check_timings_status = result.data.Table[0].Output;
                //   $(".fc-view-container").css({'color' : 'red'  });
                //   $(".fc-view-container").css({ 'padding' :'20%' });

                //  renderAppointments(timings, renderState, '', formatDate(new Date()))

            } else {
              //  alert("data true");
                //  calendar.destroy();
                check_available_timings = false;
                check_timings_status = "";
                //   $(".fc-view-container").css({"visibility": "visible"});
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
        // })
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
    console.log(JSON.stringify(body));
    console.log(appService);
     
    $.ajax({
            url: appService,
            type: 'POST',
            data: JSON.stringify(body),
            beforeSend: function(xhr) {
                setHeaders(xhr, new_access_token)
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
    
}




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



///// On Week Butto n Clicked///
//[ 'dayGridMonth','timeGridWeek','timeGridDay '];

$("#calendar").on('click', '.fc-timeGridWeek-button', function() {
    
    defaultView = "timeGridWeek";
   //defaultView = "dayGridWeek";
   // alert(defaultView);
   // alert('Week button clicked');
    // console.log($(".fc-center").find("h2").text());
    var someString = $(".fc-center").find("h2").text();
    var anotherString = someString.replace(/â€“/g, '-');
    $(".fc-center").find("h2").text(anotherString);
});

///// On Month Button Clicked //////

$("#calendar").on('click', '.fc-dayGridMonth-button', function() {

    defaultView = "dayGridMonth";
   // alert(defaultView);
   // alert('Week button clicked');
    // console.log($(".fc-more-cell").find(".fc-more").text());
    $(".fc-more-cell").each(function(i) {
        // console.log($(".fc-more-cell").eq(i).find(".fc-more").text());
        var someString = $(".fc-more-cell").eq(i).find(".fc-more").text()
        var anotherString = someString.replace(/Ø£Ø®Ø±Ù‰/g, 'المزيد‎');
        $(".fc-more-cell").eq(i).find(".fc-more").text(anotherString);

    })

});
$("#calendar").on('click', '.fc-timeGridDay-button', function() {
// $("#calendar").on('click', '.fc-resourceTimeGridDay-button', function() {
    defaultView = "timeGridDay";
   // defaultView = "dayGridDay";
   // alert("on day clicked. .");
   // alert(defaultView);
    if (check_available_timings == true) {
        $(".fc-resourceTimeGridDay-view").html(check_timings_status).css({ 'color': 'red', 'padding': '20%' });
        $('.fc-license-message').hide();
    } else {
        $('.fc-license-message').hide();
    }
});