// JavaScript Document
function changeCss(id,len,obj,class1,class2){

		for(i=1;i<=len;i++)
		{
			
			if(i==id){
				
				 document.getElementById(obj+i).className=class1
				}else{
				 document.getElementById(obj+i).className=class2
					}
			}
			
	}
	
	
	