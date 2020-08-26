$(document).ready(function(){
    //menu
    $('nav a[href^="#"]').click(function(e){
        e.preventDefault();
        let target = $(this).attr('href');
        $('nav a[href^="#"].active').removeClass('active');
        $(this).addClass('active');
        

        $('html, body').animate(
            {
                scrollTop:$(target).offset().top
            },
            800
        );
    });

    $('.toggle-hamburger').click(function(){
        $('nav').toggleClass('show');
        $('#black_fill').show();
    });

    //gallery action
    $('.gallery_box .gallery_item').click(function(){
        $(this).toggleClass('active');
    });

 

    let offset = $('nav').offset();
    $(window).scroll(function(){
        if($(window).scrollTop() > offset.top){
            $('nav').addClass('fixedNav')
            $('nav a[href^="#"].active').removeClass('active');
        }else{
            $('nav').removeClass('fixedNav')
        }

    });

    $('#slider1').slick({
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000
    });
    $('#slider2').slick({
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000
    })

    
    $('#slider3').slick({
        arrows: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false                
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false       
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false       
              }
            }
        ]
    })

    //формы шапки
    $('.feedback_form input[type=submit]').click(onFeedbackFormSend);
    $('#recall input[type=submit]').click(onRecallFromSend);
    //форма галереи
    $('.gallery_form input[type=submit]').click(onGalleryFormSend);
    //форма футера
    $('.contacts_form input[type=submit]').click(onContactFormSend);
    //форма заказа перевода
    $('#order_form input[type=submit]').click(onOrderFormClick);
    //модальные формы
    $('#order_translate').click(onOrderClick);
    $('#recall_button').click(onRecallClick);
    $('#black_fill').click(onBlackFillClick);
});

function initMap(){
    let optinons = {
        center: {lat: 55.8378241, lng: 37.4442342},
        zoom: 15,
        panControl: false,
        zoomControl: false,
        scaleControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    }

    const map = new google.maps.Map(document.getElementById("map"), optinons);
    const marker = new google.maps.Marker({
        position: {lat:55.838251, lng:37.431081},
        map: map,
    });
}

function onOrderClick(e){
    e.preventDefault();
    $("#order_form").removeClass('hidden');
    $('#black_fill').show();
}

function onRecallClick(){
    $('#recall').removeClass('hidden');
    $('#black_fill').show();
}

function onBlackFillClick(){
    $('#recall').addClass('hidden');
    $("#order_form").addClass('hidden');
    $('nav').removeClass('show');
    $('#black_fill').hide();
}

function onContactFormSend(e){
    let errors = false;
    let messageField =  $('.contacts_form .message');
    let name = $('.contacts_form #contactName').val();
    let question = $('.contacts_form #contactQuestion').val();
    let email = $('.contacts_form #contactEmail').val();
    let msg = '';
    
    
    if(!checkName(name)){
        errors = true;
        msg = 'Неправильное имя';
    }else if(!checkEmail(email)){
        errors = true;
        msg = "Неправильный email";
    }else if(question.lenght < 1){
        errors = true;
        msg = 'Задайте, вопрос';
    }else{
        msg = 'Спасибо, ваш запрос отправлен.';
    }
    
    if(errors){
        e.preventDefault();
    }
    
    messageField.text(msg);
    messageField.show();
}

function onOrderFormClick(e){
    let errors = false;
    let messageField =  $('#order_form .message_field');
    let name = $('#order_form #advName').val();
    let phone = $('#order_form #advPhone').val();
    let email = $('#order_form #advEmail').val();
    let msg = '';
    
    if(!checkName(name)){
        errors = true;
        msg = 'Неправильное имя';
    }else if(!checkPhone(phone)){
        errors = true;
        msg = 'Неправильный номер телефона';
    }else if(!checkEmail(email)){
        errors = true;
        msg = "Неправильный email";
    }else{
        msg = 'Спасибо, ваш запрос отправлен.';
    }
    
    if(errors){
        e.preventDefault();
    }
    
    messageField.text(msg);
    messageField.show();
}

function onGalleryFormSend(e){
    let errors = false;
    let messageField =  $('.gallery_form .send_message');
    let name = $('.gallery_form #galleryName').val();
    let phone = $('.gallery_form #galleryPhone').val();
    let email = $('.gallery_form #galleryEmail').val();
    let msg = '';
    
    if(!checkName(name)){
        errors = true;
        msg = 'Неправильное имя';
    }else if(!checkPhone(phone)){
        errors = true;
        msg = 'Неправильный номер телефона';
    }else if(!checkEmail(email)){
        errors = true;
        msg = "Неправильный email";
    }else{
        msg = 'Спасибо, ваш запрос отправлен.';
    }
    
    if(errors){
        e.preventDefault();
    }
    
    messageField.text(msg);
    messageField.show();
}

function onFeedbackFormSend(e){
    let errors = false;
    let messageField =  $('.feedback_form .confirm_message');
    let name = $('.feedback_form #name').val();
    let phone = $('.feedback_form #phone').val();
    let msg = '';
    

    if(!checkName(name)){
        errors = true;
        msg = 'Неправильное имя';
    }else if(!checkPhone(phone)){
        errors = true;
        msg = 'Неправильный номер телефона';
    }else{
        msg = 'Спасибо, ваш запрос отправлен.';
    }
    
    if(errors){
        e.preventDefault();
    }
    
    messageField.text(msg);
    messageField.show();
}

function onRecallFromSend(e){
    let errors = false;
    let messageField = $('#recall .message_field');
    let name = $('#recall #recallName').val();
    let phone = $('#recall #recallPhone').val();
    let email = $('#recall #recallEmail').val();
    let msg = '';

    if(!checkName(name)){
        errors = true;
        msg = 'Неправильное имя';
    }else if(!checkPhone(phone)){
        errors = true;
        msg = 'Неправильный номер телефона';
    }else if(!checkEmail(email)){
        errors = true;
        msg = "Неправильный email";
    }else{
        msg = 'Спасибо, ваш запрос отправлен.';
    }
    
    if(errors){
        e.preventDefault();
    }
    
    messageField.text(msg);
    messageField.show();
}

function checkPhone(ph) {
    var phoneRe = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    return phoneRe.test(ph);
}

function checkName(name) {
    var nameRe = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/;
    return nameRe.test(name);
}

function checkEmail(em) {
    var emailRe = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRe.test(em);
}