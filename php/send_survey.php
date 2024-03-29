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

$utm_source = $_POST['utm_source'];
$utm_medium = $_POST['utm_medium'];
$utm_campaign = $_POST['utm_campaign'];
$utm_content = $_POST['utm_content'];
$utm_term = $_POST['utm_term'];

$arr = array(
    'Сайт:' => 'http://naujos-lubos.lt/',
    'Тема:' => $theme,
    'Телефон:' => $phone,
    'Мессенджер:' => $contact,
    'Ответы на вопросы:' => ' ',
    '1. Где требуется установить потолок?' => implode(", ", $locations),
    '2. Укажите примерную площадь монтажа:' => $area,
    '3. Из какого материала будет потолок?' => $material,
    '4. Какой вид потолка вы хотите установить?' => $type,
    '5. Количество люстр, шт:' => $chandeliers,
    '6. Количество труб в потолке, шт:' => $pipes,
    '7. Количество углов в помещении, шт:' => $angles,
    '8. Количество светильников, шт:' => $lamps,
    '9. Выберите дополнительные элементы:' => implode(", ", $elements),
    '' => '',
    'UTM метки' => '',
    'utm_source:' => $utm_source,
    'utm_medium:' => $utm_medium,
    'utm_campaign:' => $utm_campaign,
    'utm_content:' => $utm_content,
    'utm_term:' => $utm_term,
);

foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

?>
