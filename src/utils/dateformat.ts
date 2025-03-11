// Function to format the createdAt timestamp
export const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);

    // Format options
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Use 12-hour format (AM/PM)
    };

    return date.toLocaleString('en-US', options); // Format as "March 9, 2025, 6:19 AM"
  };