
//FOR DOCUMENTATION ON RSPH API: http://cfusion.sph.emory.edu/RSPH-API/

//Define Angular App object
var app = angular.module('faculty-profile', []);

//Variables for URL parts
var apiDomain = 'http://cfusion.sph.emory.edu',
apiPath = '/RSPH-API/index.cfm/faculty';


//Get faculty ID from URL
var emplid = window.location.search.substring(1);

//Controller for faculty profile
app.controller('facultyProfile', function($scope,$http)
{
	var url=apiDomain+apiPath+'/getFacultyDetail/'+emplid+'.json';
		//console.log(url)

		//GET FACULTY DETAILS BY ID
		$http.get(url).success(function(data,status){
			//data = [{"Faculty_Appointments":[{"AppointNum":1,"AppointDescr":"Directory of Quality, Division of Cardiology, Emory Healthcare"},{"AppointNum":2,"AppointDescr":"Primary Appointment:  Associate Professor of Medicine (Division of Cardiology), Emory School of Medicine"},{"AppointNum":3,"AppointDescr":"Joint Appointment:  Associate Professor of Epidemiology, Emory Rollins School of Public Health"}],"Faculty_Education":[{"DegreeYear":1999,"DegreeName":"MD","Institution":"Northwestern University Medical School"},{"DegreeYear":2006,"DegreeName":"MHS (Masters in Health Sciences)","Institution":"Duke University"},{"DegreeYear":2002,"DegreeName":"Internal Medicine Residency","Institution":"University of Pennsylvania Medical Center"},{"DegreeYear":2004,"DegreeName":"Cardiology Fellowship (Clinical)","Institution":"Duke University Medical Center"},{"DegreeYear":2007,"DegreeName":"Nuclear Cardiology Fellowship (Clinical)","Institution":"Duke University Medical Center"},{"DegreeYear":2006,"DegreeName":"Cardiovascular Research Fellowship","Institution":"Duke Cliincal Research Institute"},{"DegreeYear":2007,"DegreeName":"Cardiovascular Research Fellowship","Institution":"Population Health Res. Inst., McMaster Univ"}],"Faculty_Personal":[{"Summary":"<div style=\"margin: 0in 0in 0pt\">Abhinav Goyal, MD, MHS, FACC, FAHA is an academic cardiologist and clinical investigator who is an&nbsp;Associate&nbsp;Professor of Medicine (Division of Cardiology) at the Emory School of Medicine, with a joint appointment in the Department of Epidemiology at Emory Rollins School of Public Health. &nbsp;Dr. Goyal also serves as the Director Quality for the Division&nbsp;of Cardiology at&nbsp;Emory Healthcare.&nbsp; He&nbsp;is responsible for directing all quality-related initiatives in the Division of Cardiology at Emory Healthcare, including providing physician oversight for Emory Hospitals' participation in the American College of Cardiology National Cardiovascular Data Registry (CathPCI, ACTION-Registry GWTG, and ICD&nbsp;Registries);&nbsp;American Heart Association Mission: Lifeline program for patients with acute heart attacks; and The Emory Clinic's quality improvement&nbsp;initiatives pertaining to cardiovascular performance measures.&nbsp; Dr. Goyal&rsquo;s&nbsp;research interests&nbsp;include&nbsp;population research investigating the link between diabetes or dysglycemia and cardiovascular disease; quality,&nbsp;health services research, and&nbsp;outcomes research in cardiovascular medicine; cardiovascular clinical trials; and global tobacco control.<\/div>\r\n<div style=\"margin: 0in 0in 0pt\">&nbsp;<\/div>\r\n<div style=\"margin: 0in 0in 0pt\">To learn more about Dr. Goyal's clinical, research, service, and teaching contributions, please click on the &quot;Curriculum Vitae&quot;&nbsp;link&nbsp;below, or visit the link\r\n<div><span style=\"color: black; font-size: 10pt\"><a href=\"http:\/\/scholar.google.com\/citations?user=A5JS8dkAAAAJ\"><font color=\"#0000ff\">http:\/\/scholar.google.com\/citations?user=A5JS8dkAAAAJ<\/font><\/a><\/span><\/div>\r\n<\/div>","SecondaryEmail":"","FirstName":"Abhinav","PrimaryEmail":"AGOYAL4@EMORY.EDU","URL":"","IMG":[{"imgExists":true,"imgLink":"http:\/\/cfusion.sph.emory.edu\/RSPHPeople\/images\/faculty\/AGOYAL4.jpg"}],"ResumeLink":"","LastName":"Goyal"}],"NETID":"AGOYAL4","Faculty_Address":[{"Phone":"404-727-8758","Building":"","Zip":30322,"MailStop":"Room 531","StateName":"Georgia","City":"Atlanta","AlternatePhone":"","Street":"1462 Clifton Rd NE , Room 531  ","StateCode":"GA "}],"EMPLI":26,"Faculty_Profile":[{"DeptDescr":"Epidemiology","FacultyDesignation":"Jointly Appointed","PrimaryDepartment":"Y","FacultyDescription":"Jointly Appointed","DeptCode":"EPI    ","DeptID":5,"Title":"Rollins Assistant Professor of Epidemiology","GraduateFaculty":""}],"Faculty_Interest":[{"Description":"Diabetes","InterestID":10},{"Description":"Global Health","InterestID":14},{"Description":"Health Outcomes","InterestID":20},{"Description":"Risk Assessment","InterestID":30},{"Description":"Cardiovascular Disease","InterestID":37}]}];
			
			var person = data[0];
			$scope.personal = person.Faculty_Personal[0];
			$scope.profileData = person.Faculty_Profile;
			$scope.education = person.Faculty_Education;
			$scope.address = person.Faculty_Address[0];
			$scope.interests = person.Faculty_Interest[0];
			var title = $(document).prop('title');
			title += ' | ' + $scope.personal.FirstName + ' '+ $scope.personal.LastName;
			$(document).prop('title', title);
		}
		).error(function(data,status,headers)
		{
			console.log('Uh-oh: '+status);
		}
		);


		url = apiDomain+apiPath+'/getProjectsByID/'+emplid+'.json';

		//GET PROJECTS
		/*$http.get(url).success(function(data,status)
		{
			var projects = data[0];
			$scope.projects = projects;
		}
		).error(function(data,status,headers)
		{
			console.log('Uh-oh: '+status);
		}
		);*/


		//GET COURSES
		url=apiDomain+apiPath+'/getCurrCoursesByID/'+emplid+'.json';
		
		$http.get(url).success(function(data,status)
		{
			var courses = data;
			$scope.courses = courses;
		}
		).error(function(data,status,headers)
		{
			console.log('Uh-oh: '+status);
		}
		);
		
		//GET AFFILIATIONS
		url=apiDomain+apiPath+'/getAffiliationsByID/'+emplid+'.json';
		$http.get(url).success(function(data,status)
		{
			var affiliations = data;
			$scope.affiliations = affiliations;
		}
		).error(function(data,status,headers)
		{
			console.log('Uh-oh: '+status);
		}
		);
		

		//GET PUBLICATIONS
		url=apiDomain+apiPath+'/getPubsByID/'+emplid+'.json';


		$http.get(url).success(function(data,status)
		{
			var pubs = data;
			//console.log(pubs)
			$scope.pubs = pubs;
		}
		).error(function(data,status,headers)
		{
			console.log('Uh-oh: '+status);
		}
		);

	}
	);
//This function outputs HTML and binds to element.
//EXAMPLE: <div ng-if="project.Description != ''" ng-bind-html="project.Description | unsafe"></div>

app.filter('unsafe', function($sce){
	return function(val)
	{
		return $sce.trustAsHtml(val);
	};
});