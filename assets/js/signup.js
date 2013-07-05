$(function() {
    // custom trigger
    $.event.trigger({type: "rowUpdate"});

    /* ==========================================================================
        AJAXING
    ============================================================================= */

    $.ajax({
        url: '/json/event.json',
        type: 'GET',
        dataType: 'json',

        success: function(data) {
            // data, textStatus, xhr
            initTable(data, 'event');
        },

        complete: function() {
            // xhr, textStatus
            initUI();
        },

        error: function() {
            // xhr, textStatus, errorThrown
            // console.log('error:', textStatus, errorThrown);
        }

    });


    /* ==========================================================================
        BUILD SCRIPTS
    ============================================================================= */

    // table element
    var $tbody = $('#signupTable');

    /** Table builder
    ---------------------------------------- **/
    function initTable(data, type) {
        $.each(data.items, function(index, val) {
            buildRow(index, val, type);
        });
    }

    // row <td> templates
    var $nameTemplate = $('<td style="width:35%"> <div> <span class="row_name">Name</span> <br><small class="muted row_description">Description</small> </div> </td>');
    var $progressTemplate = $('<td style="width:33%"> <div class="text-center"><small class="muted"><span class="row_pledge">0</span> of <span class="row_total">0</span> needed</small></div> <div class="progress"> <div class="bar pledged_progress" style="width: 0"></div> <div class="bar bar-success user_progress" style="width:0"></div> </div> </td>');
    var $eventUiTemplate = $('<td style="width:32%"> <div class="text-center"> <input class="pledge_input" type="hidden" value="0" name=""> <button class="pledge_minus btn disabled">-</button> <button class="pledge_plus btn">+</button> </div> </td>');
    var $scheduleUiTemplate = $('<td style="width:32%"> <div class="text-center"> <input class="pledge_input" type="hidden" value="0" name=""> <button class="pledge_minus btn disabled">-</button> <button class="pledge_plus btn">+</button> </div> </td>');

    /** Row builder
    ---------------------------------------- **/
    function buildRow(name, data, type) {
        var id = name.replace(/\s+/g, '-').toLowerCase();
        var $tr = $('<tr/>').attr({
                'id': id,
                'data-need': data.need,
                'data-pledged': data.pledged,
                'data-userpledge': '0'
            });
        var $name = $nameTemplate.clone();
        $name.find('.row_name').text(name);
        $name.find('.row_description').text(data.description);
        $tr.append($name);
        $tr.append($progressTemplate.clone());
        if (type==='schedule') {
            $tr.append($scheduleUiTemplate.clone());
        }
        if (type==='event') {
            var $ui = $eventUiTemplate.clone();
            $ui.find('.pledge_input').attr('name', id);
            $tr.append($ui);
        }
        $tbody.append($tr).trigger('rowUpdate');
    }


    /* ==========================================================================
        UI SCRIPTS
    ============================================================================= */

    /** UI Initiation
    ---------------------------------------- **/
    function initUI() {
        var $rows = $('#signupTable tr');
        updateMasterProgress($rows);
        updateRows($rows);
        $rows.trigger('rowUpdate');
    }

    /** Get row values helper function **/
    var getVals = function(row){
        return {
            need: pi(row.attr('data-need')),
            pledged: pi(row.attr('data-pledged')),
            userpledge: pi(row.attr('data-userpledge'))
        };
    };

    /** ParseInt helper function **/
    function pi(val) {
        return parseInt(val, 10);
    }

    /** Update master prgress bar
    ---------------------------------------- **/
    function updateMasterProgress(rows){
        var $rows = rows;
        // set master progress on change and on load
        var totaluserpledge = 0,
            totalpledged = 0,
            totalneed = 0;
        $rows.on('rowUpdate', function() {
            totaluserpledge = 0;
            totalpledged = 0;
            totalneed = 0;
            $rows.each(function() {
                totaluserpledge = totaluserpledge + pi($(this).attr('data-userpledge'));
                totalpledged = totalpledged + pi($(this).attr('data-pledged'));
                totalneed = totalneed + pi($(this).attr('data-need'));
            });
            $('#master_pledged').width((totalpledged/totalneed)*100+'%');
            $('#master_userpledge').width((totaluserpledge/totalneed)*100+'%');
            if (totaluserpledge!==0) {
                $('#master_userpledge').text(totaluserpledge);
            } else {
                $('#master_userpledge').text('');
            }
            $('.total_pledged').text(totalpledged+totaluserpledge);
            $('.total_need').text(totalneed);
            $('.total_userpledged').text(totaluserpledge);
        });
    }

    /** Row user interactions, visual updates and form updating
    ---------------------------------------- **/
    function updateRows(rows){
        var $rows = rows;
        $rows.each(function() {
            
            /** elements variables **/
            var $this = $(this),
                $input = $('.pledge_input', this),
                $pledgedProg = $('.pledged_progress', this),
                $userProg = $('.user_progress', this),
                $buttonPlus = $('.pledge_plus', this),
                $buttonMinus = $('.pledge_minus', this),
                $rowPledge = $('.row_pledge', this),
                $rowTotal = $('.row_total', this);

            /** Get row values and set min/max **/
            var vals = getVals($this),
                min = 0,
                max = vals.need-vals.pledged;

            /** Set row 'data-userpledge' attribute on rowUpdate **/
            function updatePledge(change) {
                var oldval = $this.attr('data-userpledge');
                $this.attr('data-userpledge', pi(oldval)+pi(change)).trigger('rowUpdate');
            }

            /** Update row input value **/
            function updateInput(userpledge) {
                $input.val(userpledge);
            }

            /** Update row progress bar and text progress info **/
            function updateProgress(userpledge, pledged, need) {
                $pledgedProg.width((pledged/need)*100+'%');
                $userProg.width((userpledge/need)*100+'%');
                if (userpledge !== 0) {
                    $userProg.text(userpledge);
                } else {
                    $userProg.text('');
                }
                $rowPledge.text(pledged+userpledge);
                $rowTotal.text(need);
            }

            /** Enable/disable buttons as min or max value is reached  **/
            function updateButtons(userpledge) {
                if (userpledge === min) {
                    $buttonMinus.addClass('disabled');
                } else {
                    $buttonMinus.removeClass('disabled');
                }
                if (userpledge === max) {
                    $buttonPlus.addClass('disabled');
                } else {
                    $buttonPlus.removeClass('disabled');
                }
            }

            /** Lights, camera, ACTION! **/
            $this.on('rowUpdate', function() {
                var newVals = getVals($this);
                // console.log('change', newVals);
                updateInput(newVals.userpledge);
                updateProgress(newVals.userpledge, newVals.pledged, newVals.need);
                updateButtons(newVals.userpledge);
                vals = newVals;
            }).trigger('rowUpdate');

            $buttonPlus.on('click', function(event) {
                // console.log(event);
                event.preventDefault();
                if (vals.userpledge !== max) {
                    updatePledge(+1);
                }
                // console.log(vals.userpledge);
            });

            $buttonMinus.on('click', function(event) {
                event.preventDefault();
                if (vals.userpledge !== min) {
                    updatePledge(-1);
                }
                // console.log(event);
            });

        });
    }

});
