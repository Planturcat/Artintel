/**
 * Utility functions for formatting dates, numbers, and text with internationalization support
 */

/**
 * Format a date based on the current language/locale
 * @param date Date to format
 * @param options Intl.DateTimeFormatOptions to customize the format
 * @param language ISO language code (e.g., 'en', 'es')
 * @returns Formatted date string 
 */
export const formatDate = (
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  },
  language: string = 'en'
): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(language, options).format(dateObj);
};

/**
 * Format a relative time (e.g., "2 hours ago")
 * @param date Date to format relative to now
 * @param language ISO language code
 * @returns Formatted relative time string
 */
export const formatRelativeTime = (
  date: Date | string | number,
  language: string = 'en'
): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  // Units in seconds
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;
  
  // Get the appropriate unit and value
  let value: number;
  let unit: Intl.RelativeTimeFormatUnit;
  
  if (diffInSeconds < minute) {
    value = diffInSeconds;
    unit = 'second';
  } else if (diffInSeconds < hour) {
    value = Math.floor(diffInSeconds / minute);
    unit = 'minute';
  } else if (diffInSeconds < day) {
    value = Math.floor(diffInSeconds / hour);
    unit = 'hour';
  } else if (diffInSeconds < week) {
    value = Math.floor(diffInSeconds / day);
    unit = 'day';
  } else if (diffInSeconds < month) {
    value = Math.floor(diffInSeconds / week);
    unit = 'week';
  } else if (diffInSeconds < year) {
    value = Math.floor(diffInSeconds / month);
    unit = 'month';
  } else {
    value = Math.floor(diffInSeconds / year);
    unit = 'year';
  }
  
  // Use RelativeTimeFormat to get a localized string
  const formatter = new Intl.RelativeTimeFormat(language, { numeric: 'auto' });
  return formatter.format(-value, unit);
};

/**
 * Format a number according to the current language/locale
 * @param value Number to format
 * @param options Intl.NumberFormatOptions to customize the format
 * @param language ISO language code
 * @returns Formatted number string
 */
export const formatNumber = (
  value: number,
  options: Intl.NumberFormatOptions = {},
  language: string = 'en'
): string => {
  return new Intl.NumberFormat(language, options).format(value);
};

/**
 * Format a currency value
 * @param value Amount to format
 * @param currency Currency code (e.g., 'USD', 'EUR')
 * @param language ISO language code
 * @returns Formatted currency string
 */
export const formatCurrency = (
  value: number,
  currency: string = 'USD',
  language: string = 'en'
): string => {
  return formatNumber(
    value,
    {
      style: 'currency',
      currency,
    },
    language
  );
};

/**
 * Format a compact number (e.g., 1.2M, 5K)
 * @param value Number to format
 * @param language ISO language code
 * @returns Formatted compact number string
 */
export const formatCompactNumber = (
  value: number,
  language: string = 'en'
): string => {
  return formatNumber(
    value,
    {
      notation: 'compact',
      compactDisplay: 'short',
    },
    language
  );
};

/**
 * Replace placeholders in a string with values
 * @param text Text with placeholders like {name}
 * @param replacements Object with keys matching placeholder names
 * @returns Text with placeholders replaced
 */
export const formatDynamicText = (
  text: string,
  replacements: Record<string, string | number>
): string => {
  let result = text;
  
  Object.entries(replacements).forEach(([key, value]) => {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  });
  
  return result;
}; 