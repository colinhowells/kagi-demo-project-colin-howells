const HEARING_MINUTES = 30;

/**
 * The time for the people before defendant to be heard, added to the defendant's own hearing time, eg 'How long will it take for your hearing to end?'
 *
 * Typical execution times:
 * 0.10000002384185791ms
 * 0.10000002384185791ms
 * 0.09999990463256836ms
 *
 * @param {string} defendant first name
 * @param {number} numberJudges all available judges, assumed free
 * @param {string} otherDefendants string of first names separated by spaces
 * @returns {number} minutes
 * @example
 * court('Jules', 3, 'Adam Betty Frank Mike'); => 60
 * court('Zane', 1, 'Mark Hank Ana Vivian'); => 150
 * court('Abraxas', 1, 'Aaron Alexis Aphasia Aloysius'); => 60
 * court('Mickey', 2, 'Bobby Phil Jerry Billy'); => 30
 */
function court(defendant, numberJudges, otherDefendants) {
	const defendantsAlphabetized = [defendant, ...otherDefendants.split(' ')].sort();

	const numberOthersBeforeBefendant = defendantsAlphabetized.slice(
		0, // beginning, natch
		defendantsAlphabetized.findIndex((p) => defendant === p) // index of defendant
	).length;

	// there is a judge immediately available for the defendant
	if (numberJudges > numberOthersBeforeBefendant) return HEARING_MINUTES;

	// the defendant is the first person to be heard after the others
	const beforeDefendantMinutes = (numberOthersBeforeBefendant / numberJudges) * HEARING_MINUTES;
	return beforeDefendantMinutes + HEARING_MINUTES;
}

/**
 * @param {SubmitEvent} e
 * @returns {void}
 */
function handleSubmit(e) {
	e.preventDefault();
	const start = performance.now();

	const formData = new FormData(e.target);
	// in a non-demo context we would be validating/sanitizing all this
	const defendant = formData.get('defendant').trim();
	const numberJudges = formData.get('numberJudges');
	const otherDefendants = formData.get('otherDefendants'); // trimmed via pattern enforcement

	const hearingConclusionTimeMinutes = court(defendant, numberJudges, otherDefendants);

	document.querySelector(
		'#court-result'
	).textContent = `${defendant}'s hearing will be over in ${hearingConclusionTimeMinutes} minutes.`;

	const end = performance.now();
	console.log(`court() execution time: ${(end - start).toFixed(4)} ms`);
}

document.forms.court.addEventListener('submit', handleSubmit);
