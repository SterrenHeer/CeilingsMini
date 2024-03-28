<?php

$token = "7123887500:AAGi-aVbkiSVnHC6f5iP0flwDkla3xnhIE0";
$chat_id = "485723702";

$phone = ($_POST['phone']);
$theme = ($_POST['theme']);
$result = ($_POST['result']);

$arr = array(
    'Сайт:' => 'http://naujos-lubos.lt/',
    'Тема:' => $theme,
    'Телефон:' => $phone,
    'Выигрышная позиция:' => $result,
);

foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

?>
