import { addMinutes } from 'date-fns';

// Helper function to check for overlapping time ranges
export const checkTimeOverlap = (
  sessionArray: { start_time: string; end_time: string }[]
) => {
  const overlappingIndexes: Array<Array<number>> = [];

  for (let i = 0; i < sessionArray.length; i++) {
    for (let j = i + 1; j < sessionArray.length; j++) {
      if (
        sessionArray?.[i]?.start_time &&
        sessionArray?.[i]?.end_time &&
        sessionArray?.[j]?.start_time &&
        sessionArray?.[j]?.end_time
      ) {
        const start1 = convertToTimeOnly(sessionArray[i].start_time);
        const end1 = convertToTimeOnly(sessionArray[i].end_time);
        const start2 = convertToTimeOnly(sessionArray[j].start_time);
        const end2 = convertToTimeOnly(sessionArray[j].end_time);

        // Check for overlap between time range i and j
        if (
          start1 < end2 && // slot1's start time is before slot2's end time
          start2 < end1 // slot2's start time is before slot1's end time
        ) {
          overlappingIndexes.push([i, j]);
        }
      }
    }
  }
  return overlappingIndexes;
};

// Function to convert date to only time (ignores the date part)
const convertToTimeOnly = (dateString: string) => {
  const date = new Date(dateString);
  return date.getHours() * 60 + date.getMinutes(); // Return time in minutes (for easy comparison)
};

export const generateTimeSlots = (start: Date, end: Date, interval = 15) => {
  const slots = [];
  let currentTime = start;
  // Flag to track if end time is already added
  let endTimeAdded = false;
  // Generate slots until the last slot before the end
  while (currentTime < end) {
    slots.push(new Date(currentTime)); // Push a new date object to avoid reference issues
    currentTime = addMinutes(currentTime, interval);
  }
  // Add the end time if it's exactly on an interval or if currentTime has passed the end time
  if (!endTimeAdded && currentTime >= end) {
    slots.push(new Date(end)); // Add the exact end time
    endTimeAdded = true;
  }
  return slots;
};
