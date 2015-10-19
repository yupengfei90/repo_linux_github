  function searchTab(n)
{
	if(n==1){
		document.getElementById('search_mod').value='resume';
		document.getElementById('stabli_2').className='';
		document.getElementById('stabli_1').className = 'f-input ipt_active';
		var searchKeywords2 = document.getElementById('searchKeywords2');
		if(searchKeywords2){
			searchKeywords2.style.display = 'none';
			document.getElementById('searchKeywords1').style.display = 'block';
		}
	}else{
		document.getElementById('search_mod').value='job';
		document.getElementById('stabli_1').className='';
		document.getElementById('stabli_2').className = 'f-input ipt_active';
		var searchKeywords2 = document.getElementById('searchKeywords2');
		if(searchKeywords2){
			document.getElementById('searchKeywords1').style.display = 'none';
			searchKeywords2.style.display = 'block';
		}
	}
}
function s_onblur(o) {
    if (this.value == '') {
        this.isAir = true;
        this.value = '请输入关键字进行搜索';
        //this.className = 'f-input ipt_active active';
    }
  }
function s_onfocus(o) {
    if (this.isAir == true || typeof this.isAir == "undefined") {
        this.value = '';
       // this.className = 'f-input ipt_active';
        this.isAir = false;
    }
}

function CheckLogin() {
    var txtName = document.getElementById("txtName");
    var txtPwd = document.getElementById("txtPwd");
    var txtchk = document.getElementById("txtCode");
    var flag = 0;
    var custtype = document.forms[0]["custtype"];
    for (var i = 0; i < custtype.length; i++) {
        if (custtype[i].checked) {
            flag = 1;
        }
    }
    if (txtName.value == "") {
        alert("请输入用户名!");
        txtName.focus();
        return false;
    }
    if (txtPwd.value == "") {
        alert("请输入密码!");
        txtPwd.focus();
        return false;
    }
    if (txtchk.value == "") {
        alert("请输入验证码!");
        txtchk.focus();
        return false;
    }
    if (flag == 0) {
        alert("请选择会员类型!");
        return false;
    }
}
