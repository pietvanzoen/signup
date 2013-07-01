$(function() {
	
	$('button[data-loading-text]').click(function () {
	    $(this).button('loading');
	});

	var $row = $('#pledge-form tr');

	$row.each(function(index) {
		var numInput = '.pledge_number',
			$numInput = $(numInput, this),
			numSub = '.pledge_subtract',
			$numSub = $(numSub, this),
			numAdd = '.pledge_add',
			$numAdd = $(numAdd, this);

		var getNum = function(){
			return {
				val: parseInt($numInput.val()),
				min: parseInt($numInput.attr('min')),
				max: parseInt($numInput.attr('max'))
			}
		}

		var changeNum = function(change) {
			var num = getNum();
			if (num.val == num.min && change < 0) return false;
			if (num.val == num.max && change > 0) return false;
			var newval = num.val+parseInt(change);
			$numInput.val(newval).trigger('change');
		};

		$numInput.on('change', function(event) {
			console.log('change');
			event.preventDefault();
			var num = getNum();
			console.log(num.val, num.min, num.max);
			if (num.val > num.min) {
				$numSub.removeClass('disabled');
			} else {
				$numSub.addClass('disabled');
			};
			if (num.val < num.max) {
				$numAdd.removeClass('disabled');
			} else {
				$numAdd.addClass('disabled');
			};
		});

		$numAdd.on('click', function(event) {
			event.preventDefault();
			changeNum(+1);
		});

		$numSub.on('click', function(event) {
			event.preventDefault();
			changeNum(-1);
		});


	});


});
