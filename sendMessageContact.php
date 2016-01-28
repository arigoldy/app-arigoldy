<?php
if(isset($_POST['prenom']) && isset($_POST['nom']) && isset($_POST['email']) && isset($_POST['texte'])) {
	$prenom = $_POST['prenom'];
	$nom = $_POST['nom'];
	$email = $_POST['email'];
	$text = nl2br($_POST['texte']);
	//ENVOI DU MAIL POUR L'ADMIN
	 	$to  = 'contact@arigoldy.com';
		$subject = 'Nouveau message sur le site ARIGOLDY';
		$message = '<div style="width:100%;"><div style="margin:auto;text-align:center;"></div><p style="color:#000;">Nouveau message sur le site Arigoldy.<br/><br/>Prénom :'.$nom.' - '.$prenom.'.<br/>Email : '.$email.' <br/><br/>Message :<br/><br/>'.$text.'</p><hr/></div>';
		// Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
		// En-têtes additionnels
		$headers .= 'From: SITE ARIGOLDY <contact@arigoldy.com>' . "\r\n";
		// Envoi
		mail($to, $subject, $message, $headers);
		echo "Le message a bien été envoyé ! Nous vous répondrons rappidement. Merci !";

} else{
	header('location: index.php');
}
?>