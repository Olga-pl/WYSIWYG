'use strict';

(function($){
    $.fn.my_wysiwyg = function(options){
        
        var settings = $.extend({
            buttons : ['bold', 'italic', 'color'],
            largeur : '500px',
            hauteur : '500px',
            border : '1px solid grey',
            bg_color : 'white',
        }, options);
        
        $('body').prepend('<div id="container">');
        $('body').prepend('<div id="toolbar">');
        $('body').prepend('<h1>');
        $('body').css({'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'font-family': 'Lucida Console, Monaco, monospace'});
        $('#textarea').css('display', 'none');
        $('h1').text('My WYSIWYG Editor');
        $('h1').css({'text-align': 'center', 'color': 'grey'});
        $('#toolbar').css({'margin': '10px', 'display': 'flex','align-items': 'center'});
        $('#container').attr('contenteditable', 'true');
        $('#container').css({'width': settings.largeur, 'height': settings.hauteur, 'border': settings.border, 'background-color': settings.bg_color, 'border-radius': '4px'});
        document.execCommand('defaultParagraphSeparator', false, 'p');
        
        if($.inArray('bold', settings.buttons) != -1){
            $('#toolbar').append('<button id="bold">');
            $('#bold').text('B');
            $('#bold').css('font-weight', 'bold');
            $('#bold').click(function(e){
                e.preventDefault();
                document.execCommand('bold', false, null);
            });
        };
        if($.inArray('italic', settings.buttons) != -1){
            $('#toolbar').append('<button id="italic">');
            $('#italic').text('I');
            $('#italic').css('font-style', 'italic');
            $('#italic').click(function(e){
                e.preventDefault();
                document.execCommand('italic', false, null);
            });
        };
        if($.inArray('color', settings.buttons) != -1){
            $('#toolbar').append('<input id="color">');
            $('#color').attr('type', 'color');
            $('#color').attr('title', 'Modifier la couleur du texte');
            $('#color').click(function(){
                $('#color').change(function(){
                    let color = $('#color').val().toString();
                    document.execCommand('foreColor', false, color);
                });
            });
        };
        if($.inArray('underline', settings.buttons) != -1){
            $('#toolbar').append('<button id="underline">');
            $('#underline').text('U');
            $('#underline').css('text-decoration', 'underline');
            $('#underline').attr('title', 'Souligner');
            $('#underline').click(function(e){
                e.preventDefault();
                document.execCommand('underline', false, null);
            }); 
        };
        if($.inArray('barre', settings.buttons) != -1){
            $('#toolbar').append('<button id="strikethrough">');
            $('#strikethrough').text('S');
            $('#strikethrough').css('text-decoration', 'line-through');
            $('#strikethrough').attr('title', 'Barrer');
            $('#strikethrough').click(function(e){
                e.preventDefault();
                document.execCommand('strikeThrough', false, null);
            });
        };
        if($.inArray('fontsize', settings.buttons) != -1){
            $('#toolbar').append('<select id="fontsize">');
            for(let i = 1; i <= 8; i++){
                $('#fontsize').append('<option>');
            };
            $.each($("#fontsize option"), function(i){
                $(this).attr('value', i);
                $(this).text(i);
                if($(this).attr('value') == 0){
                    $(this).text('Taille police');
                }
            });
            $('#fontsize').attr('title', 'Taille police');
            $('#fontsize').click(function(e){
                e.preventDefault();
                let size = $('#fontsize').val();
                document.execCommand('fontSize', false, size);
            });
        };
        if($.inArray('align-left', settings.buttons) != -1){
            $('#toolbar').append('<button id="left">');
            $('#left').text('≔');
            $('#left').attr('title', 'Aligner à gauche');
            $('#left').click(function(e){
                e.preventDefault();
                document.execCommand('justifyLeft', false, null);
            });
        };
        if($.inArray('align-center', settings.buttons) != -1){
            $('#toolbar').append('<button id="center">');
            $('#center').text('≐');
            $('#center').attr('title', 'Aligner au centre');
            $('#center').click(function(e){
                e.preventDefault();
                document.execCommand('justifyCenter', false, null);
            });
        };
        if($.inArray('align-right', settings.buttons) != -1){
            $('#toolbar').append('<button id="right">');
            $('#right').text('≕');
            $('#right').attr('title', 'Aligner à droite');
            $('#right').click(function(e){
                e.preventDefault();
                document.execCommand('justifyRight', false, null);
            });
        };
        if($.inArray('align-justify', settings.buttons) != -1){
            $('#toolbar').append('<button id="full">');
            $('#full').text('≑');
            $('#full').attr('title', 'Alignement Justifié');
            $('#full').click(function(e){
                e.preventDefault();
                document.execCommand('justifyFull', false, null);
            });
        };
        if($.inArray('link', settings.buttons) != -1){
            $('#toolbar').append('<button id="link">');
            $('#link').text('⚯');
            $('#link').attr('title', 'Lien');
            $('#link').click(function(e){
                e.preventDefault();
                let url = prompt('Indiquez votre URL');
                document.execCommand('createLink', false, url);
            });
        };
        if($.inArray('unlink', settings.buttons) != -1){
            $('#toolbar').append('<button id="unlink">');
            $('#unlink').text('⊄');
            $('#unlink').attr('title', 'Enlever le lien');
            $('#unlink').click(function(e){
                e.preventDefault();
                document.execCommand('unLink', false, null);
            });
        };
        if($.inArray('html', settings.buttons) != -1){
            $('#toolbar').append('<button id="html">');
            $('#html').text('</>');
            $('#html').attr('title', 'Switcher vers HTML');
            let count = 0;
            $('#html').click(function(e){
                e.preventDefault();
                count += 1;
                if(count%2 == 1){
                    $('#container').text($('#container').html());
                };
                if(count%2 == 0){
                    $('#container').html($('#container').text());
                };
            });
        };
        if($.inArray('indent', settings.buttons) != -1){
            $('#toolbar').append('<button id="indent">');
            $('#indent').text('⥤');
            $('#indent').attr('title', 'Augmenter le trait');
            $('#indent').click(function(e){
                e.preventDefault();
                document.execCommand('indent', false, null);
            });
        };
        if($.inArray('outdent', settings.buttons) != -1){
            $('#toolbar').append('<button id="outdent">');
            $('#outdent').text('⥢');
            $('#outdent').attr('title', 'Diminuer le trait');
            $('#outdent').click(function(e){
                e.preventDefault();
                document.execCommand('outdent', false, null);
            });
        };
        $('button, select, input').css({'margin': '2px', 'padding': '6px', 'background-color': 'transparent', 'border': '1px solid grey', 'border-radius': '4px'});
        $('input').css({'padding': '2px'});
        $('select').css({'padding': '5px'});
        $("button, select, input").mouseover(function(){
            $(this).css("background-color", "#d6d6d6");
        });
        $("button, select, input").mouseout(function(){
            $(this).css("background-color", "transparent");
        });
    };
}(jQuery));