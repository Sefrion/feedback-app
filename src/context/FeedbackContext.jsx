import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [feedback, setFeedback] = useState([]);
	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	});

	useEffect(() => {
		fetchFeedback();
	}, []);

	// Fetch feedback
	const fetchFeedback = async () => {
		const response = await fetch(
			'http://localhost:5000/feedback?_sort=id&_order=desc'
		);
		const data = await response.json();

		setFeedback(data);

		setIsLoading(false);
	};

	// Add Feedback
	const addFeedback = async (newFeedback) => {
		const response = await fetch('http://localhost:5000/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newFeedback),
		});

		const data = await response.json();

		setFeedback([data, ...feedback]);
	};

	// Delete feedback
	const deleteFeedback = async (id) => {
		if (window.confirm('Are you sure you want to delete?')) {
			await fetch(`http://localhost:5000/feedback/${id}`, { method: 'DELETE' });

			setFeedback(feedback.filter((item) => item.id !== id));
		}
	};

	// Set feedback to edit mode
	const editFeedback = (item) => {
		setFeedbackEdit({
			item,
			edit: true,
		});
	};

	// Updated feedback
	const updateFeedback = async (id, updItem) => {
		const response = await fetch(`http://localhost:5000/feedback/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updItem),
		});

		const data = await response.json();

		setFeedback(
			feedback.map((item) => {
				item.id === id ? { ...item, ...data } : item;
			})
		);
	};

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				feedbackEdit,
				isLoading,
				deleteFeedback,
				addFeedback,
				editFeedback,
				updateFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

FeedbackProvider.propTypes = {
	children: PropTypes.node,
};

export default FeedbackContext;
