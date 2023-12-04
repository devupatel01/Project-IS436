if (checkUserloginPageDashboardAndOthres()) {
    const localstorageUserData = localStorage.getItem("user");
    const userData = JSON.parse(localstorageUserData)

    populatePatientsTable();

    function populatePatientsTable() {
        let patientData;
        $.ajax({
            url: endpoint.patients,
            async: false,
            cache: false,
            type: 'GET', // For jQuery < 1.9
            success: function (data) {
                var response = data;
                if (response && response.status == 200) {
                    patientData = response.data;
                } else {
                    alert(response.message);
                }
            },
            error: function (err) {
                if (err?.responseJSON?.status == 401) {
                    alert(err?.responseJSON?.message);
                    window.location.href = pageWithUrl.login;
                    return;
                }
                alert(err?.responseJSON?.message ?? "Something went wrong.")
            }
        });

        $('#logList tbody').html("");
        if (patientData && patientData.length > 0) {
            patientData.forEach(element => {
                const html = `<tr id="patient-id-${element.id}" data-value="${element.id}">
            <td>${element.first_name}</td>
            <td>${element.last_name}</td>
            <td>${element.email}</td>
            <td>${element.mobile_number}</td>
            <td>${element.symptoms}</td>
            <td>${element.details}</td>
            <td><input type='button' class="btn btn-md-2 btn-primary viewPatientDetailsButton" data-toggle="modal" data-target="#showPatientDetails1"
                    value='View' data-value="${element.id}" /></td>
            <td><input type='button' class="btn btn-md-2 btn-success addAppointmentButton" data-toggle="modal"
                    data-target="#addAppointmentsModel" value='Appointment' data-value="${element.id}"/></td>
            </tr>`;
                $('#logList tbody').append(html);
            });
        } else {
            const html = `<tr>
            <td colspan='8'>No data available for patients</td>
            </tr>`;
            $('#logList tbody').append(html);
        }
    }


    const addPatientSubmitForm = document.querySelector("#addPatientSubmitForm");
    addPatientSubmitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        $("#patientFormInvalid").hide();

        var data = {};
        var formData = new FormData()
        $.each($("#addPatientSubmitForm").serializeArray(), function () {
            data[this.name] = this.value;
            formData.append(this.name, this.value)
        });

        formData.append("receptionist_id", userData.id)

        const { first_name, last_name, email } = data

        if (!checkInputText(first_name)) {
            $("#patientFormInvalid").html("First name can't be blank").show()
            return false;
        }

        if (!checkInputText(last_name)) {
            $("#patientFormInvalid").html("Last name can't be blank").show()
            return false;
        }

        if (checkInputText(email) && !checkInputEmail(email)) {
            $("#patientFormInvalid").html("Enter a valid email").show()
            return false;
        }

        $.ajax({
            url: endpoint.addPatient,
            async: false,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST', // For jQuery < 1.9
            success: function (data) {
                var response = data;
                if (response && response.status == 200) {
                    alert(response.message)
                    $('#addPatientModel').modal('hide');
                    $('#addPatientSubmitForm').trigger("reset");
                    populatePatientsTable();
                } else {
                    alert(response.message);
                }
            },
            error: function (err) {
                if (err?.responseJSON?.status == 401) {
                    alert(err?.responseJSON?.message);
                    window.location.href = pageWithUrl.login;
                    return;
                }
                $("#patientFormInvalid").html(err?.responseJSON?.message ?? "Something went wrong.").show()
            }
        });
    })

    $(document).on('click', ".addAppointmentButton", (e) => {
        e.preventDefault();
        const patient_id = e.target.attributes["data-value"].value;
        $("#aa_patient_id").val(patient_id);
    })

    $(document).on('click', ".viewPatientDetailsButton", (e) => {
        e.preventDefault();
        const patient_id = e.target.attributes["data-value"].value;
        let patient_details;
        $.ajax({
            url: endpoint.patientDetails + "?patient_id=" + patient_id,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            type: 'GET', // For jQuery < 1.9
            success: function (data) {
                var response = data;
                if (response && response.status == 200) {
                    patient_details = response.data
                    $('#showPatientDetails').modal('toggle');
                } else {
                    alert(response.message);
                }
            },
            error: function (err) {
                if (err?.responseJSON?.status == 401) {
                    alert(err?.responseJSON?.message);
                    window.location.href = pageWithUrl.login;
                    return;
                }
                alert(err?.responseJSON?.message ?? "Something went wrong.")
            }
        });

        $("#pd_div_name").html(patient_details.first_name + " " + patient_details.last_name);
        $("#pd_div_email").html(patient_details.email);
        $("#pd_div_mobile_number").html(patient_details.mobile_number);
        $("#pd_div_symptoms").html(patient_details.symptoms);
        $("#pd_div_details").html(patient_details.details);

        $("#pdAppointmentsList tbody").html("");

        if (patient_details.appointments || patient_details.appointments.length > 0) {
            patient_details.appointments.forEach((element) => {
                const html = `<tr>
            <td>${element.created_at}</td>
            <td>${element.appointment_date}</td>
            <td>${element.appointment_time}</td>
            <td>${element.details}</td>
        </tr>`;
                $("#pdAppointmentsList tbody").append(html);
            })
        } else {
            const html = `<tr>
                <td colspan="4">Appointments data not found.</td>
            </tr>`;
            $("#pdAppointmentsList tbody").append(html);
        }


    })

    const addAppintmentForm = document.querySelector("#addAppointmentsForm");
    addAppintmentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        $("#appointmentFormInvalid").hide();

        var data = {};
        var formData = new FormData()
        $.each($("#addAppointmentsForm").serializeArray(), function () {
            data[this.name] = this.value;
            formData.append(this.name, this.value)
        });
        formData.append("receptionist_id", userData.id)

        const { appointment_date, appointment_time, details } = data

        console.log(data)
        console.log(appointment_date, appointment_time, details)

        if (!checkInputText(appointment_date)) {
            alert("Appointment date can't be blank")
            return false;
        }

        if (!checkInputDate(appointment_date)) {
            alert("Please enter valid appointment date.")
            return false;
        }

        if (!checkInputText(appointment_time)) {
            alert("Appointment time can't be blank")
            return false;
        }

        if (!checkInputTime(appointment_time)) {
            alert("Please enter valid appointment time.")
            return false;
        }

        $.ajax({
            url: endpoint.addAppointment,
            async: false,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST', // For jQuery < 1.9
            success: function (data) {
                var response = data;
                if (response && response.status == 200) {
                    alert(response.message)
                    $('#addAppointmentsModel').modal('hide');
                    $('#addAppointmentsForm').trigger("reset");
                } else {
                    alert(response.message);
                }
            },
            error: function (err) {
                if (err?.responseJSON?.status == 401) {
                    alert(err?.responseJSON?.message);
                    window.location.href = pageWithUrl.login;
                    return;
                }
                $("#appointmentFormInvalid").html(err?.responseJSON?.message ?? "Something went wrong.").show()
            }
        });

    })
}

