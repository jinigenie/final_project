// 첫 세팅
$(document).ready(function () {

    $(".selectBox3").hide();

    var selectedValue = $("#selectType3").val();

    if(selectedValue !== '') {
        $(".selectBox3").show();
    }

    $(".lawtd").css("visibility", "hidden");
    $(".insurance").css("visibility", "hidden");
    $(".detective").css("visibility", "hidden");
});

<!--주소찾기-->
function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("addr1").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("addr2").focus();
        }
    }).open();
}


<!--은행정보 확인-->
$("#selectBank").change(function () {
    let selected = $("#selectBank option:selected").val();
    if (selected == 'kb') {
        $("#bankIcon").attr("src", "/img/app/kbIcon.png");
        $(".selBank").html('국민은행');
    } else if (selected == 'ibk') {
        $("#bankIcon").attr("src", "/img/app/ibkIcon.png");
        $(".selBank").html('기업은행');
    } else if (selected == 'nh') {
        $("#bankIcon").attr("src", "/img/app/nhIcon.png");
        $(".selBank").html('농협은행');
    } else if (selected == 'sh') {
        $("#bankIcon").attr("src", "/img/app/shIcon.png");
        $(".selBank").html('신한은행');
    } else if (selected == 'wr') {
        $("#bankIcon").attr("src", "/img/app/wrIcon.png");
        $(".selBank").html('우리은행');
    } else if (selected == 'hn') {
        $("#bankIcon").attr("src", "/img/app/hnIcon.png");
        $(".selBank").html('하나은행');
    } else if (selected == 'sc') {
        $("#bankIcon").attr("src", "/img/app/scIcon.png");
        $(".selBank").html('SC제일은행');
    } else {
        $("#bankIcon").attr("src", "#");
        $(".selBank").html('');
    }

});


<!--메일주소 선택입력-->
$("#mailAddr").change(function () {
    let selmail = $("#mailAddr option:selected").html();
    $("#cvl_mail2").attr("value", selmail);

});

$(".addCourt").click(function () {
    console.log("추가");
})


// 모달창: 저장
const modal = document.querySelector('.modal');
let x = 0;

$(".prev_btn").click(function () {
    modal.style.display = 'block';
    x = 1;
})
$(".next_btn").click(function () {
    modal.style.display = 'block';
    x = 2;
})

$(".save").click(function () {
    if (x == 1) {
        $(location).attr("href", "../app/confirm");
    } else {
        $(location).attr("href", "../app/career");
    }
    x = 0;
})

$(".cancel").click(function () {
    if (x == 1) {
        $(location).attr("href", "../app/confirm");
    } else {
        $(location).attr("href", "../app/career");
    }
    x = 0;
})

$(".dmui_dialog_btn").click(function () {
    modal.style.display = 'none';
})


// 법원선택
$('#selectRegion').change(function () {

    $("#from_bub_cd option").hide();

    let selRegion = $("#selectRegion option:selected").val();
    if (selRegion === '전체') {
        $("#from_bub_cd option").show();
    } else {
        $("#from_bub_cd option").filter(function () {
            return selRegion === $(this).attr("class");
        }).show();
    }
})

function removeCourt() {
    return !$('#wish_bub_cd option:selected').remove().appendTo('#from_bub_cd');
};

function addCourt() {
    // !$('#from_bub_cd option:selected').remove().appendTo('#wish_bub_cd');

    var left = $("#from_bub_cd option:selected").size();
    var right = $("#wish_bub_cd option").size();

    var cnt = left + right;
    //alert(cnt);
    if (cnt > 2) {
        alert('희망법원은 2개까지 신청가능합니다.');
        return;
    } else {
        return !$('#from_bub_cd option:selected').remove().appendTo('#wish_bub_cd');
    }
}

// 재판조력자 선택
$('#selectType1').change(function () {

    $(".selectBox3").hide();
    $("#selectType2 option").hide();

    let selType2 = $("#selectType1 option:selected").val();

    $("#selectType2 option").filter(function () {
        return selType2 === $(this).attr("class") && $(this).prev().val() !== $(this).val();
    }).show();
})
$('#selectType2').change(function () {

    $(".selectBox3").hide();
    $("#selectType3 option").hide();

    let selType3 = $("#selectType2 option:selected").val();

    if (selType3 === '공사비등' || selType3 === '조정위원') {
        $(".selectBox3").show();
        $("#selectType3 option").filter(function () {
            return selType3 === $(this).attr("class");
        }).show();
    }
})


// 사건내역 상세내용 숨기기/보이기
$('input[name="check1"]').change(function () {
    var checked1 = $(this).prop('checked');
    if (checked1) {
        $(".lawtd").css("visibility", "visible");
    } else {
        $(".lawtd").css("visibility", "hidden");
    }
});

$('input[name="check2"]').change(function () {
    var checked2 = $(this).prop('checked');
    if (checked2) {
        $(".insurance").css("visibility", "visible");
    } else {
        $(".insurance").css("visibility", "hidden");
    }
});

$('input[name="check3"]').change(function () {
    var checked3 = $(this).prop('checked');
    if (checked3) {
        $(".detective").css("visibility", "visible");
    } else {
        $(".detective").css("visibility", "hidden");
    }
});
