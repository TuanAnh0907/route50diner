
$().ready(function() {
	
	// validate signup form on keyup and submit
	$("#RT50-Contact,#RT50-Birthday").validate({
		rules: {
			
			name: "required",
			email: {
				required: true,
				email: true
			},		
			phone: "required",
			address: "required",
			city: "required",
			state: "required",
			zip: "required",
			partydate: "required",
			amountattending: "required",
			
		},
		messages: {
		
			name: "Please enter your firstname",
			email: "Please enter a valid email address",
			phone: "Please enter phone number",
			address: "Please enter your address",
			city: "Please enter your city",
			state: "Please select your state",
			zip: "Please enter your zipcode",
			partydate: "Please enter a date",
			amountattending: "Please enter an amount of guests",
		}
	});
	
	// propose username by combining first- and lastname
	$("#username").focus(function() {
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
		if(firstname && lastname && !this.value) {
			this.value = firstname + "." + lastname;
		}
	});
	
	// check if confirm password is still valid after password changed
	$("#password").blur(function() {
		$("#confirm_password").valid();
	});
	
	//code to hide topic selection, disable for demo
	var newsletter = $("#newsletter");
	// newsletter topics are optional, hide at first
	var inital = newsletter.is(":checked");
	var topics = $("#newsletter_topics")[inital ? "removeClass" : "addClass"]("gray");
	var topicInputs = topics.find("input").attr("disabled", !inital);
	// show when newsletter is checked
	newsletter.click(function() {
		topics[this.checked ? "removeClass" : "addClass"]("gray");
		topicInputs.attr("disabled", !this.checked);
	});
});


