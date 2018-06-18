var roleManage = new roleManage();
var selectedRole = new selectedRole();
var array = [];
var roleName = [];
var roleAccessArray = [];
var evArray = [];
var customRole = {};
// get data from roleCollection
function getRoleListFromRoleData(){
	var roleData = null;
	$.ajax({
		type : "POST",
		url : contextPath+"/role/list",
		dataType : "json",async : false,
		headers : {
			"token_id" : token_id
		},
		contentType : "application/json; charset=utf-8",
		success : function(response) {
			if (response.type == "success") {
				roleData = response.data;
				roleManage.setRoleData(roleData);
			}
		}
	});
}

// get role from roleTemplate collection
function getRoleListFromRoleTemplate(){
	$.ajax({
		type : "POST",
		url : contextPath+"/roleTemplate/list",
		dataType : "json",async : false,
		headers : {
			"token_id" : token_id
		},
		contentType : "application/json; charset=utf-8",
		success : function(response) {
			if (response.type == "success") {
				
				 roleTemplateData = response.data;
				 roleManage.setRoleTemplateData(roleTemplateData);
				var roleTemplateAccess = getRoleTemplateData(roleManage.getRoleTemplateData());
				roleTemplate(roleManage.getRoleTemplateData());
				getSelectedRoleAccess(roleManage.getRoleTemplateData());
			}
		}
	});

}
// dropdown change and save access of selected role
function optionChange(){
	$('#selectRole').change(function(){
		var data = getRoleDataList(roleManage.getRoleData());
		var selected = $('#selectRole option:selected').val();
		getRoleListFromRoleData();
		getRoleListFromRoleTemplate();
		roleManage.setAccess(data[selected]);
		changeValueOfCheckBoxOnOptionChange();
		getSelectedRoleAccess(roleManage.getRoleTemplateData());
	});
}

function changeValueOfCheckBoxOnOptionChange(){
	var access = roleManage.getAccess();
	
	for(var key in evArray){
		var obj = evArray[key].toString();
		if(access != null && typeof access[obj] != undefined && access[obj] ){
			$('#'+evArray[key]).prop('checked','checked');
		}
		else{
			$('#'+evArray[key]).removeAttr('checked');
		}
	}
	
}



// Map of name and access of roleData
function getRoleDataList(roleList){
	var roleDataMap = {};
	if(roleList != "undefined" && roleList != null  && roleList.length>0){
		for(var key in roleList){
			roleDataMap[roleList[key].name] = roleList[key].access;		
		}
	}
	roleManage.setRoleDataMap(roleDataMap);
return roleDataMap;
}

// Map of name and access of roleTemplate
function getRoleTemplateData(roleTemplateData){
	var roleTemplateDataMap = {};
	if(roleTemplateData != null && roleTemplateData != "undefined" && roleTemplateData.length>0){
		for(var key in roleTemplateData){
			roleTemplateDataMap[roleTemplateData[key].name] = roleTemplateData[key].access;
		}
		
	}
	roleManage.setRoleTemplateDataMap(roleTemplateDataMap);
	return roleTemplateDataMap;
}

function roleTemplate(roleTemplateData){
	for(var key in roleTemplateData){
		$("#roleTable").append("<dl id="+roleTemplateData[key].name+"><dt><b>"+roleTemplateData[key].name+"</b></dt></dl>");
		var roleTemplateDataMap = roleManage.getRoleTemplateDataMap();
		var dataAccess = roleTemplateDataMap[roleTemplateData[key].name];
		for(var key1 in dataAccess){
			var access = dataAccess[key1].key;
			$("#roleTable").append("<dd class="+access+" onClick='getUserRoleAccess(\""+access+"\",\""+dataAccess[key1].name+"\",\""+roleTemplateData[key].name+"\")' ondblclick='getUserAccess(\""+access+"\",\""+dataAccess[key1].name+"\",\""+roleTemplateData[key].name+"\")'>"+dataAccess[key1].name+"</dd>");
		}
	}
}

var count = 0;
var groupName = new group();
function subCheckboxClickFunction(key,name){
	var grpName = groupName.getName();
	if(grpName == null){
		groupName.setName(name);
		count++;
		if($('.'+name+ '[checked!=true]').length == count){
			$("#"+name).prop('checked','checked');
			count = 0;
			groupName.setName(null);
		}
	}
	else{
		if($('.'+name+ '[checked!=true]').length-1 == count){
			$("#"+name).prop('checked','checked');
			count = 0;
			groupName.setName(null);
		}
		else if(grpName != name){
			count = 1;
			groupName.setName(name);
		}
		else{
			console.log(grpName);
			count++;
		}
	}
	var access = roleManage.getAccess();
	
	if(access == undefined || access == null){
		access = new Object();
		 access[key] = $('#'+key).is(':checked');
		 roleManage.setAccess(access);
	 }
	 else{
		 access[key] = $('#'+key).is(':checked');
	 }
}


