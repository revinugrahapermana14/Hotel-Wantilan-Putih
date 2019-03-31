<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">

  <link rel="stylesheet" type="text/css" href="assets/css/bootstrap/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="assets/js/bx/jquery.bxslider.css">
  <link rel="stylesheet" type="text/css" href="assets/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="assets/css/templatemo-style.css">
  <link rel="stylesheet" type="text/css" href="assets/css/normalize.css">
  <link rel="stylesheet" type="text/css" href="assets/css/custom-site.css">
  <link rel="stylesheet" type="text/css" href="assets/css/responsive/dekstop.css">
  <link rel="stylesheet" type="text/css" href="assets/css/responsive/mobile.css">
  <link rel="stylesheet" type="text/css" href="assets/css/responsive/tablet.css">
  <link rel="stylesheet" type="text/css" href="assets/css/jquery-ui.css">
  <link rel="stylesheet" type="text/css" href="assets/css/bootstrap-datepicker.min.css">
  <title>Wantilan Putih</title>
</head>

<body>
  <nav class="navbar navbar-inverse navigation-custom navbar-fixed-top" id="navigation">
    <div class="bottom-border">
      <div class="navbar-header brands">
        <button type="button" class="navbar-toggle toggle-custom" data-toggle="collapse" data-target="#myNavbar">
          <span class="fa fa-bars"></span> 
        </button>
        <a class="navbar-brand" href="index.php">
          <img src="assets/icon/logo-fix.png" class="img-responsive">
        </a>
      </div>
      <div class="collapse navbar-collapse collapse-custom" id="myNavbar">
        <?php  $pg = basename(substr($_SERVER['PHP_SELF'],0,strrpos($_SERVER['PHP_SELF'],'.')));?>
        <ul class="nav navbar-nav middle_">
          <li class="<?php if($pg=='villas'){?>active-menu<?php }?>">
            <a href="villas.php" class="cont_link">Villas</a>
          </li>
          <li class="<?php if($pg=='facilities'){?>active-menu<?php }?>">
            <a href="facilities.php" class="cont_link">Facilities</a>
          </li>
          <li class="<?php if($pg=='gallery'){?>active-menu<?php }?>">
            <a href="gallery.php" class="cont_link">Gallery</a>
          </li> 
          <li class="<?php if($pg=='private_hire'){?>active-menu<?php }?>">
            <a href="private_hire.php" class="cont_link">Private Hire</a>
          </li> 
          <li class="<?php if($pg=='reservation'){?>active-menu<?php }?>">
            <a href="reservation.php" class="cont_link">Reservation</a>
          </li> 
        </ul>
        <ul class="nav collapse-custom navbar-nav navbar-right right_">
          <li>
            <div class="col-right-menu">
              <a href="https://www.google.co.id/maps/place/Villa+Wantilan+Putih/@-8.6936242,115.2628741,17z/data=!3m1!4b1!4m5!3m4!1s0x2dd241c93988d859:0x5901762ca5d11903!8m2!3d-8.6936242!4d115.2650628" class="marker">
                <i class="fa fa-map-marker"></i>
              </a>
              <span class="marker-mrk">|</span>
            </div>
            <div class="col-right-menu-2">
              <select name="" id="">
                <option value="">En</option>
                <option value="">Id</option>
                <option value="">Ru</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>