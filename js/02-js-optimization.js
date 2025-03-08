const HEARING_MINUTES = 30;

/**
 * The time for the people before defendant to be heard, added to the defendant's
 * own hearing time, eg 'How long will it take for [defendant's] hearing to end?'
 *
 * @param {string} defendant first name
 * @param {number} numberJudges all available judges, assumed free
 * @param {string} otherDefendants string of first names separated by spaces
 * @returns {?number} minutes, or null if defendant not found
 *
 * @example
 * // returns 60
 * court('Jules', 3, 'Adam Betty Frank Mike');
 * @example
 * // returns 150
 * court('Zane', 1, 'Mark Hank Ana Vivian');
 * @example
 * // returns 60
 * court('Abraxas', 1, 'Aaron Alexis Aphasia Aloysius');
 * @example
 * // returns 60
 * court('Mickey', 2, 'Bobby Phil Jerry Billy');
 */
function court(defendant, numberJudges, otherDefendants) {
	// Convert to array and find defendant's place in line
	const defendantIndex = [...otherDefendants.split(' '), defendant].sort().indexOf(defendant);

	// defendant's not here to be found
	if (defendantIndex === -1) return null;

	// get the batch number by dividing (1-based) place by judges, round if you have to, then multiply time
	// ex. 4th/3 = 1.333 => batch 2; 5th/1 = 1 => batch 5
	return Math.ceil((defendantIndex + 1) / numberJudges) * HEARING_MINUTES;
}

/**
 * @param {SubmitEvent} e
 * @returns {void}
 */
function handleSubmit(e) {
	e.preventDefault();

	const formData = new FormData(e.target);

	// in a non-demo context we would be validating/sanitizing all this
	const defendant = formData.get('defendant').trim();
	const numberJudges = formData.get('numberJudges');
	const otherDefendants = formData.get('otherDefendants'); // trimmed via pattern enforcement

	const start = performance.now();
	const minutes = court(defendant, numberJudges, otherDefendants);
	const end = performance.now();

	const message = minutes
		? `${defendant}'s hearing concludes in ${minutes} minutes. Good luck!`
		: 'Defendant not found!';
	document.querySelector('#court-result').textContent = message;

	console.log(`court() execution time: ${end - start} ms`);
}

document.forms.court.addEventListener('submit', handleSubmit);
