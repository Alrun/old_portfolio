<?php
// Почта получателя
$to = 'fkhey2016@yandex.ru';
// Тема письма
$subject = 'Отзыв';

$name = $_POST['InputName'];
$company = $_POST['InputCompany'];
$job = $_POST['InputJob'];
$phone = $_POST['InputPhone'];
$email = $_POST['InputEmail'];
$otziv = $_POST['InputText'];
$from = "$email";

// Сообщение
$headers = array();
	$headers[] = "From: Auto Group <930920.ru@otziv.com>";
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-type: text/html; charset=UTF-8";
    $headers[] = "Bcc: JJ Chong <bcc@domain2.com>";
    $headers[] = "Reply-To: Recipient Name <receiver@domain3.com>";
    $headers[] = "Subject: {$subject}";
    $headers[] = "X-Mailer: PHP/" . phpversion();
    // собираем текст письма
    $allmsg = "<p><b>Имя:</b> $name</p>
    <p><b>Компания:</b> $company</p>
    <p><b>Должность:</b> $job</p>
    <p><b>Телефон:</b> $phone</p>
    <p><b>E-mail:</b> $email</p>
    <p><b>Сообщение:</b> $otziv</p>";
    $allmsg = "<html>
    <head>
    <title>Обратная связь</title>
    <META HTTP-EQUIV=\"Content-Type\" CONTENT=\"text/html; charset=UTF-8\">
    </head>
    <body>" 
    . $allmsg . 
    "</body>
    </html>";
    // отправляем
    mail($to, $subject, $allmsg, implode("\r\n", $headers))
?>