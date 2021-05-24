import Exam from '../models/Exam';
import { fileNameFormatter } from '../utils/functions';

class ExamView {
	examDetails(exam: Exam) {
		return {
			...exam,
			path: fileNameFormatter(exam.path),
		};
	}
}

export default ExamView;
