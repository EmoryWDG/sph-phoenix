

//FOR DOCUMENTATION ON RSPH API: http://cfusion.sph.emory.edu/RSPH-API/

var params, depts, interests;

//Set domains for dev or prod
var apiDomain = 'http://cfusion.sph.emory.edu/'; //Prod
//var apiDomain = 'http://wasp.sph.emory.edu/'; //Dev

//Set API Path
var apiPath = 'RSPH-API/index.cfm/faculty/';

//Combine API URL prefix
var apiUrlPrefix = apiDomain+apiPath;


//LISTENER: For changes in url
$(window).on( 'hashchange', function(){
	
	//clear faculty list
	$('#faculty-list').html('');

	//Check hash properties and values to set active buttons
	checkParams();

	//Get a new list of faculty
	displayFaculty();

});

//FUNCTION: Process Departments Data
function processDeptsData(data){
	var html='', departments = data;

	//If departments data is not undefined (no response)
	if(departments !== undefined){

		//Loop through departments
		$.each(departments, function(key,dept){
			//Accumulate list items for each dept.
			//Apply classes for custom colors using DeptCode (trim needed to remove spaces, lowercase to match class name).
			//Insert Department description
			html+='<li class="dept dept-'+$.trim(dept.DeptCode).toLowerCase()+'" value="'+dept.DeptID+'" id="dept-'+dept.DeptID+'"><a><span title="'+dept.Description+'">'+$.trim(dept.Description)+' ('+$.trim(dept.DeptCode)+')</span></a></li>';	
			
		});
		//Output html to page
		$('#filter-departments ul').html(html);

	}

	//Check the parameteres and set active states
	checkParams();

	//Listener for click events on buttons (placed in this function so to execute after data is recieved)
	$('.dept').click(function(){
		var newValue = Number($(this).attr('value')), values = [];

		//Clear faculty list
		$('#faculty-list').html('');

		//Get values from URL (uses BBQ plugin)
		depts = $.bbq.getState('dept');

		if(depts !== undefined){
			//If depts has existing value(s)...

			//Convert the string of values to array
			depts = depts.split(',');

			//For each value string in the array, push into another array as a number
			//Numbers are used for strict comparisons between newValue and array values
			$.each(depts,function(index,val){
				values.push(Number(val));
			});

			//Does the clicked value exist in the array of existing values?
			if(values.indexOf(newValue) > -1){
				//If so, get the index of its position in the array.
				index = values.indexOf(newValue);

				//Remove that value from the array.
				values.splice(index,1);

				//Convert array to string separated by commas				
				depts = values.join(',');
			} else{
				//Otherwise, add new value to existing values
				depts += ','+newValue;
			}
		} else{
			//Otherwise, set as new value
			depts = newValue;
		}

		//Remove or modify hash state based on values using BBQ plugin
		if(depts === ''){
			//If empty string, just remove the property.
			$.bbq.removeState('dept');
		} else{
			//Otherwise, change the property to the new set of values.
			$.bbq.pushState({"dept":depts});
		}
	});
}

//FUNCTION: Get the list of departments to filter by
function getDepts(depts){
	//Set the AJAX URL
	var url = apiUrlPrefix + 'getDepts.json';

	if(XMLHttpRequest){
		//If browser supports XHR...
		$.get(url).success(function(data,status) {
			//That function right above this.
			processDeptsData(data);
		}).error(function(data,status,headers){
			console.log('Uh-oh: '+status+', '+headers+', '+data);
		});
	} else if(XDomainRequest) {
		//If browser does not support XHR but supports XDR (looking at you IE8/9!)
		$.support.cors = true;

		req = new XDomainRequest();
		req.open('get', url);
		req.onerror = 'Grrrr! XDomainRequest failed!';
		req.onload = function() {
			//That function right above this.
			processDeptsData(req.responseText);
		};
	} else {
		console.log('CORS not supported. Get a modern browser!');
	}
}

