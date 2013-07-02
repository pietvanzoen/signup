$(function() {
	
	$('button[data-loading-text]').click(function () {
	    $(this).button('loading');
	});


	$.event.trigger({
		type:    'pledgeUpdate',
		message: 'pledge updated',
		time:    new Date()
	});

	var getVals = function(row){
		return {
			need: pi(row.attr('data-need')),
			pledged: pi(row.attr('data-pledged')),
			userpledge: pi(row.attr('data-userpledge'))
		}
	}

	function pi(val) {
		return parseInt(val, 10);
	}

	var $row = $('#pledge-form tr');

	$row.each(function(index) {
		
		// elements
		var $this = $(this),
			$input = $('.pledge_input', this),
			$pledgedProg = $('.pledged_progress', this),
			$userProg = $('.user_progress', this),
			$buttonPlus = $('.pledge_plus', this),
			$buttonMinus = $('.pledge_minus', this),
			$rowPledge = $('.row_pledge', this),
			$rowTotal = $('.row_total', this);

		// numbers
		var vals = getVals($this),
			min = 0,
			max = vals.need-vals.pledged;

		function updatePledge(change) {
			var oldval = $this.attr('data-userpledge');
			$this.attr('data-userpledge', pi(oldval)+pi(change)).trigger('change');
		}

		function updateInput(userpledge) {
			$input.val(userpledge);
		}

		function updateProgress(userpledge, need) {
			var percentage = (userpledge/need)*100;
			$userProg.css('width', percentage+'%');
			if (userpledge != 0) {
				$userProg.text(userpledge);
			} else {
				$userProg.text('');
			};
			$rowPledge.text(vals.pledged+userpledge);
		}

		function updateButtons(userpledge) {
			if (userpledge === min) {
				$buttonMinus.addClass('disabled');
			} else {
				$buttonMinus.removeClass('disabled');
			};
			if (userpledge === max) {
				$buttonPlus.addClass('disabled');
			} else {
				$buttonPlus.removeClass('disabled');
			};
		}

		$this.on('change', function(event) {
			var newVals = getVals($this);
			console.log('change', newVals);
			updateInput(newVals.userpledge);
			updateProgress(newVals.userpledge, newVals.need);
			updateButtons(newVals.userpledge);
			vals = newVals;
		});

		$buttonPlus.on('click', function(event) {
			event.preventDefault();
			if (vals.userpledge == max) return false;
			updatePledge(+1);
			console.log(vals.userpledge);
		});

		$buttonMinus.on('click', function(event) {
			event.preventDefault();
			if (vals.userpledge == min) return false;
			updatePledge(-1);
		});

	});


	// var $row = $('#pledge-form tr');

	// var percentage = function(change, total) {

	// }

	// $row.each(function(index) {
	// 	var $this = $(this),
	// 		rowNeed = $this.attr('data-need'),
	// 		rowPledged = $this.attr('data-pledged'),
	// 		numInput = '.pledge_number',
	// 		$numInput = $(numInput, this),
	// 		numSub = '.pledge_subtract',
	// 		$numSub = $(numSub, this),
	// 		numAdd = '.pledge_add',
	// 		$numAdd = $(numAdd, this),
	// 		barSuccess = '.bar-success',
	// 		$barSuccess = $(barSuccess, this);

	// 	var getNum = function(){
	// 		return {
	// 			val: pi($numInput.val()),
	// 			min: pi($numInput.attr('min')),
	// 			max: pi($numInput.attr('max'))
	// 		}
	// 	}

	// 	var changeNum = function(change) {
	// 		var num = getNum();
	// 		if (num.val == num.min && change < 0) return false;
	// 		if (num.val == num.max && change > 0) return false;
	// 		var newval = num.val+pi(change);
	// 		$numInput.val(newval).trigger('change');
	// 	};

	// 	var updateRowProgress = function(change) {
	// 		$numInput.on('change', function(event) {
	// 			var num = getNum();

	// 		});
	// 	}

	// 	$numInput.on('change', function(event) {
	// 		console.log('change');
	// 		event.preventDefault();
	// 		var num = getNum();
	// 		console.log(num.val, num.min, num.max);
	// 		if (num.val > num.min) {
	// 			$numSub.removeClass('disabled');
	// 		} else {
	// 			$numSub.addClass('disabled');
	// 		};
	// 		if (num.val < num.max) {
	// 			$numAdd.removeClass('disabled');
	// 		} else {
	// 			$numAdd.addClass('disabled');
	// 		};
	// 	});

	// 	$numAdd.on('click', function(event) {
	// 		event.preventDefault();
	// 		changeNum(+1);
	// 	});

	// 	$numSub.on('click', function(event) {
	// 		event.preventDefault();
	// 		changeNum(-1);
	// 	});


	// });


});