function checkboxClickFunction(name){
	var access = roleManage.getAccess();
	var roleTemplateDataMap = roleManage.getRoleTemplateDataMap();
	var dataAccess = roleTemplateDataMap[name];
	
	for(var key in dataAccess){
		 if(access == undefined || access == null){
			access = new Object();
			 access[dataAccess[key].key] = $('#'+name).is(':checked');
			 roleManage.setAccess(access);
		 }
		 else{
			 access[dataAccess[key].key] = $('#'+name).is(':checked');
		 }
	} 
	
		if($('#'+name).is(':checked')){
			$("."+name).prop('checked','checked');
		}
		else{
			$("."+name).removeAttr('checked');
		}
}
function getUserRoleAccess(ev,obj,group){
	var myObj = {
			ev:ev,
			obj:obj,
			group:group
	};
	if(checkRoleAccessArray(myObj)){
		console.log("in true");
		var evObj = myObj.ev;
		$("."+ev).removeClass('changeColor');
		roleAccessArray.pop(myObj);
		console.log(evObj);
	}
//	$("."+ev).prop('class','changeColor');
	else{
		$("."+ev).addClass('changeColor');
		console.log(ev);
		roleAccessArray.push(myObj);
	}
}

function checkRoleAccessArray(obj){
	for(var i=0; i<roleAccessArray.length; i++) {
        if(JSON.stringify(roleAccessArray[i]) == JSON.stringify(obj)) return true;
    }
	return false;
}

	function getUserRoleDetails(){
		for(var key in roleAccessArray){
			getUserAccess(roleAccessArray[key].ev,roleAccessArray[key].obj,roleAccessArray[key].group);
		}
	}


function getUserAccess(ev,obj,group){
	
	var access = roleManage.getAccess();
	if(!checkRoleName(obj)){
		roleName.push(obj);
		$('dl').removeAttr('class');
		if(ev != null && ev != "undefined" && ev.length>0 ) {
		 if(checkElement(group)){
			 if(access != null && access[ev] ){
	 				$("."+group).append('<div><tr><td><input type="checkbox"  class="checkbox" id="'+ev+'" value="'+ev+'" checked="checked"/></td><td style="padding-top:10px;" >' + obj + '<tr><td></div>');
	 				evArray.push(ev);
			 }
	 			else{
	 				$("."+group).append('<div><tr><td><input type="checkbox" class="checkbox" id="'+ev+'" value="'+ev+'"/></td><td style="padding-top:10px;" >' + obj + '</td></tr></div>');
	 				evArray.push(ev);
	 			}
		 }
		 else{
			 array.push(group);
 			if(access != null && access[ev] ){
 				$("#check").append('<div class='+group+'><label><b>'+group+'</b></label><tr><td width="10%"><input type="checkbox"  id="'+ev+'" class="checkbox" value="'+ev+'" checked="checked"/></td><td style="padding-top:10px;" >' + obj + '</td></tr></div>');
 				evArray.push(ev);
 			}
 			else{
 				$("#check").append('<div class='+group+'><label><b>'+group+'</b></label><tr><td width="10%"><input type="checkbox" id="'+ev+'" class="checkbox" value="'+ev+'"/></td><td style="padding-top:10px;" >' + obj + '</td></tr></div>');
 				evArray.push(ev);
 			}
	 	}
	 }
	} 
	
	$('#check input[type="checkbox"]').click(function() {
		
		customRole[$(this).val()] = $(this).is(':checked');
		selectedRole.setRoleAccess(customRole);
		 if(access == undefined){
			access = new Object();
			 access[$(this).val()] = $(this).is(':checked');
			 roleManage.setAccess(access);
		 }
		 else{
			 access[$(this).val()] = $(this).is(':checked');
		 }
	 });
}