//FUNCTION: Process Interests Data
function processInterestsData(data){
	var html='', interests = data;

	//Build the list of interests
	$.each(interests, function(key,interest){
		html+='<li class="interest" value="'+interest.InterestID+'"  id="interest-'+interest.InterestID+'"><a>'+$.trim(interest.Description)+'</a></li>';	
	});

	//Output html to page
	$('#filter-interests ul').html(html);

	//Check the parameteres and set active states
	checkParams();

	//Listener for click events on buttons (placed in this function to execute after data is recieved)
	$('.interest').click(function(){
		var newValue = Number($(this).attr('value')), values = [];

		//Clear faculty list
		$('#faculty-list').html('');

		//Get values from URL (uses BBQ plugin)
		interests = $.bbq.getState('interest');

		if(interests !== undefined){
			//If interests has existing value(s)...

			//Convert the string of values to array
			interests = interests.split(',');

			//For each value string in the array, push into another array as a number
			//Numbers are used for strict comparisons between newValue and array values
			$.each(interests,function(index,val){
				values.push(Number(val));
			});

			//Does the clicked value exist in the array of existing values?
			if(values.indexOf(newValue) > -1){
				//If so, get the index of its position in the array.

				//Get and remove clicked value from params and set params					
				index = values.indexOf(newValue);

				//Remove that value from the array.
				values.splice(index,1);

				//Convert array to string separated by commas				
				interests = values.join(',');
			} else{
				//Otherwise, add new value to existing values
				interests = interests+','+newValue;
			}
		} else{
			//Otherwise, set as new value
			interests = newValue;
		}

		//Remove or modify hash state based on values using BBQ plugin
		if(interests === ''){
			//If empty string, just remove the property.
			$.bbq.removeState('interest');
		} else{
			//Otherwise, change the property to the new set of values
			$.bbq.pushState({"interest":interests});
		}
	});
}

function getInterests(interests){
	//Set the AJAX URL
	var url = apiUrlPrefix + 'getIntAreas.json';

	if(XMLHttpRequest){
		//If browser supports XHR...
		$.get(url).success(function(data,status) {
			//That function right above this.
			processInterestsData(data);
		}).error(function(data,status,headers){
			console.log('Uh-oh: '+status+', '+headers+', '+data);
		});
	} else if(XDomainRequest) {
		//If browser does not support XHR but supports XDR (looking at you IE8/9!)
		$.support.cors = true;

		req = new XDomainRequest();
		req.open('get', url);
		req.onerror = 'Grrrr! XDomainRequest failed!';
		req.onload = function() {
			//That function right above this.
			processInterestsData(req.responseText);
		};
	} else {
		console.log('CORS not supported. Get a modern browser!');
	}
}

function processFacultyData(data){
	var faculty = data;
	var html='', interestDescript='', deptExists;

	if (faculty.length > 0){

		//Loop through faculty members in data
		$.each(faculty, function(key,person){
			html='';

			if($('#'+person.EMPLI).length === 0){
				//If faculty member is not in body of page, add to page
				html = '<a href="profile/?'+person.EMPLI+'" id="'+person.EMPLI+'" ><div class="col-sm-6 col-lg-4"><div class="person thumbnail"><h3>'+person.LastName+', '+person.FirstName+'</h3></div></div></a>';	
				$('#faculty-list').append(html);

				//Clear HTML value for reuse
				html='';

				//If the faculty member has interests...
				if(person.Interest.length > 0){

					//For bolding interests, get interest values from URL (uses BBQ plugin)
					interests = $.bbq.getState('interest');

					//Run only if interests exists as a property.
					if(interests !== undefined){
						//Create empty array
						values =[];

						//Convert the string of values to array
						interests = interests.split(',');

						//For each value string in the array, push into another array as a number
						//Numbers are used for strict comparisons between newValue and array values
						$.each(interests,function(index,val){
							values.push(Number(val));
						});
					}

					//Open the paragraph with the list of interests.
					html = '<p class="interests">';

					//Loop through interests
					$.each(person.Interest, function(key,interest){
						//Add the interest to the HTML.
						if(values !== undefined && values.indexOf(interest.InterestID) > -1) {
							//If it exists in the hash, bold it and write it.
							html += '<strong>'+interest.Description+'</strong>';
						}else{
							//Otherwise, just add it as plain text.
							html += interest.Description;
						}
						//If the interest is not the last interest, add a comma to seperate with the following interest
						if(person.Interest.indexOf(interest) < person.Interest.length - 1){
							html += ', ';
						}
						
					});
					//Close the paragraph
					html += '</p>'

					//Append the paragraph to the faculty card
					$('#'+person.EMPLI+' .person').append(html);
				}

				//Create Depts UL and add to faculty card
				html = '<ul class="depts"></ul>';
				$('#'+person.EMPLI+' .person').append(html);

			}
			$.each(person.Dept, function(key,dept){
				//Set deptExists to length of its presence in ul.depts
				deptExists = $('#'+person.EMPLI+' .person ul.depts li:contains('+$.trim(dept.DeptCode)+')').length;
				if(deptExists === 0){
					//If it doesn't exist (length is 0)

					//Add the department and set it's class (color tagging)
					html = '<li class="dept-descript dept-'+$.trim(dept.DeptCode).toLowerCase()+'" title="'+dept.Description+'">'+$.trim(dept.DeptCode)+'</li>';
					$('#'+person.EMPLI+' .person ul.depts').append(html);
					
				}
			});

		});

	} else {
		//Otherwise, warn that there are no matches
		html = '<div class="alert alert-info clearfix"><p>No matches</p></div>'
		$('#faculty-list').append(html);
	}
}

