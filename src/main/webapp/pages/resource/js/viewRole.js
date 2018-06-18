$(document).ready(function() {
	getNameFromRoleData();
	getRoleListFromRoleData();
	getRoleListFromRoleTemplate();
	getSelectedRoleFromRoleData();
	viewRoleList(roleManage.getRoleData());
//	pagination(roleManage.getRoleData());
	
	$("#searchCriteria").keyup(function(event){
	    if(event.keyCode == 13){
	        $("#searchButton").click();
	    }});
});

function getNameFromRoleData() {

	// get name from roleCollection
	$('#searchCriteria').typeahead(
			{

				source : function(query, process) {
					var autoSearch = getAutoSearchObject();
					$.ajax({
						url : contextPath+"/role/autoSearch",
						global : false,
						type : 'post',
						headers : {
							"token_id" : token_id
						},
						data : JSON.stringify(autoSearch),
						dataType : "json",
						async : false,
						contentType : "application/json; charset=utf-8",
						success : function(jsonResult) {
							return process(jsonResult.data);

						}

					});
				},
				matcher : function(item) {
					if (item.toLowerCase().indexOf(
							this.query.trim().toLowerCase()) != -1) {
						return true;
					}
				},
				sorter : function(items) {
					return items.sort();
				},
				highlighter : function(item) {
					var regex = new RegExp('(' + this.query + ')', 'gi');
					return item.replace(regex, "<strong>$1</strong>");
				},
				updater : function(item) {
					return item;
				}
			});
}

function viewRoleList(roleData) {
	$("#table").html('');

	for ( var key in roleData) {
		var name = roleData[key].name;
		$("#table")
				.append(
						'<tr><td class="td">'
								+ name
								+ '</td><td>'
								+ roleData[key].status
								+ '</td><td><button title="View Role" onclick="selectRole(this)" value="'
								+ name
								+ '" name = "'
								+ roleData[key].status
								+ '" id="'
								+ roleData[key].name
								+ '"><i class="glyphicon glyphicon-eye-open"></i></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button title="Edit Role" onclick="editRole(this)" value="'
								+ name
								+ '" name = "'
								+ roleData[key].status
								+ '" id="'
								+ roleData[key].name
								+ '"><i class="glyphicon glyphicon-pencil"></i></button></td></tr>');
	}
	pagination(roleData);
}


function getAutoSearchObject() {
	var autoSearch = new Object();
	var key = "name";
	var value = $('#searchCriteria').val();
	var operation = "and";
	autoSearch.key = key;
	autoSearch.value = value;
	autoSearch.operation = operation;

	return autoSearch;

}

// Search Role
function getSelectedRoleFromRoleData() {

	var roleName = $('#searchCriteria').val();
	$("#table").html('');
	var roleData = roleManage.getRoleData();
	var count = 0;
	for ( var key in roleData) {
		var name = roleData[key].name;
		if (roleName != '' && roleName == name) {
			count++;
			$("#table")
					.append(
							'<tr><td>'
									+ name
									+ '</td><td>'
									+ roleData[key].status
									+ '</td><td><button title="View Role" onclick="selectRole(this)" value="'
									+ name
									+ '" name = "'
									+ roleData[key].status
									+ '" id="'
									+ roleData[key].name
									+ '"><i class="glyphicon glyphicon-eye-open"></i></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button title="Edit Role" onclick="editRole(this)" value="'
									+ name
									+ '" name = "'
									+ roleData[key].status
									+ '" id="'
									+ roleData[key].name
									+ '"><i class="glyphicon glyphicon-pencil"></i></button></td></tr>');
		}

		if (roleName == '') {
			viewRoleList(roleData);
		}
	}
	$('#tableid').dataTable();
//	pagination(roleData,count);

}

function pagination(roleData,count) {
	var len = 0;
	if(typeof count != 'undefined' && count >= 1){
		len = count;
		console.log(count);
	}
	
	else{
		len = roleData.length;
	}
	var trs = $("#table tr");

	trs.hide();
	trs.slice(0, 10).show();

	
	console.log("length---"+len);
	var size = len / 10;
	var e = Math.round(size);
	if (size > e) {
		e++;
	}
	var currentIndex = 10;
	var options = {
		currentPage : 1,
		totalPages : e,
		size : 'normal',
		alignment : 'right',
		onPageClicked : function(e, originalEvent, type, page) {
			trs.hide();
			trs.slice(currentIndex * (page - 1), (currentIndex * page)).show();
		}
	};
//	$('#example').bootstrapPaginator(options);
}

function selectRole(obj) {
	// var roleDataMap = getRoleDataMap(roleData);
	
	var roleData = roleManage.getRoleData();
	var roleDataMap = getRoleDataList(roleData);
	var name = $(obj).attr('value');
	$('.role').html('Role :' + name);
	var status = $(obj).attr('name');
	$('.status').html('');

	if (status == "true") {
		$('.status').html('Status : ACTIVE');
	} else {
		$('.status').html('Status :INACTIVE');
	}

	var roleAccessData;
	for (key in roleDataMap) {
		roleAccessData = roleDataMap[name];

	}
	
	var size = roleTemplateData.length;
	console.log(size);
	printRoleData(size, roleTemplateData, roleAccessData);

	$('#myModal').css('width', '100%');
//	$('#myModal').css('height', '30%');
//	$('#myModal').css('left', '20%');
	$('#myModal').modal("show");
}

function printRoleData(length, roleTemplateData,roleAccessData) {
	var divIds = [ "left", "middle", "right" ];

	$('#' + divIds[0]).html('');
	$('#' + divIds[1]).html('');
	$('#' + divIds[2]).html('');
	var temp2 = 0;
	for ( var k = 0; k < length; k++) {

		$('#' + divIds[temp2]).append(
				'<div class="roleTemplateDataName" id="'
						+ roleTemplateData[k].name + '"><b>'
						+ roleTemplateData[k].name + '</b></div>');
		var result = setNameAndAccessInParagraph(roleTemplateData[k].name,roleAccessData);
		$('.roleTemplateDataName').append('');
		temp2++;
		if (temp2 == 3) {
			temp2 = 0;
		}
	}
}

function setNameAndAccessInParagraph(obj,roleAccessData) {
	var roleTemplateDataMap = roleManage.getRoleTemplateDataMap();
	var resultMap = roleTemplateDataMap[obj];
	for ( var key in resultMap) {
		if (roleAccessData[resultMap[key].key]) {
			$('#' + obj).append(
					"<p class='checkBox'><i class='glyphicon glyphicon-ok' style='margin-left:20px;'></i>"
							+ resultMap[key].name + "</p>");
		} else {
			$('#' + obj).append(
					"<p class='checkBox'><i class='glyphicon glyphicon-remove' style='margin-left:20px;'></i>"
							+ resultMap[key].name + "</p>");
		}
	}
}

function editRole(obj) {
	var name = $(obj).attr('value');
	window.location.href = contextPath+"/role/edit/" + name + "?token_id="
			+ token_id;
}