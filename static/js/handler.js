$(document).ready(function() {
     function getQuerystring (key) {
        key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regex = new RegExp("[\\?&]"+key+"=([^]*)");
        var qs = regex.exec(location.search);
        return qs[1];
      }
var username = decodeURIComponent(getQuerystring('username'))

      $.get( "/api/contact/" + username, function( data ) {
	      	console.log(data);
	      	var newData = JSON.parse(data); // put data into workable format
	    if (newData.status != 200) {
	      	console.log('no info');
	    	addField ('p', 'Information for this contact could not be retrieved.', '1', '.results');
	    } else {
	      	$( '.results' ).addClass('pure-g'); // put formatting in here

	      	// var profilePictureContainer = $('<div></div>').addClass('pure-u-1-6').appendTo('.results')
	      	// 	.css('background-image', 'url(' + newData.photos[0].url + ')')
	      	// 	.css('height', '6em');
	      	if (Array.isArray(newData.photos)) {
				if (newData.photos[0].url != undefined) {
					var profilePicture = $('<img>')
						.addClass('avatar')
						.attr('src', newData.photos[0].url)
						.attr('width', '72px')
						.attr('height', '72px')
						.appendTo('.results');
				}
			}

			if (newData.contactInfo != undefined) {
	      		addField ('h1', newData.contactInfo.givenName, '1', '.results');
	     	} else {
	     		if (Array.isArray(newData.socialProfiles)) {
	     			addField ('h1', newData.socialProfiles[0].username, '2-3', '.results');
	     		}
	     	}

	      	if (newData.demographics != undefined) {
	      		addField ('p', newData.demographics.locationDeduced.normalizedLocation, '1', '.results');
	    	}

	      	// Social network section
	      	addField ('h3', 'Social Networks <i id="socialChev" class="fa fa-chevron-down"></i>', '1 socialToggle', '.results');

	      	addField ('div', '', '1 socialContainer', '.results');

	      	$('.socialContainer').hide();

	      	$('.socialToggle').click(function() {
	      		$('.socialContainer').slideToggle();

	      		if ($('#socialChev').attr('class').includes('down')) {
	      			$('#socialChev').attr('class', 'fa fa-chevron-up');
	      		} else {
	      			$('#socialChev').attr('class', 'fa fa-chevron-down');
	      		}
	      	});

	      	if (Array.isArray(newData.socialProfiles)) {
		      	if (newData.socialProfiles.length > 0) {
			      	for (var i = 0; i < newData.socialProfiles.length; i++) {
				      	addField ('p', newData.socialProfiles[i].typeName, '1-6 key', '.socialContainer');
				      	addField ('p', '<a target="_blank" href="' + newData.socialProfiles[i].url + '">' + newData.socialProfiles[i].url + '</a>', '5-6', '.socialContainer');
			      	}
			    }
			}
	      	// Add full data at bottom
	      	var dataDump = $('<pre></pre>').addClass('pure-u-1').html(JSON.stringify(newData, null, 2)).hide();

	      	var dataDumpToggle = $('<a></a>').addClass('pure-u-1-3').text('Click for more info').attr('href', '#').appendTo('.results').click(function() {
	      		dataDump.slideToggle();
	      	});

	      	var fullContact = $('<a></a>').addClass('pure-u-2-3').text('Information provided by FullContact').attr('href', 'https://www.fullcontact.com/').attr('target', '_blank').appendTo('.results');

	      	dataDump.appendTo('.results');

	    }

	    // function for adding information, takes: HTML tag, custom key, text, size (string)(eg. 1, 1-2, 1-6), target of appendTo
      	function addField (ht, t, s, at) {
      		if (t != undefined) {
	      		var element = $('<' + ht + '></' + ht + '>').addClass('pure-u-' + s).html(t).appendTo(at);
	      	}
      	}

        // data: 
/*		{ 	"status" : 200,
        	"requestId" : "c64cc667-89c8-49af-aeda-0dea70118f36",
        	"likelihood" : 0.99,
        	"photos" : [
        		{ 	"type" : "twitter",
        			"typeId" : "twitter",
        			"typeName" : "Twitter",
        			"url" : "https://d2ojpxxtu63wzl.cloudfront.net/static/68b0cff7c22d4502b20eff230eba4c63_b87ba3e922eee0c97bb4ea59eb651ac7659345e37a078a32b88ce6b39c0268e3",
        			"isPrimary" : true
        		}
        	],
        	"contactInfo" :
        		{ 	"websites" : [
        			{ "url" : "http://blog.hootsuite.com" }
        			],
        			"fullName" : "Hootsuite",
        			"givenName" : "Hootsuite"
        		},
    		"demographics" :
    			{ 	"locationDeduced" :
    					{ 	"normalizedLocation" : "Vancouver, British Columbia, Canada",
    						"deducedLocation" : "Vancouver, British Columbia, Canada",
    						"city" : { "deduced" : false, "name" : "Vancouver" },
    						"state" : { "deduced" : false, "name" : "British Columbia" },
    						"country" : { "deduced" : false, "name" : "Canada", "code" : "CA" },
    						"continent" : { "deduced" : true, "name" : "North America" },
    						"likelihood" : 1.0
    					},
    				"age" : "45",
    				"ageRange" : "40-50",
    				"locationGeneral" : "Vancouver, British Columbia, Canada"
    			},
    		"socialProfiles" : [
    			{ 	"bio" : "Social media news and tips from the world’s most widely used social relationship platform. Sign up for free: http://t.co/Zmrb0hY23s Support: @Hootsuite_Help",
    				"followers" : 7031499,
    				"following" : 1586852,
    				"type" : "twitter",
    				"typeId" : "twitter",
    				"typeName" : "Twitter",
    				"url" : "https://twitter.com/hootsuite",
    				"username" : "hootsuite",
    				"id" : "17093617"
    			}
        	]
        }*/
    });
});
