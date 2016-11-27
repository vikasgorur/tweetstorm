import twitter from 'twitter-text';

/**
 * Split the text into chunks based on '\n--\n'
 */
export function split(text) {
  let pieces = text.split('\n--\n');
  let tweets = [];

  for (const t of pieces) {
    tweets.push({ text: t, length: twitter.getTweetLength(t) });
  }

  return tweets;
}