$(document).ready(function(){



    $('#message-input').keydown(function(){                             //richiamo fz invioMessaggio
        if (event.which == 13 || event.keyCode == 13) {
            invioMessaggio();
        }
    });

    $('#message-input').focus(cambioIcona);
	$('#message-input').focusout(cambioIcona);
    $('#plane-message-btn').on('click',invioMessaggio);

    $('#search').keyup(ricercaContatto);                            //richiamo fz. cerca contatto


    $('.chat-box').on('click',selezionaContatto);                   //richiamo la fz per selezionare la chat


    //
    // FZ. INVIO SMS

    function invioMessaggio(){

        var messaggio = $('#message-input').val();

        $('#message-input').val('');                             //pulisco input messaggio dopo l'invio
        var clone = $('.template .message').clone();            //  creo clone del template partendo dal sms che si trova dentro al template
        clone.addClass('send');
        clone.find('.message-text').append(messaggio);          // inserimento testo

        var time = data();                                      //inserimento ora corrente invio sms
        clone.find('.message-time').append(time);

        $('.last-entry-time').text('Sta scrivendo...');

        $('.chat-display .chat.active').append(clone);                        // inserimento nel dom

        setTimeout(rispostaAutomatica,2000);                    // dopo un tempo settato parte la risp automatica
    }


    //
    // FZ. RISPOSTE FAKE

    var risposta = [                                            //array risposte finte
        'Ciao come stai?',
        'Ciao',
        'ok',
        'Sono al lavoro',
        'Ti va di andare a fare un aperitivo dopo?',
        'Mi sembra una bellissima idea',
        'Che triste oggi piove.. ',
        'Era tanto che non ci sentivamo',
        'Io sto bene, e tu come stai?',
        'Oggi vado al mare, vieni con me?'
    ];


    function rispostaAutomatica(){                              //fz. risposta automatica utilizzando array risposte finte
        var frase =numeriRandom(1, risposta.length - 1);
        var sms = risposta[frase];
        var clone2 = $('.template .message').clone();
        var time = data();

        clone2.find('.message-text').append(sms);
        if (sms.length>20) {
            var sms = sms.substring(0, 20) + '...';
        }
        $('.chat-box.active').find($('.chat-text')).text(sms);

        $('.chat-box.active').find($('.chat-time')).text(time);                             //aggiornamento ora sinistra

        clone2.find('.message-time').append(time);

        clone2.addClass('received');
        $('.chat-display .chat.active').append(clone2);
    }


    //
    //FZ. RICERCA CONTATTO

    function ricercaContatto(){
        var filtro = $('#search').val().toLowerCase();
        var contatto = $('.chat-box');
        for (var i = 0; i < contatto.length; i++) {
            var elemento = contatto.eq(i).find('.chat-name .name').text();
            if (elemento.toLowerCase().includes(filtro)) {
                contatto.eq(i).show();
			} else {
				contatto.eq(i).hide();
            }
        }
    }


    //
    //FZ. SELEZIONA CONTATTO

    function selezionaContatto(){

        $('.chat-box').removeClass('active');        //rimozione classe active da tutto
        // $(this).addClass('active');
        $('.chat-display .chat').removeClass('active');
        $(this).addClass('active');
        //cerco info CONTATTO
        var lastName = $('.chat-box.active .name').text();
        var lastImg = $('.chat-box.active .avatar-img').attr('src');
        var lastTime = $('.chat-box.active .chat-time').text();
        //gli conpio nell header
        $('.last-entry .last-entry-name').text(lastName);
        $('.last-entry-img').attr('src',lastImg);
        $('.last-entry-time').text(lastTime);

        var chat_index = $(this).index();   //individuo l'indice della chat cliccata
        $('.chat-display .chat').eq(chat_index).addClass('active') //visualizzo la conversazione giusta
    }



    //
    //FZ CAMBIA MICROFONO IN AEROPLANO
    function cambioIcona(){
        $('.plane,.microfone').toggle(300);
    }

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// ***** FUNZIONI GENERALI***** //

    //
    //FZ. RANDOM
    function numeriRandom(min,max){
        return Math.floor(Math.random()*(max - min + 1) + min);
    }

    //
    // FZ. SCRITTURA ORA
    function data(){
    var d = new Date();
    var ora = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    return ora+ ':'+m;
    }

    //
    // FZ. AFFIUNTA 0 NELL'ORA <10
    function addZero(numero){
    if(numero<10){
        return '0' +numero;
    }
    return numero;
    }

});
