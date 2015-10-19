function GetSubCate(type)
{	

	var pass;
	if (type=="p")
	{ 
	    pass= document.getElementById("txtPPwd").value;
	    user = document.getElementById("txtPName").value;
	    if (user=="")
	    {
	        alert("请输入用户名！")
	        return false;
	    }
	    if (pass=="")
	    {
	        alert("请输入密码！")
	        return false;
	    }
	}
	else if(type=="c")
	{
	    pass= document.getElementById("txtCPwd").value;
	    user = document.getElementById("txtCName").value;
	    if (user=="")
	    {
	        alert("请输入用户名！")
	        return false;
	    }
	    if (pass=="")
	    {
	        alert("请输入密码！")
	        return false;
	    }
	}
	else
	{
	    pass= document.getElementById("txtPassWord").value;
	}	
	SendURL("mistake.asp?str="+pass);
	
}


var objHttp;

function CreateHttp()
{
	if ( !objHttp )
	{
		objHttp = new ActiveXObject( "Microsoft.XmlHttp" );
	}
	return objHttp;
}

function SendURL(strURL)
{
	if ( !objHttp )
	{
		CreateHttp();
	}
	objHttp.open( "Get",strURL,true );

	objHttp.onreadystatechange = function()
	{	
		if ( objHttp.readyState==4 && objHttp.status==200 )
		{			
			ShowResult( objHttp.responseText );
		}
	}
	objHttp.send();
}

function ShowResult(strHtml)
{
	document.getElementById("hdfPass").value = strHtml;	
	return true;
}