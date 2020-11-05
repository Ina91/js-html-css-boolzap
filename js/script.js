$(document).ready(function(){

    // $('.plane-message').click(function(){
    //     invioMessaggio();
    // });

        $('#message-input').keydown(function(){
            if (event.which == 13 || event.keyCode == 13) {
                invioMessaggio();
            }
        });


        // fz invio sms
        function invioMessaggio(){
            var messaggio = $('#message-input').val();

            //  creo clone del template partendo dal sms che si trova dentro al template
            var clone = $('.template .message').clone();

            clone.addClass('send');
            // inserimento testo
            clone.find('.message-text').append(messaggio);
            var time = data();
            clone.find('.message-time').append(time);
            // inserimento nel dom
            $('.chat.active').append(clone);
            // risp automatica
            setTimeout(rispostaAutomatica,2000);



        }



        // fz risp rispostaAutomatica

        //array risposte finte
        var risposta = [
            'Ciao come stai?',
            'Sono al lavoro',
            'Ti va di andare a fare un aperitivo dopo?',
            'Mi sembra una bellissima idea',
            'Che triste oggi piove.. ',
            'Era tanto che non ci sentivamo',
            'Io sto bene, e tu come stai?',
            'Oggi vado al mare, vieni con me?'
        ];

        function rispostaAutomatica(){
            var frase =numeriRandom(1, risposta.length - 1);
            var sms = risposta[frase];
            var clone2 = $('.template .message').clone();
            clone2.addClass('received');
            clone2.find('.message-text').append(sms);
            var time = data();
            clone2.find('.message-time').append(time);
            $('.chat.active').append(clone2);


        }
    // ***** funzioni ***** //

    function numeriRandom(min,max){
        return Math.floor(Math.random()*(max - min + 1) + min);
    }
    // fz ottenere ora nelle chat
    function data(){
    var d = new Date();
    var ora = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    return ora+ ':'+m;
    }

    // aggiungo lo zero all'ora
    function addZero(numero){
    if(numero<10){
        return '0' +numero;
    }
    return numero;
    }

});