function getSelectedRoleAccess(roleTemplateData){
	var access = roleManage.getAccess();
	$("#roleDynamicTable").html('');
	for(var key in roleTemplateData){
		$("#selectGroup").append("<option>"+ roleTemplateData[key].name+ "</option>");
		$("#roleDynamicTable").append("<dl><dt><label><input id="+roleTemplateData[key].name+" style='float:left;' type='checkbox' onClick='checkboxClickFunction(\""+roleTemplateData[key].name+"\")'><span class='text'></span></label><b>"+roleTemplateData[key].name+"</b></dt></dl>");
	var roleTemplateDataMap = roleManage.getRoleTemplateDataMap();
	var dataAccess = roleTemplateDataMap[roleTemplateData[key].name];
	for(var key1 in dataAccess){
		var name = roleTemplateData[key].name;
			if(access != null && access[dataAccess[key1].key] ){
 				$("#roleDynamicTable").append('<dd><label><input class='+name+' id="'+dataAccess[key1].key+'" style="float:left;" onClick="subCheckboxClickFunction(\''+dataAccess[key1].key+'\',\''+name+'\')" type="checkbox" checked="checked" value="'+dataAccess[key1].key+'"/><span class="text"></span></label>'+ dataAccess[key1].name + '</dd>');
			}
 			else{
 				groupName.setName(roleTemplateData[key].name);
 				$("#roleDynamicTable").append('<dd><label><input class='+name+' id="'+dataAccess[key1].key+'" style="float:left;" onClick="subCheckboxClickFunction(\''+dataAccess[key1].key+'\',\''+name+'\')" type="checkbox" value="'+dataAccess[key1].key+'"/><span class="text"></span></label>'+ dataAccess[key1].name + '</dd>');
 			}
		
	
	$('#roleDynamicTable input[type="checkbox"]').click(function() {
		 if(access == undefined){
			access = new Object();
			 access[dataAccess[key1].key] = $(this).is(':checked');
			 roleManage.setAccess(access);
		 }
		 else{
			 access[dataAccess[key1].key] = $(this).is(':checked');
		 }
	 });
	}
	if(groupName.getName() == null || groupName.getName() != roleTemplateData[key].name){
		$("#"+roleTemplateData[key].name).attr('checked','checked');
	}
	else if(groupName.getName() != null || groupName.getName() != roleTemplateData[key].name)
		groupName.setName(null);
	}
}

function checkElement(group){
	for(var i=0; i<array.length; i++) {
        if (array[i] == group) return true;
    }
} 
function checkRoleName(obj){
	for(var i=0; i<roleName.length; i++) {
        if (roleName[i] == obj) return true;
    }
} 

// role object
function getNewRoleObject(isEdit,name,isActive,roleId){
	var role = new Object();
	if(roleId != undefined && roleId != null) {
		role.id = roleId;
		} else if(isEdit) {
		role.id = id;
		}
	role.name = name;
	role.status = isActive;
	
	var access = roleManage.getAccess();
	if(access == null){
		access = new Object();
	}
	role.access = access;
//	var access  = selectedRole.getRoleAccess();
//	if(access == null){
//		access = new Object();
//	}
//	role.access = access;
	return role;
}

function roleManage()
{
	var role={
			
			roleData : null,
			 roleTemplateData : null,
			 roleTemplateDataMap : null,
			 roleDataMap : null,
			 access : null,
			 
			setRoleData : function(roleData){
				role.roleData=roleData;
			},
			getRoleData : function(){
				return role.roleData;
			},
			
			setRoleTemplateData : function(roleTemplateData){
				role.roleTemplateData=roleTemplateData;
				
			},
			getRoleTemplateData : function(){
				return role.roleTemplateData;
			},
			
			setRoleTemplateDataMap : function(roleTemplateDataMap){
				role.roleTemplateDataMap=roleTemplateDataMap;
			},
			getRoleTemplateDataMap : function(){
				return role.roleTemplateDataMap;
			},
			
			setRoleDataMap : function(roleDataMap){
				role.roleDataMap=roleDataMap;
			},
			getRoleDataMap : function(){
				return role.roleDataMap;
			},
	
	        setAccess : function(access){
	        	role.access = access;
	        },
	        
	        getAccess : function(){
	        	return role.access;
	        },
	        
	       
	};
	return role;
}

function group(){
	var groupName={
		name:null,
		setName : function(name){
			groupName.name = name;
		},
		getName : function(){
			return groupName.name;
		}
	};
	return groupName;
}

function selectedRole(){
	var roleName={
		access:null,
		setRoleAccess : function(access){
			roleName.access = access;
		},
		getRoleAccess : function(){
			return roleName.access;
		}
	};
	return roleName;
}