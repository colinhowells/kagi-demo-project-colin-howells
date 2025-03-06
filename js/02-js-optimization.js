const HEARING_MINUTES = 30;

/**
 * The time for the people before plaintiff to be heard, added to the plaintiff's own hearing time, eg 'How long will it take for your hearing to end?'
 *
 * Typical execution times:
 * 0.10000002384185791ms
 * 0.10000002384185791ms
 * 0.09999990463256836ms
 *
 * @param {string} plaintiff first name
 * @param {number} numberJudges all available judges, assumed free
 * @param {string} otherPlaintiffs string of first names separated by spaces
 * @returns {number} minutes
 * @example
 * court('Jules', 3, 'Adam Betty Frank Mike'); => 60
 * court('Zane', 1, 'Mark Hank Ana Vivian'); => 150
 * court('Abraxas', 1, 'Aaron Alexis Aphasia Aloysius'); => 60
 * court('Mickey', 2, 'Bobby Phil Jerry Billy'); => 30
 */
function court(plaintiff, numberJudges, otherPlaintiffs) {
	const plaintiffsAlphabetized = [plaintiff, ...otherPlaintiffs.split(' ')].sort();

	const numberOthersBeforePlaintiff = plaintiffsAlphabetized.slice(
		0, // beginning, natch
		plaintiffsAlphabetized.findIndex((p) => plaintiff === p) // index of plaintiff
	).length;

	// there is a judge immediately available for the plaintiff
	if (numberJudges > numberOthersBeforePlaintiff) return HEARING_MINUTES;

	// the plaintiff is the first person to be heard after the others
	const beforePlaintiffMinutes = (numberOthersBeforePlaintiff / numberJudges) * HEARING_MINUTES;
	return beforePlaintiffMinutes + HEARING_MINUTES;
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
	const plaintiff = formData.get('plaintiff').trim();
	const numberJudges = formData.get('numberJudges');
	const otherPlaintiffs = formData.get('otherPlaintiffs'); // trimmed via pattern enforcement

	const hearingConclusionTimeMinutes = court(plaintiff, numberJudges, otherPlaintiffs);

	document.querySelector(
		'#court-result'
	).textContent = `${plaintiff}'s hearing will be over in ${hearingConclusionTimeMinutes} minutes.`;

	const end = performance.now();
	console.log(`court() execution time: ${(end - start).toFixed(4)} ms`);
}

document.forms.court.addEventListener('submit', handleSubmit);
