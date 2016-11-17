import twitter from 'twitter-text';

/**
 * Split the text into chunks based on '\n--\n'
 */
export function split(text) {
  return text.split('\n--\n');
}