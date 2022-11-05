
    function ajaxRequest(url, request, data, headers) {
        $.ajax({
            url: url,
            type: request,
            data: data,
            headers: headers,
            success: function (result) {
                if (result.error === true) {
                    if (result.msg == 'validation') {
                        printErrorMsg(result.data);
                        return false;
                    }
                    swal('Oops..!', result.msg, "error");
                }
                if (result.error === false) {
                    swal('Updated!', result.msg, "success");
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000); 
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                swal('Oops..!', 'Some thing went wrong', "error");
            }
        });
    }
   function printErrorMsg(msg) {
        $(".print-error-msg").find("ul").html('');
        $(".print-error-msg").css('display', 'block');
        $.each(msg, function (key, value) {
            $(".print-error-msg").find("ul").append('<li>' + value + '</li>');
        });
    }
