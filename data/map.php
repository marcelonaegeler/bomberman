<?php

$map = [];
for($i = 0; $i < 8; $i++) {
  $step = 100;
  $size = 50;

  if($i == 0) $x = 50;
  else $x = ($i * $step) + $size;

  for($j = 0; $j < 4; $j++) {
    if($j == 0) $y = 50;
    else $y = ($j * $step) + $size;
    array_push($map, [ 'x' => $x, 'y' => $y, 'wreckable' => false ]);
  }
}
echo json_encode($map);
