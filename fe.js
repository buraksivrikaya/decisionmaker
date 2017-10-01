$(document).ready(function(){

	var buttons = $(".btn");
	var optionCount = 0;
	$('#optionCount').html(optionCount);
    var options = []; // [{}]
	var randomArray = [];
	$.each(buttons, function(b){
		if(!$(buttons[b]).hasClass('input-group-addon')){
			$(buttons[b]).css('color', 'white');
		}
		else{
			$(buttons[b]).hover(function(){
				$(buttons[b]).css('color', 'white');
			}, function(){
				$(buttons[b]).css('color', 'black');
			});
		}
		$(buttons[b]).css('cursor', 'pointer');
	});

	$('#pEffectButton').on('click', function(){
		var effectValue = $('#effectValue').html();
		if( effectValue < 3){
			effectValue++;
			$('#effectValue').html(effectValue);
		}
	});

	$('#nEffectButton').on('click', function(){
		var effectValue = $('#effectValue').html();
		if( effectValue > 0){
			effectValue--;
			$('#effectValue').html(effectValue);
		}
	});

	$('#decisionAddButton').on('click', function(){
		var optionX;
		var effectX = $('#effectValue').html();

		if($('#msg').val()){
			optionX = $('#msg').val();
			$('#msg').attr('placeholder', 'One of target decisions');
			var nameOfButton = 'optionRemoveButton' + optionCount;
			var itemX = '<div class="row">\
				<div class="col-1 text-right"><a id="' + nameOfButton + '" style="color:#992424"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div>\
				<div class="col-9 optionsName">' + optionX + '</div>\
				<div class="col-2 text-right">' + effectX + '</div>\
			</div>';

			var foundFlag = false;
			$.each(options, function(c){
				if(options[c][0] == optionX){foundFlag = true; return false;
				}
			});
			if(!foundFlag){
				options.push([optionX,effectX]);
				$('#optionsList').append(itemX);
				$('#optionCount').html(optionCount++ + 1);
			}
			

			$.when($('#'+ nameOfButton).length > 0).then(function(){
				$('#'+ nameOfButton).css('cursor', 'pointer');
				$('#'+ nameOfButton).on('click', function(e){
					$(this).closest('.row').remove();
					$('#optionCount').html(optionCount-- - 1);
					var deletedItemName = $($(this).closest('.row').children('.optionsName')[0]).html();
					options.pop(deletedItemName);
				});
			});
		}
		else{
			$('#msg').attr('placeholder', 'Can not be empty');
		}
	});

	$('#decisionMakeButton').on('click', function(){
		if($('#optionsList .row').length > 1){
			$.each(options, function(t){
				if(options[t][1] == 0){//10 times
					putInArray(options[t][0], 10, randomArray);
				}
				else if(options[t][1] == 1){//50 times
					putInArray(options[t][0], 50, randomArray);
				}
				else if(options[t][1] == 2){//90 times
					putInArray(options[t][0], 90, randomArray);
				}
				else{//130 times
					putInArray(options[t][0], 130, randomArray);
				}
			})
			alert(randomArray[randomIntFromInterval(0,randomArray.length)] + ' is selected');
		}
		else{
		}
	});


	function randomIntFromInterval(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	
	function putInArray(element, times, array){
		for(var i=0; i < times; i++){
			array.push(element);
		}
	}
});