function getFaculty(params){
	//Set the AJAX URL
	var url = apiUrlPrefix + 'getFaculty.json';
	if(XMLHttpRequest){
		//If browser supports XHR...
		$.get(url, params ).success(function(data,status) {
			//That function right above this.
			processFacultyData(data,params);
		}).error(function(data,status,headers){
			console.log('Uh-oh: '+status+', '+headers+', '+data);
		});
	} else if(XDomainRequest) {
		//If browser does not support XHR but supports XDR (looking at you IE8/9!)
		$.support.cors = true;

		req = new XDomainRequest();
		req.open('get', url);
		req.onerror = 'Grrrr! XDomainRequest failed!';
		req.onload = function() {
			//That function right above this.
			processFacultyData(req.responseText,params);
		};
		req.send(params.toString());
	} else {
		console.log('CORS not supported. Get a modern browser!');
	}
}

function setActiveButtons(filter,keyVals){
	//opt is object clicked; param is the key in the url
	var value = Number(filter.attr('value')), values = [];

	if(keyVals !== undefined){
		//If keyVals has existing value(s)...

		//Convert the string of values to array
		keyVals = keyVals.split(',');

		//For each value string in the array, push into another array as a number
		//Numbers are used for strict comparisons between newValue and array values
		$.each(keyVals,function(index,val){
			values.push(Number(val));
		});
	}

	//Does the value exist in the array of existing values?
	if(keyVals !== undefined && values.indexOf(value) > -1 ){
		//If so, add active class
		filter.addClass('active');
	} else if((keyVals === undefined || values.indexOf(value) === -1) && filter.hasClass('active') ) {
		//If it is undefined or not present, remove the class
		filter.removeClass('active');
	}
}

function checkParams(){

	//Get values from URL (uses BBQ plugin)
	depts = $.bbq.getState('dept');
	interests = $.bbq.getState('interest');

	$('#filter-departments ul li').each( function(){
		filter = $(this);
		//That function right above this
		setActiveButtons(filter,depts)
	});

	$('#filter-interests ul li').each( function(){
		filter = $(this);
		//That function right above this
		setActiveButtons(filter,interests)			
	});
}

function displayFaculty(){
	params = $.param.fragment();
	if(params !== undefined && params !== ''){
		getFaculty(params);
	}
}


$(document).ready(function(){

	getDepts();
	getInterests();
	//Might help hash urls be crawlwable.
	$.param.fragment.ajaxCrawlable( true );
	params = $.param.fragment();
	displayFaculty();

	//Listener for toggling show/hide behavior of filter groups
	$('#filter-interests h2, #filter-departments h2').click(function(){
		$(this).siblings('ul').slideToggle();
		$(this).children('.fa').toggleClass('fa-rotate-90');
	})
	//Cursory code to search by faculty name (or possibly other values)
	/*
    var minlength = 3;

    $("#faculty-search").keyup(function () {
        var that = this,
        value = $(this).val();

        if (value.length >= minlength ) {
			//Call function here
        }
    }
	*/
});