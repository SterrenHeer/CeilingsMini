<?php

$token = "7123887500:AAGi-aVbkiSVnHC6f5iP0flwDkla3xnhIE0";
$chat_id = "-4189381710";

$phone = ($_POST['phone']);
$theme = ($_POST['theme']);

$locations = ($_POST['locations']);
$area = ($_POST['area']);
$material = ($_POST['material']);
$type = ($_POST['type']);
$chandeliers = ($_POST['chandeliers']);
$pipes = ($_POST['pipes']);
$angles = ($_POST['angles']);
$lamps = ($_POST['lamps']);
$elements = ($_POST['elements']);
$contact = ($_POST['contact']);

$arr = array(
    'Сайт:' => 'http://naujos-lubos.lt/',
    'Тема:' => $theme,
    'Телефон:' => $phone,
    'Мессенджер:' => $contact,
    'Ответы на вопросы:' => ' ',
    'Где требуется установить потолок?' => $locations,
    'Укажите примерную площадь монтажа:' => $area,
    'Из какого материала будет потолок?' => $material,
    'Какой вид потолка вы хотите установить?' => $type,
    'Количество люстр, шт:' => $chandeliers,
    'Количество труб в потолке, шт:' => $pipes,
    'Количество углов в помещении, шт:' => $angles,
    'Количество светильников, шт:' => $lamps,
    'Выберите дополнительные элементы:' => $elements,
);

foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

?>
