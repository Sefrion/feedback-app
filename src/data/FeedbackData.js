import { v4 as uuidv4 } from 'uuid';

const FeedbackData = [
	{
		id: uuidv4(),
		rating: 10,
		text: 'This is a feedback item 1',
	},
	{
		id: uuidv4(),
		rating: 8,
		text: 'This is a feedback item 2',
	},
	{
		id: uuidv4(),
		rating: 9,
		text: 'This is a feedback item 3',
	},
];

export default FeedbackData;
