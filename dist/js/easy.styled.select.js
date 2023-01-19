/**
 * easyStyledSelect plugin
 * for magic transformation of a standard select element
 */
(function ($) {

    $.fn.easyStyledSelect = function (options) {

        let defaults = {
            selectMinWith: null,
            optionsMinWith: null,
            onInit: function () {
            },
            onOpen: function () {
            },
            onSelect: function () {
            },
        };

        let settings = $.extend(true, {}, defaults, options);

        settings.onInit.call();


        return this.each(function () {

            let select = $(this),
                numberOfOptions = $(this).children('option').length;

            select.unwrap();
            select.addClass('select-hidden');
            select.wrap('<div class="select"></div>');
            select.after('<div class="select-styled"></div>');

            let styledSelect = select.next('div.select-styled');
            styledSelect.text(select.find('option:selected').text());
            //styledSelect.text(select.children('option').eq(0).text());

            let list = $('<ul />', {
                'class': 'select-options'
            }).insertAfter(styledSelect);

            for (let i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: select.children('option').eq(i).text(),
                    rel: select.children('option').eq(i).val()
                }).appendTo(list);

                // if (select.children('option').eq(i).is(':selected')) {
                //     $('li[rel="' + select.children('option').eq(i).val() + '"]').addClass('is-selected')
                // }
            }

            let listItems = list.children('li');

            styledSelect.click(function (e) {
                e.stopPropagation();
                $('div.select-styled.active').not(this).each(function () {
                    $(this).removeClass('active').next('ul.select-options').hide();
                });
                $(this).toggleClass('active').next('ul.select-options').toggle();
                if (styledSelect.hasClass('active')) {
                    settings.onOpen.call();
                }
            });

            listItems.click(function (e) {
                e.stopPropagation();
                styledSelect.text($(this).text()).removeClass('active');
                select.val($(this).attr('rel'));
                list.hide();
                settings.onSelect.call();
            });

            $(document).on('click', function () {
                styledSelect.removeClass('active');
                list.hide();
            });


            $('.select').css({
                minWidth: settings.selectMinWith
            });
            $('.select-options').css({
                minWidth: settings.optionsMinWith
            });


        });

    };

}(jQuery));
