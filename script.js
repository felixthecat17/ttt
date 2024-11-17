(function( $ ){

	playerTurn = 1;
	playerMoves = {
		1: [],
		2: []
	};
	combinations = [
		[1,2,3],
		[4,5,6],
		[7,8,9],

		[1,4,7],
		[2,5,8],
		[3,6,9],

		[1,5,9],
		[3,5,7],

	];
	$(document).ready(function() {

		$('.game-container button').click(function() {
			if ( $(this).hasClass('clicked') ) 
				return false;

			$(this).addClass( 'p-'+playerTurn );
			$(this).addClass( 'clicked' );
			thisMove = $(this).data('num');
			playerMoves[playerTurn].push( thisMove );
			
			if ( playerWin( playerTurn ) ) {
				Swal.fire({
					title: "Winner!",
					text: 'Player '+playerTurn+' wins! ',
					icon: 'success'
				}).then(() => {
					location.reload();
				});
			} else if ( $('.game-container button:not(.clicked)').length == 0 ) {
				Swal.fire({
					title: "Boooo!",
					text: 'Nobody wins!',
					icon: 'warning'
				}).then(() => {
					location.reload();
				});
			}
 
			if ( playerTurn == 1 ) {
				playerTurn = 2;
			} else {
				playerTurn = 1;
			}
		});

		function playerWin(p) {

			for ( i = 0; i < combinations.length; i++ ) {
				combination = 0;
				combinations[i].forEach(function(a, b) {
					if ( $.inArray( a, playerMoves[p] ) > -1 ) {
						combination++;
					}
				});
				if ( combination == 3 ) {
					return true;
				}
			}
			return false;

		}
	});

})( jQuery )