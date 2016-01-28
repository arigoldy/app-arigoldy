$(document).ready(function(){
        $(".projectList").mouseleave(function(){
	        $(this).find('.onHover').animate({marginTop: '100%'},'fast');
	    }).mouseenter(function(){
	        $(this).find('.onHover').animate({marginTop: '0px'},'fast');
	    });

	    $("#openMenu").mouseleave(function(){
	        $(".iconOpenMenu").css("background", "#ffffff");
	    }).mouseenter(function(){
	        $(".iconOpenMenu").css("background", "#009ee2");
	    });

	    $(".sideClick").hover(function() {
	    	var limg = $(this).find('img:first').attr("src");
	    	var debutImg = limg.split(".");
			$(this).find('img:first').attr("src",debutImg[0]+"Blue."+debutImg[1]);
				}, function() {
			var limg2 = $(this).find('img:first').attr("src");
			var debutImg2 = limg2.split("Blue");
			$(this).find('img:first').attr("src",debutImg2[0]+debutImg2[1]);
		});

		

	    // au clic sur un lien
	    $('a.scroll').on('click', function(evt){
	       // bloquer le comportement par défaut: on ne rechargera pas la page
	       
	       evt.preventDefault(); 
	       // enregistre la valeur de l'attribut  href dans la variable target
		var target = $(this).attr('href');
	       /* le sélecteur $(html, body) permet de corriger un bug sur chrome 
	       et safari (webkit) */
		$('html, body')
	       // on arrête toutes les animations en cours 
	       .stop()
	       /* on fait maintenant l'animation vers le haut (scrollTop) vers 
	        notre ancre target */
	       .animate({scrollTop: $(target).offset().top}, 500 );
	    });

	    $(document).scroll(function() {
	      var y = $(this).scrollTop();
		  if (y > 100) {
		    $('#goingUp').fadeIn();
		    $('#head').css('position', 'fixed');
		    $('#head').css('background', '#ffffff');
		    $('#head').css('box-shadow', '2px 0px 2px #333');
		  } else {
		    $('#goingUp').fadeOut();
		    $('#head').css('position', 'absolute');
		    $('#head').css('background', 'none');
		    $('#head').css('box-shadow', 'none');
		  }
		});

		$("#openMenu, #shadowBox, .sideClick").on("click", function(){
	      if(!$("#openMenu").hasClass('goOpen')) {
	        $("#openMenu").addClass('goOpen');
	        $('#menuSide').animate({"marginLeft": "+=350px"}, "slow");
	      } 
	      else {
	        $("#openMenu").removeClass('goOpen');
	        $('#menuSide').animate({"marginLeft": "-=350px"}, "slow");
	      }
	  });

		$(document).on('click', "#formSubmit", function() {
			var nom = $('#nomMessage').val();
			var prenom = $('#prenomMessage').val();
			var email = $('#emailMessage').val();
			var texte = $('#textMessage').val();
			$('#formSubmit').fadeOut();
			if(nom == "" || prenom == "" || prenom == "" || texte == "") {
				$('#erreurSend').html('<img style="margin-right:10px;width:25px;" src="img/warning.svg" />Veuillez renseigner tous les champs du formulaire');
				setTimeout(function(){
					$('#erreurSend').html('');
					$('#formSubmit').fadeIn();
				},3000);
			}
			else if (!validateEmail(email)) {
				$('#erreurSend').html('<img style="margin-right:10px;width:25px;" src="img/warning.svg" />Veuillez renseigner un e-mail valide');
				setTimeout(function(){
					$('#erreurSend').html('');
					$('#formSubmit').fadeIn();
				},3000);
			}
			else {
				var xhr = new XMLHttpRequest();
				var url = "sendMessageContact.php";
				var params = "nom=" + nom + "&prenom=" + prenom + "&email=" + email + "&texte=" + texte;
				xhr.open("POST", url, true);
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function() { 
					if(xhr.readyState == 4 && xhr.status == 200) {
						if(xhr.responseText != "") {
							$('#erreurSend').html('<img style="margin-right:10px;width:25px;" src="img/thumb_up.svg" />'+xhr.responseText);
							setTimeout(function(){
								$('#erreurSend').html('');
								$('#formSubmit').fadeIn();
							},5000);
							var nom = $('#nomMessage').val('');
							var prenom = $('#prenomMessage').val('');
							var email = $('#emailMessage').val('');
							var texte = $('#textMessage').val('');
						}
					}
				};
				xhr.send(params);
			}
		});

		function validateEmail(email) { 
		    var re = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
		   
		    return re.test(email);
		}

		$(".logo").rotate({bind:{
		  click: function(){
		    $("#twitter").rotate({
		      angle: 0,
		      animateTo:1080
		      })
		    }
		  }
		});

		$(document).on('click', ".videoDemo", function() {
			$('#shadowPop').fadeIn();
			$('#popUpVideo').fadeIn();
			$('.embed-container').html('<video controls="controls" autoplay="true"><source src="../videos/presentation.mp4" type="video/mp4" /><source src="../videos/presentation.webm" type="video/webm" /><source src="../videos/presentation.ogv" type="video/ogg" /></video>');
		});

		$(document).on('click', '#closePop, #shadowPop', function(){
			$('#popUpVideo').fadeOut();
			$('#shadowPop').fadeOut();
			$('.embed-container').html("");
		});

		

		$(document).on('click', ".logo", function() {
			if(!$("#twitter").hasClass('goOut')) {
				$("#twitter").addClass('goOut');
				$('#twitter').show();
				$('#twitter').animate({marginLeft: "+=120px"}, {queue: false, duration: 'slow'});
				$('#twitter').animate({marginTop: "+=15px" }, 'slow');
				ion.sound.play("twitt");
				setTimeout(function(){
		        	$('#follow').fadeIn();
		        },900);
			} 
		    else {
		        $("#twitter").removeClass('goOut');
		        $('#twitter').animate({marginLeft: "55px"}, {queue: false, duration: 'slow'});
				$('#twitter').animate({marginTop: "15px" }, 'slow');
		        setTimeout(function(){
		        	$('#twitter').hide();
		        },1000);
		        $("#follow").hide();

		        ion.sound.play("twitt");

		    }
		});

		ion.sound({
		    sounds: [
		        {name: "twitt"}
		    ],

		    // main config
		    path: "sound/",
		    preload: true,
		    multiplay: true,
		    volume: 0.9
		});
});

